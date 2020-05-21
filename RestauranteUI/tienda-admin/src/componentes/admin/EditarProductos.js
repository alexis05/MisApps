import React from "react";
import API from "../../API";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import Spinner from "../Spinner";

class EditarProductos extends React.Component {
  state = {
    loading: false,
    error: null,
    Item: "",
    nombre: "",
    precio: "",
    detalle: "",
    disponible: "",
    foto: "",
    usaurioId: undefined,
    restaurante: undefined,
    redirectProductoList: false,
    value: {},
  };

  componentDidMount() {
    const cookies = new Cookies();
    const restauranteId = cookies.get("rt");
    this.setState({
      restauranteId: restauranteId,
    });
    this.fechDataUsuarioLogueado();
    this.GetDataProducto();
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
      console.log("Llamada usuarios");
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

  handleSubmit = (e) => {
    e.preventDefault();

    this.UpdateDataProducto(this.state.value);
  };

  handleCheckBox = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.checked,
        restaurante: this.state.restauranteId,
      },
    });

    console.log(this.state.value);
  };

  GetDataProducto = async (e) => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      let getproductid = this.props.match.params.productId;

      await API.get(`productoapi/producto/${getproductid}`).then((res) => {
        console.log(res.data, "Data Api");

        this.setState({
          loading: false,
          value: {
            nombre: res.data.data.nombre,
            detalle: res.data.data.detalle,
            precio: res.data.data.precio,
            disponible: res.data.data.disponible,
            foto: res.data.data.foto,
          },
        });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  UpdateDataProducto = async (producto) => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      let getproductid = this.props.match.params.productId;

      await API.put(`productoapi/producto/${getproductid}`, producto).then(
        (res) => {
          this.setState({
            loading: false,
            redirectProductoList: true,
          });
        }
      );
    } catch (error) {
      this.setState({ loading: false, error: error });
      console.log("Error API");
    }
  };

  render() {
    if (this.state.loading == true) {
      return "Loding ..";
    }
    if (this.state.redirectProductoList) {
      return <Redirect to="/Admin/Productos" />;
    }
    return (
      <div className="col-md-6">
        <h2>Editando Productos</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              onChange={this.handleChange}
              name="nombre"
              value={this.state.value.nombre}
            />
          </div>

          <div className="form-group">
            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              value={this.state.value.precio}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Descripcion Adicional</span>
            </div>
            <textarea
              className="form-control"
              onChange={this.handleChange}
              name="detalle"
              value={this.state.value.detalle}
              aria-label="Descripcion Adicional"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="disponible">Disponible</label>
            <input
              className="form-control"
              type="checkbox"
              id="disponible"
              onClick={this.handleCheckBox}
              name="disponible"
              checked={this.state.value.disponible}
            />
          </div>

          <div className="form-group">
            <label>Fotos</label>
            <input
              className="form-control"
              type="bo"
              onChange={this.handleChange}
              name="foto"
              value={this.state.value.foto}
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
          <button className="btn btn-primary">Actualizar</button>
        </form>
      </div>
    );
  }
}

export default EditarProductos;
