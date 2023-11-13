// Importing necessary libraries and modules
const helmet = require("helmet");
const todos = require("./routes/todos");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Setting the port for the server to run on
const PORT = process.env.PORT || 5000;

// Creating an Express application
const app = express();

// Applying middleware for securing HTTP headers
app.use(helmet());

// Applying middleware for enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parsing incoming JSON requests
app.use(express.json());

// Parsing incoming JSON requests using bodyParser (deprecated in Express v4.16.0)
app.use(bodyParser.json());

// Defining routes for different parts of the application
app.use("/api/todos", todos);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);

// Default route for the root path
app.get("/", (req, res) => {
  res.send("Welcome to your todo app!");
});

// MongoDB connection URI
const connection_string =
  "mongodb+srv://Ameerah14:Basic1012@hyperiondevtasks.y7esotx.mongodb.net/TodoApp";

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connecting to MongoDB using the specified connection URI and options
mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Storing the reference to the MongoDB connection
const db = mongoose.connection;

// Event listener for MongoDB connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Event listener for successful MongoDB connection
db.once("open", function () {
  console.log("Connected to MongoDB");
});
