import { TRAER_PRODUCTOS } from "../Types/tiendaTypes";

const INITIAL_STATE = {
  productos: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_PRODUCTOS:
      return { ...state, productos: action.payload };

    default:
      return state;
  }
};
