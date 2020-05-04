import API from "../API";
import {
  ADD_CART,
  REQUEST_SEND_ADD_TO_CART,
  REREQUEST_ERROR_ADD_TO_CARTQUEST_ERROR,
  VIEW_CART_DETAILS,
  BACK_ALL_PRODUCTS,
} from "../types/tiendaTypes";

export const addToCart = (product) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_SEND_ADD_TO_CART,
    });
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
