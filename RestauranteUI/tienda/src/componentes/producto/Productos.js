import React, { Component } from "react";
import { connect } from "react-redux";
import ListaProducto from "./ListaProducto";
import { traerProductos } from "../../actions/obtenerProductos";
import BottomScrollListener from "react-bottom-scroll-listener";
import SpinnerGlobal from "../../styleGlobal/SpinnerGlobal";

const mapStateToProps = state => ({
  productos: state.productoReducer.productoReducer.productos,
  existeMasProductos: state.productoReducer.productoReducer.existenProductos,
  loadingGlobal: state.productoReducer.productoReducer.loadingGlobal
});
const mapDispatchToProps = {
  traerProductos
};

class Productos extends Component {
  state = {
    loading: true,
    error: null,
    limitValue: 50,
    skipValue: 0,
    nuevosProductosAPaginar: 50
  };

  handleOnDocumentBottom = () => {
    if (this.props.loadingGlobal) return;
    if (this.props.existeMasProductos) {
      let newSkipValue = this.props.productos.length;
      let newLimitValue = 0;
      if (this.state.limitValue === newSkipValue) {
        newLimitValue =
          this.state.limitValue + this.state.nuevosProductosAPaginar;
      } else {
        newLimitValue = newSkipValue + this.state.nuevosProductosAPaginar;
      }

      this.setState({ skipValue: newSkipValue, limitValue: newLimitValue });
    }
    this.obtenerProductosDeTiendas(this.state.limitValue, this.state.skipValue);
  };
  componentDidMount() {
    this.setState({ loading: true, error: null });
    this.obtenerProductosDeTiendas(this.state.limitValue, this.state.skipValue);
  }

  obtenerProductosDeTiendas = async (limit, skip) => {
    this.setState({ loading: true, error: null });
    try {
      this.props.traerProductos(limit, skip);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      console.log("Error: ", error.message);
    }
  };

  render() {
    return (
      <div>
        <SpinnerGlobal mostrar={this.props.loadingGlobal} />
        <ListaProducto />
        <BottomScrollListener onBottom={this.handleOnDocumentBottom} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos);
