import API from "../API";
import { TRAER_PRODUCTOS } from "../types/tiendaTypes";

export const traerProductos = (limit, skip) => async dispatch => {
  try {
    const respuesta = await API.get(`Productos/${limit}/${skip}`);
    dispatch({
      type: TRAER_PRODUCTOS,
      payload: respuesta.data.resultado
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
