import React from "react";
import ListaTienda from "./ListaTiendas";
import axios from "axios";

class Tienda extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined
  };

  componentDidMount() {
    this.fechData();
  }

  fechData = async () => {
    this.setState({ loading: true, error: null });

    try {
      var config = {
        headers: { "Access-Control-Allow-Origin": "*" }
      };
      axios.get(`http://127.0.0.1:5000/Restaurantes`, config).then(res => {
        const data = res.data;
        this.setState({ loading: false, data: data });
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

export default Tienda;
