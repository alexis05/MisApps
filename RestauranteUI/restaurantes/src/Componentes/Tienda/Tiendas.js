import React from "react";
import ListaTienda from "./ListaTiendas";
import API from "../../API";

class Tiendas extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined
    //apiDomain: Configuraciones._currentValue.apiRoot
  };
  componentDidMount() {
    this.fechDataTiendas();
  }

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

    return <ListaTienda tiendas={this.state.data} />;
  }
}

export default Tiendas;
