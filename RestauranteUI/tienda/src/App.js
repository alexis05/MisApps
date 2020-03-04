import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Tienda from "./componentes/Tienda";
import CrearRestaurante from "./componentes/restaurante/CrearRestaurante";
import DetalleProducto from "./componentes/productoDetalle/DetalleProducto";
import MenuSuperior from "./template/menu/menuSuperior";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <MenuSuperior>
          <Route exact path="/Home" component={Tienda} />
          <Route exact path="/Nueva/Tienda" component={CrearRestaurante} />
          <Route
            exact
            path="/Producto/:productoId"
            component={DetalleProducto}
          />
        </MenuSuperior>
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default App;
