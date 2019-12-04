import React, { Component } from "react";
import { connect } from "react-redux";
import ListaProducto from "./ListaProducto";
import { traerProductos } from "../../actions/obtenerProductos";

const mapStateToProps = state => ({
  productos: state.productos
});
const mapDispatchToProps = {
  traerProductos
};

class Productos extends Component {
  state = {
    loading: true,
    error: null
  };

  componentDidMount() {
    this.obtenerProductosDeTiendas();
  }

  obtenerProductosDeTiendas = async () => {
    this.setState({ loading: true, error: null });
    try {
      this.props.traerProductos();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      console.log("Error: ", error.message);
    }
  };

  render() {
    if (this.state.loading === true) {
      return "loading...";
    }
    return <ListaProducto />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos);
