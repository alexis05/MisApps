import {
  REQUEST_ENVIADO_MIS_PEDIDOS,
  BACK_ALL_PRODUCTS,
  REQUEST_ERROR_Mis_PEDIDOS,
  REQUEST_OBTENIDO_MIS_PEDIDOS,
} from "../types/tiendaTypes";
import { Views } from "../constantes/index";
const initialState = {
  error: "",
  loadingGlobal: false,
  misPedidos: []
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ENVIADO_MIS_PEDIDOS:
      return {
        ...state,
        loadingGlobal: true,
      };
    case REQUEST_OBTENIDO_MIS_PEDIDOS:
      return {
        ...state,
        loadingGlobal: false,
        error: "",
        misPedidos: action.payload.pedidos
      };

    case REQUEST_ERROR_Mis_PEDIDOS:
      return { ...state, error: action.payload, loadingGlobal: false };

    case BACK_ALL_PRODUCTS:
      return { ...state, viewActive: Views.PRODUCTLIST, loadingGlobal: false };

    default:
      return state;
  }
};
