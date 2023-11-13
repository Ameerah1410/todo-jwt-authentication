// Importing necessary modules and dependencies
import axios from "axios"; // Importing Axios for making HTTP requests
import { url } from "../../api"; // Importing the API URL
import { toast } from "react-toastify"; // Importing React Toastify for displaying notifications

// Action creator for user sign-up
export const signUp = (user) => {
  return (dispatch) => {
    axios
      .post(`${url}/signup`, user) // Making a POST request to sign up the user
      .then((token) => {
        localStorage.setItem("token", token.data); // Storing the token in local storage

        dispatch({
          type: "SIGN_UP",
          token: token.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        // Displaying an error notification using React Toastify
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

// Action creator for user sign-in
export const signIn = (creds) => {
  return (dispatch) => {
    axios
      .post(`${url}/signin`, creds) // Making a POST request to sign in the user
      .then((token) => {
        localStorage.setItem("token", token.data); // Storing the token in local storage

        dispatch({
          type: "SIGN_IN",
          token: token.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        // Displaying an error notification using React Toastify
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

// Action creator for loading user data
export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // Extracting the token from the Redux state
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else {
      return null;
    }
  };
};

// Action creator for user sign-out
export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
};
