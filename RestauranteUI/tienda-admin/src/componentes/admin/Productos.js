import React, { Component } from "react";
import API from "../../API";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

class Productos extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
    clicCrearProducto: false,
  };

  componentDidMount() {
    this.fetchDataMisProductos();
  }

  fetchDataMisProductos = async () => {
    const cookies = new Cookies();
    const restauranteId = cookies.get("rt");
    this.setState({ loading: true, error: null });
    try {
      await API.get(`productoapi/producto/restaurante/${restauranteId}`).then(
        (res) => {
          this.setState({ loading: false, data: res.data.data });
        }
      );
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };
  render() {
    if (this.state.clicCrearProducto) {
      return <Redirect to="/Admin/Producto/Nuevo" />;
    }
    return (
      <main role="main" className="col-md-11 ml-sm-auto col-lg-12 pt-3 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Lista de productos</h1>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ clicCrearProducto: true })}
          >
            + Producto
          </button>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Detalle</th>
                  <th>Precio</th>
                  <th>Disponible</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.detalle}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.disponible ? "Si" : "No"}</td>
                    <td>editar</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }
}

export default Productos;
