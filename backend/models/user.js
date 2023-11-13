// Importing the 'mongoose' library for MongoDB object modeling
const mongoose = require("mongoose");

// Defining the schema for the 'User' model
const userSchema = new mongoose.Schema({
  // User name property with string type, required, and length constraints
  name: { type: String, required: true, minLength: 3, maxLength: 30 },

  // Email property with string type, required, unique, and length constraints
  email: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
    unique: true,
  },

  // Password property with string type, required, and length constraints
  password: { type: String, required: true, minLength: 6, maxLength: 1024 },
});

// Creating the 'User' model based on the defined schema
const User = mongoose.model("User", userSchema);

// Exporting the 'User' model for use in other parts of the application
exports.User = User;
