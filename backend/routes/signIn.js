// Importing necessary modules and dependencies
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Creating an instance of Express Router
const router = express.Router();

// Route for user authentication/signin
router.post("/", async (req, res) => {
  // Validation schema for the request body
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  // Validating the request body against the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Finding a user with the provided email
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // Comparing the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid email or password");
    }

    // Generating a JSON Web Token (JWT) for the authenticated user
    const secretKey = "abc123";
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );

    // Sending the JWT as the response
    res.send(token);
  } catch (error) {
    // Handling server error and logging the error message
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Exporting the router for use in other parts of the application
module.exports = router;
