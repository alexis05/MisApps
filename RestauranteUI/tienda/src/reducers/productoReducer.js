import { TRAER_PRODUCTOS } from "../types/tiendaTypes";

const initialState = {
  tienda: [],
  productos: [],
  carrito: [],
  existenProductos: false
};

const productoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRAER_PRODUCTOS:
      if (action.payload.length === 0) {
        state.existenProductos = false;
      } else {
        state.existenProductos = true;
      }
      return {
        ...state,
        productos: [...state.productos, ...action.payload]
      };
    default:
      return state;
  }
};

export default productoReducer;
