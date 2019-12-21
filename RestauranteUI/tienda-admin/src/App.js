import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeBO from "./componentes/admin/HomeBO";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/Admin" component={HomeBO} />
    </Switch>
  </BrowserRouter>
);
export default App;
