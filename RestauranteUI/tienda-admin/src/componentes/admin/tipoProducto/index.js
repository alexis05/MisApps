import React, { Component } from "react";
import API from "../../../API";
import { Redirect, Link } from "react-router-dom";

class index extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
    clicCrearTipoProducto: false,
    clickEdit: false,
    dataeditable: { _id: "" },
  };

  handleClick(tipoProducto) {
    this.setState({
      dataeditable: tipoProducto,
      clickEdit: true,
    });
  }

  componentDidMount() {
    this.fetchDataTipoProducto();
  }

  fetchDataTipoProducto = async () => {
    this.setState({ loading: true, error: null });
    try {
      await API.get(`/tipo/productoapi`).then((res) => {
        this.setState({ loading: false, data: res.data.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.clicCrearTipoProducto) {
      return <Redirect to="/Admin/TipoProducto/Nuevo" />;
    }
    return (
      <main role="main" className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Tipos de productos</h1>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ clicCrearTipoProducto: true })}
          >
            + Tipo de Producto
          </button>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-lg">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((tipoProducto, index) => (
                  <tr key={index}>
                    <td>{tipoProducto.nombre}</td>
                    <td id={tipoProducto._id}>
                      <Link to={`TipoProducto/${tipoProducto._id}/Editar`}>
                        editar
                      </Link>
                    </td>
                    <td id={tipoProducto._id}>
                      <Link to={`TipoProducto/${tipoProducto._id}/Editar`}>
                        ver
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

export default index;
