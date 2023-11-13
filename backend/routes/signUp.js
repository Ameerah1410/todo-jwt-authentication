// Importing necessary modules and dependencies
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importing custom middleware function for email domain validation
const { validateEmailDomain } = require("../middleware/middleware");

// Creating an instance of Express Router
const router = express.Router();

// Route for user registration/signup
router.post("/", validateEmailDomain, async (req, res) => {
  // Validation schema for the request body
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  // Validating the request body against the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Checking if a user with the provided email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User with this email already exists");
    }

    // Destructuring relevant properties from the request body
    const { name, email, password } = req.body;

    // Creating a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Generating a salt and hashing the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Saving the new user to the database
    await user.save();

    // Generating a JSON Web Token (JWT) for the newly created user
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
