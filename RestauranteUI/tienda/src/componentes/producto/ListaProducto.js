import React from "react";
import { connect } from "react-redux";
import Producto from "./Producto";

const ListaProducto = ({ productos }) => (
  <div className="col-12 pt-2">
    <div className="container">
      <div className="row">
        {productos.map((producto, index) => (
          <div
            className="card-deck pb-2 col-xs col-sm col-md-3 col-lg-3"
            key={index}
          >
            <Producto
              nombre={producto.nombre}
              precio={producto.precio}
              detalle={producto.detalle}
              creado={producto.creado}
              _id={producto._id}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  productos: state.productoReducer.productoReducer.productos
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListaProducto);
