import { combineReducers } from "redux";
import productoReducer from "./productoReducer";
import carritoReducer from "./carritoReducer";
import productoDetalleReducer from "./productoDetalleReducer";
import pedidoReducer from "./pedidoReducer";

export default combineReducers({
  productoReducer,
  productoDetalleReducer,
  carritoReducer,
  pedidoReducer,
});
