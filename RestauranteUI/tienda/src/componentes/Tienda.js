import React from "react";
import MenuSuperior from "../template/menu/menuSuperior";
import Productos from "./producto/Productos";

const Tienda = () => {
  return (
    <div>
      <MenuSuperior>
        <Productos />
      </MenuSuperior>
    </div>
  );
};

export default Tienda;
