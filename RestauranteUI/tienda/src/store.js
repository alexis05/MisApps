import { createStore } from "redux";
import { TRAER_PRODUCTOS } from "./types/tiendaTypes";

const initialState = {
  tienda: [],
  productos: [],
  carrito: []
};

const reducerTienda = (state = initialState, action) => {
  if (action.type === TRAER_PRODUCTOS) {
    console.log(action);
    return {
      ...state,
      productos: action.payload
    };
  }
  return state;
};

export default createStore(reducerTienda);
