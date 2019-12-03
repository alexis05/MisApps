import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../API";
import { TRAER_PRODUCTOS } from "../../types/tiendaTypes";
import ListaProducto from "./ListaProducto";

const mapStateToProps = state => ({
  productos: state.productos
});

const mapDispatchToProps = dispatch => ({});

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
      await API.get(`Productos`).then(res => {
        this.setState({ loading: false });
        this.props.dispatch({
          type: TRAER_PRODUCTOS,
          payload: res.data.resultado
        });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true) {
      return "loading...";
    }
    return <ListaProducto />;
  }
}

export default connect(mapStateToProps)(Productos);
