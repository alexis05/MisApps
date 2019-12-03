import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import Productos from "./componentes/producto/Productos";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <main>
        <h1 className="text-center">Tienda Bustavino</h1>
        <Productos />
      </main>
    </BrowserRouter>
  </Provider>
);
export default App;
