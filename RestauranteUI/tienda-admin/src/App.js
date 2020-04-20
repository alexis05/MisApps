import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NuevoProducto from "./componentes/admin/NuevoProducto";
import PerfilTienda from "./componentes/tienda/PerfilTienda";
import HomeBO from "./componentes/admin/HomeBO";
import MenuBO from "./componentes/admin/menu/MenuBO";
import Dasboard from "./componentes/admin/Dashboard";
import Productos from "./componentes/admin/Productos";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <HomeBO>
            <MenuBO>
              <Route exact path="/Admin" component={Dasboard} />
              <Route exact path="/Admin/MiTienda" component={PerfilTienda} />
              <Route exact path="/Admin/Productos" component={Productos} />
              <Route
                exact
                path="/Admin/Producto/Nuevo"
                component={NuevoProducto}
              />
            </MenuBO>
          </HomeBO>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
