import API from "../API";
import {
  ADD_CART,
  REQUEST_SEND_ADD_TO_CART,
  REREQUEST_ERROR_ADD_TO_CARTQUEST_ERROR,
  VIEW_CART_DETAILS,
  BACK_ALL_PRODUCTS,
  DETALLE_CARRITO,
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
      type: REREQUEST_ERROR_ADD_TO_CARTQUEST_ERROR,
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
      type: REREQUEST_ERROR_ADD_TO_CARTQUEST_ERROR,
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
