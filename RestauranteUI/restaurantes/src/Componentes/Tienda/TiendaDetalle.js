import React from "react";
import { Link } from "react-router-dom";
import img from "../../imagenes/img.svg";
import API from "../../API";
import LocalStorage from "../../LocalStorage";

class TiendaDetalle extends React.Component {
  state = {
    loadingTienda: true,
    loading: true,
    error: null,
    data: undefined,
    restaurante: undefined
  };

  componentDidMount() {
    this.fechDataTiendas();
  }

  fechDataTiendas = async () => {
    this.setState({ loading: true, loadingTienda: true, error: null });

    try {
      await API.get(`Productos/${this.props.match.params.id}`).then(res => {
        this.setState({ loading: false, data: res.data });
      });
      await API.get(`Restaurante/${this.props.match.params.id}`).then(
        response => {
          this.setState({
            loadingTienda: false,
            restaurante: response.data.resultado[0]
          });
        }
      );
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true || this.state.loadingTienda === true) {
      return "loading...";
    }
    return (
      <div className="container col-sm-12 mt-2">
        <LocalStorage tienda={this.props.match.params.id} />
        <div className="card text-center pb-2">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  &laquo;
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Promociones
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/tienda/${this.props.match.params.id}/producto/nuevo`}
                >
                  + Producto
                </Link>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.state.restaurante.nombre}</h5>
            <p className="card-text">{this.state.restaurante.eslogan}</p>
          </div>
          <div className="container">
            <div className="row">
              {this.state.data.resultado.map(producto => (
                <div className="card-deck pb-2 col-sm-4" key={producto.id}>
                  <div className="card">
                    <img className="card-img-top" src={img} alt="Card" />
                    <div className="card-body">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text">{producto.detalle}</p>
                      <Link to="/" className="btn btn-primary">
                        Pedir
                      </Link>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TiendaDetalle;
