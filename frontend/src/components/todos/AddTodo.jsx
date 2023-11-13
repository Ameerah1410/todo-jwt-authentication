// Importing necessary modules and dependencies
import React from "react";
import { useDispatch } from "react-redux"; // Importing useDispatch from react-redux
import { addTodo, updateTodo } from "../../store/actions/todoActions"; // Importing actions for adding and updating todos

// Functional component for adding a new todo
const AddTodo = ({ todo, setTodo }) => {
  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // Event handler for handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Checking if the todo has an ID to determine if it's an update or a new todo
    if (todo._id) {
      const id = todo._id;
      const updatedTodo = {
        name: todo.name,
        isComplete: todo.isComplete,
        date: todo.date,
      };
      dispatch(updateTodo(updatedTodo, id)); // Dispatching the updateTodo action with updated todo and ID
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
      dispatch(addTodo(newTodo)); // Dispatching the addTodo action with new todo
    }

    // Resetting the todo state after submission
    setTodo({
      name: "",
      isComplete: false,
    });
  };

  // JSX for rendering the todo input form
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add a todo"
          value={todo.name}
          onChange={(e) => setTodo({ ...todo, name: e.target.value })}
        />
        <button style={styles.addButton} type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

// Exporting the AddTodo component for use in other parts of the application
export default AddTodo;

// Styling object for the AddTodo component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "500px",
    padding: "12px 20px",
    margin: "8px 0",
    boxSizing: "border-box",
  },
  addButton: {
    backgroundColor: "rgb(195, 247, 247)",
    color: "rgb(0, 0, 0)",
    border: "none",
    borderRadius: "5px",
    padding: "12px 20px",
    margin: "8px 0",
    boxSizing: "border-box",
  },
};
