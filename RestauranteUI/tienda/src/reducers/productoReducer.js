import { TRAER_PRODUCTOS } from "../types/tiendaTypes";

const initialState = {
  tienda: [],
  productos: [],
  carrito: []
};

const productoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRAER_PRODUCTOS:
      return {
        ...state,
        productos: action.payload
      };
    default:
      return state;
  }
};

export default productoReducer;
