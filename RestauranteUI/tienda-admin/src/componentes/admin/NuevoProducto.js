import React from "react";
import API from "../../API";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import Spinner from "../Spinner";

class NuevoProducto extends React.Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    usaurioId: undefined,
    restaurante: undefined,
    redirectProductoList: false,
  };

  componentDidMount() {
    const cookies = new Cookies();
    const restauranteId = cookies.get("rt");
    console.log(restauranteId);
    this.setState({ restauranteId: restauranteId });
    this.fechDataUsuarioLogueado();
  }

  fechDataUsuarioLogueado = async () => {
    this.setState({ loading: true, error: null });
    try {
      await API.get(`usuarioapi/estatus`).then((res) => {
        this.setState({
          loading: false,
          data: res.data.data,
          usaurioId: res.data.data._id,
          value: { ...this.state.value, registrado_por: res.data.data._id },
        });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleChange = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value,
        restaurante: this.state.restauranteId,
      },
    });
    console.log(this.state.value);
  };

  handleCheckBox = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.checked,
        restaurante: this.state.restauranteId,
      },
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.value);
    this.crearProducto(this.state.value);
  };

  crearProducto = async (producto) => {
    this.setState({ loading: true, error: null });
    try {
      await API.post(`productoapi/producto`, producto).then((res) => {
        this.setState({
          loading: false,
          data: res.data,
          redirectProductoList: true,
        });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.redirectProductoList) {
      return <Redirect to="/Admin/Productos" />;
    }
    return (
      <div className="container">
        <h2>Crear Producto</h2>

        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              onChange={this.handleChange}
              name="nombre"
            />
          </div>

          <div className="form-group">
            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              onChange={this.handleChange}
              name="precio"
            />
          </div>

          <div className="form-group">
            <label>Detalle</label>
            <input
              className="form-control"
              type="textarea"
              onChange={this.handleChange}
              name="detalle"
            />
          </div>

          <div className="form-group">
            <label htmlFor="disponible">Disponible</label>
            <input
              className="form-control"
              type="checkbox"
              id="disponible"
              onClick={this.handleCheckBox}
              name="disponible"
            />
          </div>

          <div className="form-group">
            <label>Fotos</label>
            <input
              className="form-control"
              type="text"
              onChange={this.handleChange}
              name="fotos"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="hidden"
              onChange={this.handleChange}
              name="restaurante"
              value={this.state.restaurante}
            />
          </div>
          {this.state.loading ? (
            <div className="row d-flex text-center justify-content-center">
              <Spinner />
            </div>
          ) : (
            <span></span>
          )}
          <button className="btn btn-primary">Guardar</button>
        </form>
      </div>
    );
  }
}

export default NuevoProducto;
