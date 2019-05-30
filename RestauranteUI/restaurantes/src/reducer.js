function data(state, action) {
  switch (action.type) {
    case "CARGAR_TIENDAS": {
      console.log(state);
      console.log(action);
      return {
        ...state
      };
    }
    default:
      return state;
  }
}

export default data;
