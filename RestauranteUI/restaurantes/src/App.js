import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Registro from "./Componentes/Registro/Registro";
import Layout from "./Layout";
import NotFound from "./Pages/NotFound";
import "./App.css";
import Tiendas from "./Componentes/Tienda/Tiendas";
import TiendaDetalle from "./Componentes/Tienda/TiendaDetalle";
import NuevoProducto from "./Componentes/Tienda/NuevoProducto";
import PerfilTienda from "./Componentes/Tienda/Perfil/PerfilTienda";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/tienda/:id" component={TiendaDetalle} />
          <Route
            exact
            path="/tienda/:id/producto/nuevo"
            component={NuevoProducto}
          />
          <Route exact path="/" component={Tiendas} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/mitienda" component={PerfilTienda} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
