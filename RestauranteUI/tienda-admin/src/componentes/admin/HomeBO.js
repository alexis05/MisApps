import React from "react";
import MenuBO from "./menu/MenuBO";

const HomeBO = () => {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-4">
          <MenuBO />
        </div>
        <div className="col-8">
          <div>Hola</div>
        </div>
      </div>
    </div>
  );
};

export default HomeBO;
