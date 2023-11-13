// Importing the 'mongoose' library for MongoDB object modeling
const mongoose = require("mongoose");

// Defining the schema for the 'Todo' model
const todoSchema = new mongoose.Schema({
  // Task name property with string type, required, and length constraints
  name: { type: String, required: true, minLength: 3, maxLength: 140 },

  // Boolean property indicating whether the task is complete or not
  isComplete: Boolean,

  // Date property with a default value of the current date and time
  date: { type: Date, default: new Date() },

  // User ID property for associating tasks with a specific user
  uid: String,
});

// Creating the 'Todo' model based on the defined schema
const Todo = mongoose.model("Todo", todoSchema);

// Exporting the 'Todo' model for use in other parts of the application
exports.Todo = Todo;
