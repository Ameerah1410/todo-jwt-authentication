// Importing necessary modules and dependencies
import React, { useEffect } from "react";
import Todo from "./Todo"; // Importing the Todo component
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector from react-redux
import { getTodos } from "../../store/actions/todoActions"; // Importing the getTodos action

// Functional component for rendering a list of todos
const ListTodo = ({ setTodo }) => {
  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // Selecting the 'todos' state from the Redux store
  const todos = useSelector((state) => state.todos);

  // useEffect hook to dispatch the getTodos action on component mount
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  // JSX for rendering the list of todos
  return (
    <div style={styles.listContainer}>
      {todos.length > 0 ? "Your Todos" : "No Todos Yet"}{" "}
      {/* Conditional rendering based on the presence of todos */}
      {todos &&
        todos.map((todo) => {
          return <Todo todo={todo} key={todo._id} setTodo={setTodo} />; // Rendering individual Todo components for each todo
        })}
    </div>
  );
};

// Exporting the ListTodo component for use in other parts of the application
export default ListTodo;

// Styling object for the ListTodo component
const styles = {
  listContainer: {
    backgroundColor: "rgb(195, 247, 247)",
    padding: "20px",
    borderRadius: "5px",
    width: "500px",
    margin: "auto",
    marginTop: "20px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
};
