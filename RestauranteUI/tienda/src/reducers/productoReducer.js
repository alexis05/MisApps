import {
  TRAER_PRODUCTOS,
  REQUEST_ENVIADO,
  REQUEST_ERROR,
} from "../types/tiendaTypes";
import { Views } from "../constantes/index";
const initialState = {
  productos: [],
  existenProductos: false,
  loadingGlobal: false,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRAER_PRODUCTOS:
      if (!action.payload.length) {
        state.existenProductos = true;
      }
      return {
        ...state,
        loadingGlobal: false,
        estaFueraDeHome: false,
        productos: action.payload,
      };

    case REQUEST_ENVIADO:
      return { ...state, loadingGlobal: true };

    case REQUEST_ERROR:
      return { ...state, error: action.payload, loadingGlobal: false };

    default:
      return state;
  }
};
