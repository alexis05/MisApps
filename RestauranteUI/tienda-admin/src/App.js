import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NuevoProducto from "./componentes/admin/NuevoProducto";
import PerfilTienda from "./componentes/tienda/PerfilTienda";
import HomeBO from "./componentes/admin/HomeBO";
import MenuBO from "./componentes/admin/menu/MenuBO";
import Dasboard from "./componentes/admin/Dashboard";
import Ordenes from "./componentes/admin/ListaOrdenes";
import Productos from "./componentes/admin/Productos";
import EditarProductos from "./componentes/admin/EditarProductos";
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
              <Route exact path="/Admin/Producto/Nuevo" component={NuevoProducto}/>
              <Route exact path="/Admin/Productos/:productId/Editar" component={EditarProductos}/>
            </MenuBO>
          </HomeBO>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
