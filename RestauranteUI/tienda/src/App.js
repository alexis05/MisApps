import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Tienda from "./componentes/Tienda";
import HomeBO from "./componentes/admin/HomeBO";
import CrearRestaurante from "./componentes/restaurante/CrearRestaurante";
import PerfilTienda from "./componentes/restaurante/PerfilTienda";
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/Home" component={Tienda} />
        <Route exact path="/Home/Admin" component={HomeBO} />
        <Route exact path="/Nueva/Tienda" component={CrearRestaurante} />
        <Route exact path="/Home/MiTienda" component={PerfilTienda} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default App;
