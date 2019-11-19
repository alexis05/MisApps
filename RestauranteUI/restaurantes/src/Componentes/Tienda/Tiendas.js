import React from "react";
import ListaTienda from "./ListaTiendas";
import API from "../../API";
import ProductosDeTiendas from "./ProductosDeTiendas";

class Tiendas extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined
  };
  componentDidMount() {
    let tipoDeVista = true;
    if (tipoDeVista) {
      this.obtenerProductosDeTiendas();
    } else {
      this.fechDataTiendas();
    }
  }

  obtenerProductosDeTiendas = async () => {
    this.setState({ loading: true, error: null });

    try {
      await API.get(`Productos`).then(res => {
        this.setState({ loading: false, data: res.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  fechDataTiendas = async () => {
    this.setState({ loading: true, error: null });

    try {
      await API.get(`Restaurante/Producto/Cantidad`).then(res => {
        this.setState({ loading: false, data: res.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true) {
      return "loading...";
    }
    let tipoDeVista = true;
    if (tipoDeVista) return <ProductosDeTiendas tiendas={this.state.data} />;

    return <ListaTienda tiendas={this.state.data} />;
  }
}

export default Tiendas;
