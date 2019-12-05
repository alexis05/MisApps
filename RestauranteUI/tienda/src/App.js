import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Productos from "./componentes/producto/Productos";
import Admin from "./componentes/admin";
import MenuSuperior from "./template/menu/menuSuperior";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/Admin" component={Admin} />
        <MenuSuperior>
          <Route exact path="/" component={Productos} />
        </MenuSuperior>
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default App;
