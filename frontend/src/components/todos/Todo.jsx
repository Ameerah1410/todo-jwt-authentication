// Importing necessary modules and dependencies
import React from "react";
import { Create, Delete, CheckCircle } from "@mui/icons-material"; // Importing icons from @mui/icons-material
import moment from "moment"; // Importing moment.js for date formatting
import { useDispatch } from "react-redux"; // Importing useDispatch from react-redux
import { checkTodo, deleteTodo } from "../../store/actions/todoActions"; // Importing actions for checking and deleting todos

// Functional component for rendering individual todos
const Todo = ({ todo, setTodo }) => {
  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // Event handler for handling todo check/uncheck
  const handleCheck = (id) => {
    dispatch(checkTodo(id)); // Dispatching the checkTodo action with todo ID
  };

  // Event handler for handling todo deletion
  const handleDelete = (id) => {
    dispatch(deleteTodo(id)); // Dispatching the deleteTodo action with todo ID
  };

  // Event handler for updating the todo (used when the "Update" button is clicked)
  const handleUpdateClick = () => {
    setTodo(todo); // Setting the selected todo for update in the parent component
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // JSX for rendering an individual todo
  return (
    <div style={styles.todoContainer}>
      <div style={styles.textContainer}>
        <p
          style={{
            ...styles.name,
            textDecoration: todo.isComplete ? "line-through" : "none",
          }}
        >
          {todo.name}
        </p>
        <p style={styles.date}> Added: {moment(todo.date).fromNow()} </p>
      </div>
      <div style={styles.buttonGroup}>
        <button
          onClick={() => handleCheck(todo._id)}
          className="check-button"
          style={{
            ...styles.checkButton,
            color: todo.isComplete ? "green" : "grey",
          }}
        >
          <CheckCircle />
        </button>
        <button
          onClick={() => handleUpdateClick(todo._id)}
          className="create-button"
          style={styles.createButton}
        >
          <Create />
        </button>
        <button
          onClick={() => handleDelete(todo._id)}
          className="delete-button"
          style={styles.deleteButton}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

// Exporting the Todo component for use in other parts of the application
export default Todo;

// Styling object for the Todo component
const styles = {
  todoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  date: {
    color: "grey",
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
  },
  checkButton: {
    marginLeft: "10px",
  },
  createButton: {
    color: "blue",
    marginLeft: "10px",
  },
  deleteButton: {
    color: "red",
    marginLeft: "10px",
  },
};
