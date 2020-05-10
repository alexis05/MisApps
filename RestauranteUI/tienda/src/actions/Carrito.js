import API from "../API";
import {
  ADD_CART,
  REQUEST_SEND_ADD_TO_CART,
  REQUEST_ERROR_ADD_TO_CART,
  VIEW_CART_DETAILS,
  BACK_ALL_PRODUCTS,
  DETALLE_CARRITO,
  EDIT_CART,
} from "../types/tiendaTypes";

export const addToCart = (product) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_SEND_ADD_TO_CART,
    });

    delete product.productosDetallado;
    delete product.totalDeProductos;
    delete product.precioTotal;

    API.post(`/carritoapi/agregar`, product).then((res) => {
      const { data } = res;
      const carrito = data.data;
      dispatch({
        type: ADD_CART,
        payload: { carrito },
      });
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ERROR_ADD_TO_CART,
      payload: error.message,
    });

    console.log("Error: ", error.message);
  }
};

export const editCart = (product) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_SEND_ADD_TO_CART,
    });

    delete product.productosDetallado;
    delete product.totalDeProductos;
    delete product.precioTotal;

    API.post(`/carritoapi/`, product).then((res) => {
      const { data } = res;
      const carrito = data.data;
      dispatch({
        type: EDIT_CART,
        payload: { carrito },
      });
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ERROR_ADD_TO_CART,
      payload: error.message,
    });

    console.log("Error: ", error.message);
  }
};

export const detalleCarrito = () => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_SEND_ADD_TO_CART,
    });

    API.get(`/carritoapi/por/usuario`).then((res) => {
      const { data } = res;
      const carrito = data.data;
      dispatch({
        type: DETALLE_CARRITO,
        payload: carrito,
      });
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ERROR_ADD_TO_CART,
      payload: error.message,
    });

    console.log("Error: ", error.message);
  }
};

export const viewCart = () => (dispatch) => {
  dispatch({
    type: VIEW_CART_DETAILS,
  });
};
export const backProductListView = () => (dispatch) => {
  dispatch({
    type: BACK_ALL_PRODUCTS,
  });
};
