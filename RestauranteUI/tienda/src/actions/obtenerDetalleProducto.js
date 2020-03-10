import API from "../API";
import {
  TRAER_DETALLE_PRODUCTO,
  REQUEST_ENVIADO_DETALLE_PRODUCTO,
  REQUEST_ERROR_DETALLE_PRODUCTO
} from "../types/tiendaTypes";

export const traerDetalleProducto = productoId => async dispatch => {
  try {
    dispatch({
      type: REQUEST_ENVIADO_DETALLE_PRODUCTO
    });

    const respuesta = await API.get(`Producto/${productoId}`);

    dispatch({
      type: TRAER_DETALLE_PRODUCTO,
      payload: respuesta.data.resultado
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ERROR_DETALLE_PRODUCTO,
      payload: error.message
    });

    console.log("Error: ", error.message);
  }
};
