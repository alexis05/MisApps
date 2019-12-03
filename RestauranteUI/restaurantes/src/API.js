//import React from "react";
import axios from "axios";
/*
export const Configuraciones = React.createContext({
  apiRoot: "",
  toggleTheme: () => {}
});
*/

export default axios.create({
  baseURL: `http://192.168.0.5/`
});
