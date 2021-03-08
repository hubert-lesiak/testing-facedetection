import { combineReducers } from "redux";
import faceReducer from "./modules/faceReducer";

export default combineReducers({
  face: faceReducer,
});
