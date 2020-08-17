import React, { Component } from "react";
import API from "../../API";
import Cookies from "universal-cookie";
import { Redirect, Link } from "react-router-dom";

class Productos extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
    clicCrearProducto: false,
    clickEdit: false,
    dataeditable: { _id: "" },
  };

  handleClick(producto) {
    this.setState({
      dataeditable: producto,
      clickEdit: true,
    });
  }

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
      <main role="main" className="container">
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
            <table className="table table-striped table-lg">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción Corta</th>
                  <th>Precio</th>
                  <th className="text-center">Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion_corta}</td>
                    <td>{producto.precio}</td>
                    <td className="text-center">
                      {producto.disponible ? "Si" : "No"}
                    </td>
                    <td id={producto._id}>
                      <Link to={`Productos/${producto._id}/Editar`}>
                        editar
                      </Link>
                    </td>
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
