import React, { Component } from "react";
import API from "../../API";
import Cookies from "universal-cookie";

class Productos extends Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  componentDidMount() {
    this.fetchDataMisProductos();
  }

  fetchDataMisProductos = async () => {
    const cookies = new Cookies();
    const restauranteId = cookies.get("rt");
    console.log(restauranteId);
    this.setState({ loading: true, error: null });
    try {
      await API.get(`productoapi/producto/restaurante/${restauranteId}`).then(
        (res) => {
          this.setState({ loading: false, data: res.data.data });
          console.log(this.state);
        }
      );
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };
  render() {
    return (
      <main role="main" className="col-md-11 ml-sm-auto col-lg-12 pt-3 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Lista de productos</h1>
        </div>
      </main>
    );
  }
}

export default Productos;
