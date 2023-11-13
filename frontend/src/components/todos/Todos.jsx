// Importing necessary modules and dependencies
import React, { useState } from "react";
import AddTodo from "./AddTodo"; // Importing the AddTodo component
import ListTodo from "./ListTodos"; // Importing the ListTodo component
import { Navigate } from "react-router-dom"; // Importing Navigate from react-router-dom
import { useSelector } from "react-redux"; // Importing useSelector from react-redux

// Functional component for managing user's todos
const Todos = () => {
  // Selecting the 'auth' state from the Redux store
  const auth = useSelector((state) => state.auth);

  // State hook for managing the current todo
  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
  });

  // Redirecting to the sign-in page if the user is not authenticated
  if (!auth._id) {
    return <Navigate to="/signin" />;
  }

  // JSX for rendering the AddTodo and ListTodo components
  return (
    <div>
      <AddTodo todo={todo} setTodo={setTodo} />{" "}
      {/* Rendering the AddTodo component */}
      <ListTodo setTodo={setTodo} /> {/* Rendering the ListTodo component */}
    </div>
  );
};

// Exporting the Todos component for use in other parts of the application
export default Todos;
