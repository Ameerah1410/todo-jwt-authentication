// Importing necessary modules and dependencies
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/actions/authActions"; // Importing the signIn action
import { Navigate } from "react-router-dom"; // Importing Navigate from react-router-dom

// Functional component for user sign-in
const SignIn = () => {
  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // Selecting the 'auth' state from the Redux store
  const auth = useSelector((state) => state.auth);

  // State hook for managing user credentials
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  // Event handler for handling user sign-in
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatching the signIn action with user credentials
    dispatch(signIn(creds));
    // Resetting the user credentials after sign-in
    setCreds({
      email: "",
      password: "",
    });
  };

  // Redirecting to the home page if the user is already authenticated
  if (auth._id) {
    return <Navigate to="/" />;
  }

  // JSX for the sign-in form
  return (
    <div style={styles.signInContainer}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <input
          style={styles.input}
          type="text"
          placeholder="Email"
          name="email"
          value={creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          name="password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
        />
        <button type="submit" style={styles.signInButton}>
          Sign In
        </button>
      </form>
    </div>
  );
};

// Exporting the SignIn component for use in other parts of the application
export default SignIn;

// Styling object for the SignIn component
const styles = {
  signInContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "500px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    boxSizing: "border-box",
  },
  signInButton: {
    backgroundColor: "rgb(195, 247, 247)",
    color: "black",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
