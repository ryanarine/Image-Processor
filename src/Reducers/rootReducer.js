import { combineReducers } from "redux";
import imageReducer from "./imageReducer";
import replaceReducer from "./replaceReducer";

export default combineReducers({
  image: imageReducer,
  replace: replaceReducer
});
