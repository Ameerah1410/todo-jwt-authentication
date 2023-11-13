// Importing React Toastify for displaying notifications
import { toast } from "react-toastify";

// Todo reducer function to handle state changes based on dispatched actions
const todoReducer = (state = [], action) => {
  switch (action.type) {
    // Case for handling the action to get todos
    case "GET_TODOS":
      return action.todos.data; // Update state with fetched todos
    // Case for handling the action to add a new todo
    case "ADD_TODO":
      // Display a success notification for adding a todo
      toast.success("Todo added!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Return a new state array with the added todo at the beginning
      return [action.todo.data, ...state];
    // Case for handling the action to update an existing todo
    case "UPDATE_TODO":
      // Display a success notification for updating a todo
      toast.success("Todo updated!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Return a new state array with the updated todo
      return state.map((todo) =>
        todo._id === action.todo.data._id ? action.todo.data : todo
      );
    // Case for handling the action to change the status of a todo
    case "CHECK_TODO":
      // Display a success notification for changing the todo status
      toast.success("Todo status changed!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Return a new state array with the todo status changed
      return state.map((todo) =>
        todo._id === action.todo.data._id ? action.todo.data : todo
      );
    // Case for handling the action to delete a todo
    case "DELETE_TODO":
      // Display a success notification for deleting a todo
      toast.success("Todo deleted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // Return a new state array without the deleted todo
      return state.filter((todo) => todo._id !== action.id);
    // Default case for returning the current state if the action type is not recognized
    default:
      return state;
  }
};

// Exporting the todoReducer as the default export of this module
export default todoReducer;
