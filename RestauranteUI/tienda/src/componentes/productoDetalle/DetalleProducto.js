import React, { Component } from "react";
import { connect } from "react-redux";
import { traerDetalleProducto } from "../../actions/obtenerDetalleProducto";
import ProductoDetallado from "./ProductoDetallado";
const mapStateToProps = state => ({
  detalleProducto: state.productoReducer.productoReducer.detalleProducto,
  loadingGlobal: state.productoReducer.productoReducer.loadingGlobal
});

const mapDispatchToProps = {
  traerDetalleProducto
};

class DetalleProducto extends Component {
  state = {
    loading: true,
    error: null
  };

  componentDidMount() {
    this.setState({ loading: true, error: null });
    this.obtenerDetalleProducto(this.props.match.params.productoId);
  }

  obtenerDetalleProducto = async productoId => {
    this.setState({ loading: true, error: null });
    try {
      this.props.traerDetalleProducto(productoId);
      this.setState({ loading: false, error: null });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      console.log("Error: ", error.message);
    }
  };
  render() {
    return (
      <div>
        <ProductoDetallado></ProductoDetallado>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleProducto);
