import API from "../API";
import {
  HACER_PEDIDO,
  REQUEST_ENVIADO_HACER_PEDIDO,
  REQUEST_ERROR_HACER_PEDIDO,
} from "../types/tiendaTypes";

export const hacerPedido = (pedido) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_ENVIADO_HACER_PEDIDO,
    });

    API.post(`/pedidoapi/pedido`, pedido).then((res) => {
      const { data } = res;
      const idPedidoRealizado = data.data;
      dispatch({
        type: HACER_PEDIDO,
        payload: { idPedidoRealizado },
      });
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ERROR_HACER_PEDIDO,
      payload: error.message,
    });

    console.log("Error: ", error.message);
  }
};
