import {
  REQUEST_ERROR_ADD_TO_CART,
  REQUEST_SEND_ADD_TO_CART,
  ADD_CART,
  VIEW_CART_DETAILS,
  BACK_ALL_PRODUCTS,
} from "../types/tiendaTypes";
import { Views } from "../constantes/index";
const initialState = {
  error: "",
  loadingGlobal: false,
  viewActive: Views.PRODUCTLIST,
  carrito: {
    _id: "",
    accion: "",
    productos: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SEND_ADD_TO_CART:
      return {
        ...state,
        loadingGlobal: true,
      };

    case ADD_CART:
      return {
        ...state,
        loadingGlobal: false,
        error: "",
        carrito: {
          accion: "agregar",
          _id: action.payload.carrito._id,
          productos: action.payload.carrito.productos,
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
