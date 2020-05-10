import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Tienda from "./componentes/Tienda";
import Login from "./componentes/login";
import CrearRestaurante from "./componentes/restaurante/CrearRestaurante";
 import ProductoDetallado from "./componentes/productoDetalle/DetalleProducto";
import MenuSuperior from "./template/menu/menuSuperior";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Nueva/Tienda" component={CrearRestaurante} />
        <MenuSuperior>
          <Route exact path="/Home" component={Tienda} />
          <Route
            exact
            path="/Home/Producto/:productoId"
            component={ProductoDetallado}
          />
        </MenuSuperior>
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default App;
