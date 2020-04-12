import React from "react";
import "./DetalleProducto";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProductoDetallado = ({ detalleProducto }) => {
  return (
    <div>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal">
            {detalleProducto.nombre}
          </h1>
          <p className="lead font-weight-normal">{detalleProducto.detalle}</p>
          <div className="row">
            <div className="col">
              <div className="col">
                <span>${detalleProducto.precio}</span>
              </div>
              <div className="col">
                <span>
                  <Link className="btn btn-outline-secondary" to="/Home">
                    Pedir
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-device box-shadow d-none d-md-block"></div>
        <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (reducer) => ({
  detalleProducto:
    reducer.productoReducer.productoDetalleReducer.detalleProducto,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductoDetallado);
