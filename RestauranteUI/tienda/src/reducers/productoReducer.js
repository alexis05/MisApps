import {
  TRAER_PRODUCTOS,
  REQUEST_ENVIADO,
  TRAER_DETALLE_PRODUCTO
} from "../types/tiendaTypes";

const initialState = {
  tienda: [],
  productos: [],
  carrito: [],
  existenProductos: false,
  loadingGlobal: false,
  estaFueraDeHome: false,
  detalleProducto: []
};

const productoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRAER_PRODUCTOS:
      if (action.payload.length === 0) {
        state.existenProductos = false;
      } else {
        state.existenProductos = true;
      }
      if (state.estaFueraDeHome) {
        state.productos = [];
      }
      return {
        ...state,
        loadingGlobal: false,
        detalleProducto: [],
        estaFueraDeHome: false,
        productos: [...state.productos, ...action.payload]
      };

    case REQUEST_ENVIADO:
      return { ...state, loadingGlobal: true };

    case TRAER_DETALLE_PRODUCTO:
      return {
        ...state,
        loadingGlobal: false,
        estaFueraDeHome: true,
        detalleProducto: [...state.detalleProducto, ...action.payload]
      };
    default:
      return state;
  }
};

export default productoReducer;
