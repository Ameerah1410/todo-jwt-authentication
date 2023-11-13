// Importing the 'jsonwebtoken' library for handling JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Middleware function for authentication
function auth(req, res, next) {
  // Extracting the JWT from the request header
  const token = req.header("x-auth-token");

  // Checking if the token is missing
  if (!token) {
    // Responding with a 401 status code and a message if not authorized
    return res.status(401).send("Not authorized");
  }

  try {
    // Setting the secret key used to sign the JWT
    const secretKey = "abc123";

    // Verifying the JWT using the secret key
    const payload = jwt.verify(token, secretKey);

    // Adding the payload (user information) to the request object
    req.user = payload;

    // Calling the next middleware or route handler
    next();
  } catch (error) {
    // Responding with a 400 status code and a message if the token is invalid
    res.status(400).send("Invalid token");
  }
}

// Exporting the authentication middleware for use in other parts of the application
module.exports = auth;
