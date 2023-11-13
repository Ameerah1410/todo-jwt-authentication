// Importing necessary modules and dependencies
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from react-router-dom
import "./navBar.css"; // Importing styles for the NavBar component
import { useDispatch } from "react-redux"; // Importing useDispatch from react-redux
import { signOut } from "../../store/actions/authActions"; // Importing the signOut action
import { useSelector } from "react-redux"; // Importing useSelector from react-redux

// Functional component representing the navigation bar
const NavBar = () => {
  // Accessing the navigation function
  const navigate = useNavigate();

  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // Accessing the entire Redux state
  const state = useSelector((state) => state);

  // Accessing the 'auth' state from the Redux store
  const auth = useSelector((state) => state.auth);

  // Event handler for signing out the user
  const handleSignOut = () => {
    dispatch(signOut()); // Dispatching the signOut action
    navigate("/signin"); // Navigating to the SignIn page after signing out
  };

  // JSX for rendering the navigation bar
  return (
    <div className="header">
      {/* Link to the home page */}
      <Link className="todo-link" to={"/"}>
        Todo List
      </Link>

      {/* Conditional rendering based on user authentication */}
      {auth._id ? (
        <div>
          <p>
            Logged in as <strong>{auth.name}</strong>
          </p>
          {/* Button for signing out */}
          <button className="signout-button" onClick={() => handleSignOut()}>
            <Link to="/signup">SignOut</Link>
          </button>
        </div>
      ) : (
        <div>
          {/* Button for signing up */}
          <button className="signup-button">
            <Link to="/signup">SignUp</Link>
          </button>

          {/* Button for signing in */}
          <button className="signin-button">
            <Link to="/signin">SignIn</Link>
          </button>
        </div>
      )}
    </div>
  );
};

// Exporting the NavBar component for use in other parts of the application
export default NavBar;
