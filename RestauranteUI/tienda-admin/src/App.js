import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NuevoProducto from "./componentes/admin/NuevoProducto";
import ProductoNuevo from "./componentes/admin/product";
import PerfilTienda from "./componentes/tienda/PerfilTienda";
import HomeBO from "./componentes/admin/HomeBO";
import MenuBO from "./componentes/admin/menu/MenuBO";
import Dasboard from "./componentes/admin/Dashboard";
import Ordenes from "./componentes/admin/ListaOrdenes";
import Productos from "./componentes/admin/Productos";
import EditarProductos from "./componentes/admin/EditarProductos";
import Categorias from "./componentes/admin/categoria";
import Atriculos from "./componentes/admin/atributos";
import TipoProductos from "./componentes/admin/tipoProducto";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <HomeBO>
            <MenuBO>
              <Route exact path="/Admin" component={Dasboard} />
              <Route exact path="/Admin/Ordenes" component={Ordenes} />
              <Route exact path="/Admin/MiTienda" component={PerfilTienda} />
              <Route exact path="/Admin/Productos" component={Productos} />
              <Route
                exact
                path="/Admin/Producto/Nuevo"
                component={NuevoProducto}
              />
              <Route
                exact
                path="/Admin/Nuevo/Producto"
                component={ProductoNuevo}
              />
              <Route
                exact
                path="/Admin/Productos/:productId/Editar"
                component={EditarProductos}
              />
              <Route exact path="/Admin/Categorias" component={Categorias} />
              <Route exact path="/Admin/Atributos" component={Atriculos} />
              <Route
                exact
                path="/Admin/TipoProductos"
                component={TipoProductos}
              />
            </MenuBO>
          </HomeBO>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
