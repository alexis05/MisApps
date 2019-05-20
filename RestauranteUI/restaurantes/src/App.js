import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Registro from "./Componentes/Registro/Registro";
import Layout from "./Layout";
import NotFound from "./Pages/NotFound";
import "./App.css";
import Tiendas from "./Componentes/Tienda/Tiendas";
import TiendaDetalle from "./Componentes/Tienda/TiendaDetalle";
import NuevoProducto from "./Componentes/Tienda/NuevoProducto";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/tienda/:id" component={TiendaDetalle} />
          <Route exact path="/producto/nuevo" component={NuevoProducto} />
          <Route exact path="/" component={Tiendas} />
          <Route exact path="/registro" component={Registro} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
