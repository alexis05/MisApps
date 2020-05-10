import {
  REQUEST_ERROR_ADD_TO_CART,
  REQUEST_SEND_ADD_TO_CART,
  ADD_CART,
  VIEW_CART_DETAILS,
  DETALLE_CARRITO,
  BACK_ALL_PRODUCTS,
} from "../types/tiendaTypes";
import { Views,tengoEsteProductoEnElCarrito } from "../constantes/index";
const initialState = {
  error: "",
  loadingGlobal: false,
  viewActive: Views.PRODUCTLIST,
  detalleProducto:{},
  carrito: {
    _id: "",
    accion: "",
    productos: [],
    productosDetallado: [],
    totalDeProductos: 0,
    precioTotal: "0.00",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SEND_ADD_TO_CART:
      return {
        ...state,
        loadingGlobal: true,
      };
    case DETALLE_CARRITO:    
      return {
        ...state,
        loadingGlobal: false,
        error: "",
        carrito: {
          accion: "",
          _id: action.payload._id,
          productos: action.payload.productos,
          productosDetallado: action.payload.productosDetallado,
          totalDeProductos: action.payload.totalDeProductos,
          precioTotal: action.payload.precioTotal,
        },
      };

    case ADD_CART:
      console.log("Producto ",action.payload);
      return {
        ...state,
        loadingGlobal: false,
        error: "",
        carrito: {
          accion: "agregar",
          _id: action.payload.carrito._id,
          productos: action.payload.carrito.productos,
          productosDetallado: action.payload.carrito.productosDetallado,
          totalDeProductos: action.payload.carrito.totalDeProductos,
          precioTotal: action.payload.carrito.precioTotal,
        },
      };

    case REQUEST_ERROR_ADD_TO_CART:
      return { ...state, error: action.payload, loadingGlobal: false };

    case VIEW_CART_DETAILS:
      return { ...state, viewActive: Views.DETAILSCART };
    case BACK_ALL_PRODUCTS:
      return { ...state, viewActive: Views.PRODUCTLIST };

    default:
      return state;
  }
};
