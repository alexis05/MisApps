import React from "react";
import "./DetalleProducto";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProductoDetallado = ({ detalleProducto }) => {
  console.log(detalleProducto);
  return (
    <div>
      {detalleProducto.map((producto, index) => (
        <div
          key={index}
          className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light"
        >
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">{producto.nombre}</h1>
            <p className="lead font-weight-normal">{producto.detalle}</p>
            <Link className="btn btn-outline-secondary" to="/Home">
              Coming soon
            </Link>
          </div>
          <div className="product-device box-shadow d-none d-md-block"></div>
          <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  detalleProducto: state.productoReducer.productoReducer.detalleProducto
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductoDetallado);
