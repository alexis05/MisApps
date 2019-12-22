import React from "react";
import { Link } from "react-router-dom";
import "./styleBO.css";

const MenuBO = props => (
  <div>
    <div id="cssmenu">
      <ul>
        <li>
          <Link to="/Admin">
            <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/Admin/Nuevo/Producto/5dfe8aa54458b2afeabb3910">
            <span>Agregar Producto</span>
          </Link>
        </li>
        <li>
          <Link to="/Admin/Productos">
            <span>Administrar Productos</span>
          </Link>
        </li>
        <li>
          <Link to="/Admin/Tienda">
            <span>Mi Tienda</span>
          </Link>
        </li>
        <li>
          <Link to="/Admin/Encargados">
            <span>Encargados</span>
          </Link>
        </li>
        <li>
          <Link to="/Admin/Usuarios">
            <span>Usuarios</span>
          </Link>
        </li>
        <li>
          <Link to="/Admin/log">Login/Logout</Link>
        </li>
      </ul>
    </div>
    {props.children}
  </div>
);
export default MenuBO;
