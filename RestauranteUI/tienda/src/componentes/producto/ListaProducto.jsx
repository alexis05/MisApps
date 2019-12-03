import React from "react";
import { connect } from "react-redux";
import Producto from "./Producto";

const ListaProducto = ({ productos }) => (
  <div className="col-12 pt-2">
    <div className="container">
      <div className="row">
        {productos.map(producto => (
          <div className="card-deck pb-2 col-sm-4" key={producto.id}>
            <Producto
              nombre={producto.nombre}
              precio={producto.precio}
              detalle={producto.detalle}
              creado={producto.creado}
              id={productos.id}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  productos: state.productos
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListaProducto);
