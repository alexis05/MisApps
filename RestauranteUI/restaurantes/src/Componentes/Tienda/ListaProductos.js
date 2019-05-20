import React from "react";
import axios from "axios";

class ListaProductos extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined
  };

  componentDidMount() {
    this.fechDataTiendas();
  }

  fechDataTiendas = async () => {
    this.setState({ loading: true, error: null });

    try {
      axios.get(`/Productos/`).then(res => {
        this.setState({ loading: false, data: res.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    return "listaProductos";
  }
}

export default ListaProductos;
