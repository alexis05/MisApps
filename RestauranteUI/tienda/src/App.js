import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ListaProducto from "./componentes/producto/ListaProducto";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <main>
        <h1>Tienda Bustavino</h1>
        <ListaProducto />
      </main>
    </BrowserRouter>
  </Provider>
);
export default App;
