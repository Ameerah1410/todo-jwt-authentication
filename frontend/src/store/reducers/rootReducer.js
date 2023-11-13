// Importing combineReducers from Redux to combine multiple reducers into one
import { combineReducers } from "redux";

// Importing the individual reducers for todos and authentication
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";

// Combining the individual reducers into the root reducer
const rootReducer = combineReducers({
  // Mapping the 'todos' state to the todoReducer
  todos: todoReducer,
  // Mapping the 'auth' state to the authReducer
  auth: authReducer,
});

// Exporting the rootReducer as the default export of this module
export default rootReducer;
