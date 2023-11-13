// Importing necessary modules and dependencies
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/actions/authActions"; // Importing the signUp action
import { Navigate } from "react-router-dom"; // Importing Navigate from react-router-dom

// Functional component for user sign-up
const SignUp = () => {
  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // Selecting the 'auth' state from the Redux store
  const auth = useSelector((state) => state.auth);

  // State hook for managing user input
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Event handler for handling user sign-up
  const handleSignUp = (e) => {
    e.preventDefault();
    // Dispatching the signUp action with user data
    dispatch(signUp(user));
    // Resetting the user state after sign-up
    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  // Redirecting to the home page if the user is already authenticated
  if (auth._id) {
    return <Navigate to="/" />;
  }

  // JSX for the sign-up form
  return (
    <div style={styles.signUpContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} style={styles.form} autoComplete="off">
        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          name="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit" style={styles.signUpButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

// Exporting the SignUp component for use in other parts of the application
export default SignUp;

// Styling object for the SignUp component
const styles = {
  signUpContainer: {
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
  signUpButton: {
    backgroundColor: "rgb(195, 247, 247)",
    color: "black",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
