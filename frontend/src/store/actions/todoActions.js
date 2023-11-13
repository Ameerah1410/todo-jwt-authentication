// Importing necessary modules and dependencies
import axios from "axios"; // Importing Axios for making HTTP requests
import { url, setHeaders } from "../../api"; // Importing the API URL and setHeaders function
import { toast } from "react-toastify"; // Importing React Toastify for displaying notifications

// Action creator for getting todos
export const getTodos = () => {
  return (dispatch) => {
    axios
      .get(`${url}/todos`, setHeaders()) // Making a GET request to retrieve todos
      .then((todos) => {
        dispatch({
          type: "GET_TODOS",
          todos,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

// Action creator for adding a new todo
export const addTodo = (newTodo) => {
  return (dispatch, getState) => {
    const uid = getState().auth._id; // Extracting user ID from the Redux state
    axios
      .post(`${url}/todos`, { ...newTodo, uid }, setHeaders()) // Making a POST request to add a new todo
      .then((todo) => {
        dispatch({
          type: "ADD_TODO",
          todo,
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

// Action creator for updating an existing todo
export const updateTodo = (updatedTodo, id) => {
  return (dispatch) => {
    axios
      .put(`${url}/todos/${id}`, updatedTodo, setHeaders()) // Making a PUT request to update a todo
      .then((todo) => {
        dispatch({
          type: "UPDATE_TODO",
          todo,
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

// Action creator for checking/unchecking a todo
export const checkTodo = (id) => {
  return (dispatch) => {
    axios
      .patch(`${url}/todos/${id}`, {}, setHeaders()) // Making a PATCH request to check/uncheck a todo
      .then((todo) => {
        dispatch({
          type: "CHECK_TODO",
          todo,
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

// Action creator for deleting a todo
export const deleteTodo = (id) => {
  return (dispatch) => {
    axios
      .delete(`${url}/todos/${id}`, setHeaders()) // Making a DELETE request to delete a todo
      .then(() => {
        dispatch({
          type: "DELETE_TODO",
          id,
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
