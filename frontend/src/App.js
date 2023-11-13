import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Todos from "./components/todos/Todos";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import NavBar from "./components/navBar/NavBar";
import { loadUser } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="app-container">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* App.js: Main entry point for the React application.
 - Imports necessary modules for React, Redux, React Router, and Toastify.
 - Manages application-wide state and side effects using Redux.
 - Sets up routing with React Router for navigation between components.
 - Displays notifications using the Toastify library.
 - Utilizes the NavBar, SignUp, SignIn, and Todos components for different views.
 - Loads user information on component mount to handle authentication.
 - Separates styles by importing "App.css" for a clean and organized structure.
 - Configures the overall layout of the application within a BrowserRouter.
 - Handles routes for SignUp, SignIn, and Todos components using Routes and Route components. */
