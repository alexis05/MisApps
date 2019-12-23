import API from "../API";
import {
  TRAER_PRODUCTOS,
  REQUEST_ENVIADO,
  REQUEST_ERROR
} from "../types/tiendaTypes";

export const traerProductos = (limit, skip) => async dispatch => {
  try {
    dispatch({
      type: REQUEST_ENVIADO
    });
    const respuesta = await API.get(`Productos/${limit}/${skip}`);
    dispatch({
      type: TRAER_PRODUCTOS,
      payload: respuesta.data.resultado
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ERROR
    });
    console.log("Error: ", error.message);
  }
};
