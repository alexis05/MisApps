import API from "../API";
import { TRAER_PRODUCTOS } from "../types/tiendaTypes";

export const traerProductos = () => async dispatch => {
  try {
    const respuesta = await API.get(`Productos`);
    dispatch({
      type: TRAER_PRODUCTOS,
      payload: respuesta.data.resultado
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
