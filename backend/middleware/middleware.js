// Middleware function to validate the length of the task name
const validateTaskLength = (req, res, next) => {
  // Extracting the 'name' property from the request body
  const { name } = req.body;

  // Checking if the task name exceeds the maximum allowed length (140 characters)
  if (name && name.length > 140) {
    // Responding with a 400 status code and a message if the length is exceeded
    return res.status(400).send("Task name must not exceed 140 characters.");
  }

  // Calling the next middleware or route handler if validation is successful
  next();
};

// Middleware function to validate the content type of the request as JSON
const validateJSONContentType = (req, res, next) => {
  // Extracting the 'content-type' header from the request
  const contentType = req.get("content-type");

  // Checking if the content type is missing or not 'application/json'
  if (!contentType || !contentType.includes("application/json")) {
    // Responding with a 400 status code and a message if the content type is invalid
    return res.status(400).send("Content type must be application/json.");
  }

  // Calling the next middleware or route handler if validation is successful
  next();
};

// Middleware function to validate that the email domain is '@gmail.com'
const validateEmailDomain = (req, res, next) => {
  // Extracting the 'email' property from the request body
  const { email } = req.body;

  // Checking if the email domain is not '@gmail.com'
  if (!email.endsWith("@gmail.com")) {
    // Responding with a 403 status code and a message if the domain is not allowed
    return res.status(403).send("Forbidden: Only Gmail accounts are allowed.");
  }

  // Calling the next middleware or route handler if validation is successful
  next();
};

// Exporting the validation middleware functions for use in other parts of the application
module.exports = {
  validateTaskLength,
  validateJSONContentType,
  validateEmailDomain,
};
