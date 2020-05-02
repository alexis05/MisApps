import API from "../API";
import {
  ADD_CART,
  REQUEST_ENVIADO,
  REQUEST_ERROR,
  VIEW_CART_DETAILS,
  BACK_ALL_PRODUCTS
} from "../types/tiendaTypes";

export const addToCart = (product) => async dispatch => {
  
  try {
    dispatch({
      type: REQUEST_ENVIADO
    });

    API.post(
      `/carritoapi`,product
    ).then((res) => {
      const {data} = res;
      const{carrito} = data
      dispatch({
        type: ADD_CART,
        payload:{carrito}
      });
    })
    
  } catch (error) {
    dispatch({
      type: REQUEST_ERROR,
      payload: error.message
    });

    console.log("Error: ", error.message);
  }
};

export const viewCart = () =>  dispatch => {
    dispatch({
      type: VIEW_CART_DETAILS
    });

};
export const backProductListView = () =>  dispatch => {
    dispatch({
      type: BACK_ALL_PRODUCTS
    });

};

