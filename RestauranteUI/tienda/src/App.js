import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Tienda from "./componentes/Tienda";
import HomeBO from "./componentes/admin/HomeBO";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/Home" component={Tienda} />
        <Route exact path="/Home/Admin" component={HomeBO} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default App;
