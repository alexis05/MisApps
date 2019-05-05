import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Registro from "./Componentes/Registro/Registro";
import Layout from "./Layout";
import NotFound from "./Pages/NotFound";
import "./App.css";
import Tienda from "./Componentes/Tienda/Tienda";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/" component={Tienda} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
