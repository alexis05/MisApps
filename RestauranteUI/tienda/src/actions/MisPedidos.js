import API from "../API";
import {
 
  REQUEST_ENVIADO_MIS_PEDIDOS,
  REQUEST_ERROR_MIS_PEDIDOS,
  REQUEST_OBTENIDO_MIS_PEDIDOS,
} from "../types/tiendaTypes";



export const obtenerMisPedidos = () => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_ENVIADO_MIS_PEDIDOS,
    });

    API.get(`/pedidoapi/mispedidos`).then((res) => {
      const { data } = res;
      const pedidos = data.data;
      dispatch({
        type: REQUEST_OBTENIDO_MIS_PEDIDOS,
        payload: { pedidos },
      });
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ERROR_MIS_PEDIDOS,
      payload: error.message,
    });

    console.log("Error: ", error.message);
  }
};
