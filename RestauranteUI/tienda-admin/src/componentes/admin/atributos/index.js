import React, { Component } from "react";
import API from "../../../API";
import { Redirect, Link } from "react-router-dom";

class index extends Component {
  state = {
    loading: true,
    error: null,
    data: [],
    clicCrearAtributo: false,
    clickEdit: false,
    dataeditable: { _id: "" },
  };

  handleClick(atributo) {
    this.setState({
      dataeditable: atributo,
      clickEdit: true,
    });
  }

  componentDidMount() {
    this.fetchDataMisAtributos();
  }

  fetchDataMisAtributos = async () => {
    this.setState({ loading: true, error: null });
    try {
      await API.get(`atributosapi`).then((res) => {
        this.setState({ loading: false, data: res.data.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.clicCrearAtributo) {
      return <Redirect to="/Admin/Atributo/Nuevo" />;
    }
    return (
      <main role="main" className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Atributos</h1>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ clicCrearAtributo: true })}
          >
            + Atributo
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
                {this.state.data.map((atributo, index) => (
                  <tr key={index}>
                    <td>{atributo.nombre}</td>
                    <td id={atributo._id}>
                      <Link to={`Atributo/${atributo._id}/Editar`}>editar</Link>
                    </td>
                    <td id={atributo._id}>
                      <Link to={`Atributo/${atributo._id}/Editar`}>ver</Link>
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
