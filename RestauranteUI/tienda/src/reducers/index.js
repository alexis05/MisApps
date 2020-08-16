import { combineReducers } from "redux";
import productoReducer from "./productoReducer";
import carritoReducer from "./carritoReducer";
import productoDetalleReducer from "./productoDetalleReducer";
import pedidoReducer from "./pedidoReducer";
import misPedidosReducer from "./misPedidosReducer";

export default combineReducers({
  productoReducer,
  productoDetalleReducer,
  carritoReducer,
  pedidoReducer,
  misPedidosReducer
});
