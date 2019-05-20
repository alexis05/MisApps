import React from "react";
import { Link } from "react-router-dom";
import img from "../../imagenes/img.svg";
import API from "../../API";

class TiendaDetalle extends React.Component {
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
      await API.get(`Productos/${this.props.match.params.id}`).then(res => {
        this.setState({ loading: false, data: res.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    console.log(this.props.match.params.id);
    if (this.state.loading === true) {
      return "loading...";
    }
    return (
      <div className="container mt-2">
        <div className="card text-center">
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
            </ul>
          </div>
          <div className="card-body">
            <h5 className="card-title">Nombre de la tienda.</h5>
            <p className="card-text">slogan</p>
          </div>
          <div className="container">
            <div className="row">
              {this.state.data.resultado.map(producto => (
                <div className="col-sm">
                  <div className="card">
                    <img className="card-img-top" src={img} alt="Card" />
                    <div className="card-body">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text">{producto.detalle}</p>
                      <Link to="/" className="btn btn-primary">
                        Comprar
                      </Link>
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
