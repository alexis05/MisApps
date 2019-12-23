import { TRAER_PRODUCTOS, REQUEST_ENVIADO } from "../types/tiendaTypes";

const initialState = {
  tienda: [],
  productos: [],
  carrito: [],
  existenProductos: false,
  loadingGlobal: false
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
        loadingGlobal: false,
        productos: [...state.productos, ...action.payload]
      };

    case REQUEST_ENVIADO:
      return { ...state, loadingGlobal: true };

    default:
      return state;
  }
};

export default productoReducer;
