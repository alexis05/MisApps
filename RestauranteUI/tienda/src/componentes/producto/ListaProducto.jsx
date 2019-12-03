import React from "react";
import { connect } from "react-redux";
import Producto from "./Producto";

const ListaProducto = ({ productos }) => (
  <div className="col-12 pt-2">
    <div className="container">
      <div className="row">
        {productos.map(producto => (
          <Producto
            nombre={producto.nombre}
            precio={producto.precio}
            detalle={producto.detalle}
            creado={producto.creado}
          />
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
