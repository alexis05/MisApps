import React, { Component } from "react";
import API from "../../../API";
import { Redirect, Link } from "react-router-dom";

class index extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
    clicCrearCategoria: false,
    clickEdit: false,
    dataeditable: { _id: "" },
  };

  handleClick(categoria) {
    this.setState({
      dataeditable: categoria,
      clickEdit: true,
    });
  }

  componentDidMount() {
    this.fetchDataCategorias();
  }

  fetchDataCategorias = async () => {
    this.setState({ loading: true, error: null });
    try {
      await API.get(`categoriaapi`).then((res) => {
        this.setState({ loading: false, data: res.data.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.clicCrearCategoria) {
      return <Redirect to="/Admin/Categoria/Nuevo" />;
    }
    return (
      <main role="main" className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Categorias</h1>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ clicCrearCategoria: true })}
          >
            + Categoria
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
                {this.state.data.map((categoria, index) => (
                  <tr key={index}>
                    <td>{categoria.nombre}</td>
                    <td id={categoria._id}>
                      <Link to={`Categoria/${categoria._id}/Editar`}>
                        editar
                      </Link>
                    </td>
                    <td id={categoria._id}>
                      <Link to={`Categoria/${categoria._id}/Editar`}>ver</Link>
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
