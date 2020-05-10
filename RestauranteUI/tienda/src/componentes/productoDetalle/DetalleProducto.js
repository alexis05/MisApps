import React, { Component } from "react";
import { connect } from "react-redux";
import { traerDetalleProducto } from "../../actions/obtenerDetalleProducto";
import ProductoDetallado from "./ProductoDetallado";
import SpinnerGlobal from "../../styleGlobal/SpinnerGlobal";

const mapStateToProps = reducer => ({
  loadingGlobal: reducer.productoReducer.productoDetalleReducer.loadingGlobal
});

const mapDispatchToProps = {
  traerDetalleProducto
};

class DetalleProducto extends Component {
  componentDidMount() {
    this.obtenerDetalleProducto(this.props.match.params.productoId);
  }
  obtenerDetalleProducto = async productoId => {
    try {
      this.props.traerDetalleProducto(productoId);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  render() {
    if (this.props.loadingGlobal) {
      return <SpinnerGlobal mostrar={this.props.loadingGlobal} />;
    }
    return (
      <div className="h-100 container">
        <ProductoDetallado></ProductoDetallado>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleProducto);
