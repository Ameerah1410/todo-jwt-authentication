// Importing necessary modules and dependencies
const { Todo } = require("../models/todo");
const express = require("express");
const Joi = require("joi");
const auth = require("../middleware/auth");
const router = express.Router();

// Importing custom middleware functions for request validation
const {
  validateTaskLength,
  validateJSONContentType,
} = require("../middleware/middleware");

// Route for fetching user-specific todos
router.get("/", auth, async (req, res) => {
  try {
    // Finding all todos, sorting by date in descending order
    const todos = await Todo.find().sort({ date: -1 });

    // Filtering todos to only include those belonging to the authenticated user
    const filteredTodos = todos.filter((todo) => todo.uid === req.user._id);

    // Sending the filtered todos as the response
    res.send(filteredTodos);
  } catch (error) {
    // Handling server error and logging the error message
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Route for creating a new todo
router.post(
  "/",
  auth,
  validateJSONContentType,
  validateTaskLength,
  async (req, res) => {
    // Validation schema for the request body
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      uid: Joi.string(),
      isComplete: Joi.boolean(),
      date: Joi.date(),
    });

    // Validating the request body against the schema
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Destructuring relevant properties from the request body
    const { name, isComplete, date, uid } = req.body;

    // Creating a new todo instance
    let todo = new Todo({
      name,
      isComplete,
      date,
      uid,
    });

    try {
      // Saving the new todo to the database
      todo = await todo.save();

      // Sending the created todo as the response
      res.send(todo);
    } catch (error) {
      // Handling server error and logging the error message
      res.status(500).send(error.message);
      console.log(error.message);
    }
  }
);

// Route for updating an existing todo
router.put(
  "/:id",
  auth,
  validateJSONContentType,
  validateTaskLength,
  async (req, res) => {
    // Validation schema for the request body
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      uid: Joi.string(),
      isComplete: Joi.boolean(),
      date: Joi.date(),
    });

    // Validating the request body against the schema
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      // Finding the todo by ID
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).send("Todo not found!");
      }

      // Checking if the authenticated user owns the todo
      if (todo.uid != req.user._id) {
        return res.status(401).send("Todo update failed: Not Authorized");
      }

      // Destructuring relevant properties from the request body
      const { name, isComplete, date, uid } = req.body;

      // Updating the todo in the database
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          name,
          isComplete,
          date,
          uid,
        },
        { new: true }
      );

      // Sending the updated todo as the response
      res.send(updatedTodo);
    } catch (error) {
      // Handling server error and logging the error message
      res.status(500).send(error.message);
      console.log(error.message);
    }
  }
);

// Route for toggling the completion status of a todo
router.patch("/:id", auth, async (req, res) => {
  try {
    // Finding the todo by ID
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Todo not found!");
    }

    // Checking if the authenticated user owns the todo
    if (todo.uid != req.user._id) {
      return res.status(401).send("Todo check/uncheck failed: Not Authorized");
    }

    // Toggling the isComplete property and updating the todo in the database
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        isComplete: !todo.isComplete,
      },
      { new: true }
    );

    // Sending the updated todo as the response
    res.send(updatedTodo);
  } catch (error) {
    // Handling server error and logging the error message
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Route for deleting a todo
router.delete("/:id", auth, async (req, res) => {
  try {
    // Finding the todo by ID
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Todo not found!");
    }

    // Checking if the authenticated user owns the todo
    if (todo.uid != req.user._id) {
      return res.status(401).send("Todo deletion failed: Not Authorized");
    }

    // Deleting the todo from the database
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    // Sending the deleted todo as the response
    res.send(deletedTodo);
  } catch (error) {
    // Handling server error and logging the error message
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Exporting the router for use in other parts of the application
module.exports = router;
