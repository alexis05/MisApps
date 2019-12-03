import { createStore } from "redux";

const initialState = {
  tienda: [],
  productos: [
    {
      id: 1,
      nombre: "Bocina JBL",
      precio: 100,
      detalle: "Bocina resistente al agua.",
      creado: "lunes 2 de diciembre"
    }
  ],
  carrito: []
};

const reducerTienda = (state = initialState, action) => {
  return state;
};

export default createStore(reducerTienda);
