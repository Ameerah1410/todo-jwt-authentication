// Importing the 'toast' component from 'react-toastify' for displaying notifications
import { toast } from "react-toastify";
// Importing 'jwtDecode' function from 'jwt-decode' for decoding JWT tokens
import { jwtDecode } from "jwt-decode";

// Initial state for the authentication reducer
const initialState = {
  // Retrieving the token from localStorage
  token: localStorage.getItem("token"),
  // Initial values for user information
  name: null,
  email: null,
  _id: null,
};

// Reducer function for handling authentication-related actions
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handling actions related to user loading, sign-in, and sign-up
    case "USER_LOADED":
    case "SIGN_IN":
    case "SIGN_UP":
      // Displaying a toast notification for successful login or signup
      toast("Logged in!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Decoding the JWT token to extract user information
      const user = jwtDecode(action.token);
      // Updating the state with user information and the token
      return {
        ...initialState,
        token: action.token,
        name: user.name,
        email: user.email,
        _id: user._id,
      };
    // Handling the sign-out action
    case "SIGN_OUT":
      // Removing the token from localStorage
      localStorage.removeItem("token");
      // Displaying a toast notification for successful logout
      toast("Logged out!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Resetting user information in the state
      return {
        name: null,
        email: null,
        _id: null,
      };
    // Default case: returning the current state
    default:
      return state;
  }
};

// Exporting the authentication reducer as the default export of this module
export default authReducer;
