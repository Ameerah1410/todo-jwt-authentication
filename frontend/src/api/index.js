// Exporting a constant 'url' representing the base URL for API requests
export const url = "http://localhost:5000/api";

// Exporting a function 'setHeaders' to set the authentication header for API requests
export const setHeaders = () => {
  // Creating an object containing the authentication header
  const header = {
    headers: {
      "x-auth-token": localStorage.getItem("token"), // Retrieving the token from localStorage
    },
  };
  // Returning the header object
  return header;
};
