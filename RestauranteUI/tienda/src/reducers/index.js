import { combineReducers } from "redux";
import productoReducer from "./productoReducer";
import productoDetalleReducer from "./productoDetalleReducer";

export default combineReducers({
  productoReducer,
  productoDetalleReducer
});
