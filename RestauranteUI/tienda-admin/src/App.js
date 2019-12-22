import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeBO from "./componentes/admin/HomeBO";
import NuevoProducto from "./componentes/admin/NuevoProducto";
import PerfilTienda from "./componentes/tienda/PerfilTienda";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/Admin" component={HomeBO} />
      <Route exact path="/Admin/MiTienda/:id" component={PerfilTienda} />
      <Route exact path="/Admin/Nuevo/Producto/:id" component={NuevoProducto} />
    </Switch>
  </BrowserRouter>
);
export default App;
