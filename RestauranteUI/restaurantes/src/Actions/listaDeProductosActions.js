import axios from "axios";
import { TRAER_PRODUCTOS } from "../Types/productosDeTiendas";

export const traerTodos = () => async dispatch => {
  try {
    const respuesta = await axios.get("/Productos/");
    dispatch({
      type: TRAER_PRODUCTOS,
      payload: respuesta
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
