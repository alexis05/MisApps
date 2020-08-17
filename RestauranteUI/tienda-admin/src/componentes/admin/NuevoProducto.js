import React from "react";
import API from "../../API";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import Spinner from "../Spinner";
import CKEditor from "ckeditor4-react";
import SwitchButton from "../utils/MySwitchButton";
import TagInput from "../utils/TagInput";
import { Row } from "reactstrap";

class NuevoProducto extends React.Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    usaurioId: undefined,
    restaurante: undefined,
    redirectProductoList: false,
    foto: "",
  };

  componentDidMount() {
    const cookies = new Cookies();
    const restauranteId = cookies.get("rt");

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
  };

  handleChangeTags = (data) => {
    console.log(data.tags);
    this.setState({
      value: {
        ...this.state.value,
        tags: data.tags,
      },
    });
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

  handleChangeSwitchDisponible = (data) => {
    this.setState({
      value: {
        ...this.state.value,
        disponible: data.checked,
      },
    });
  };
  handleClickSwitchDisponible = (data) => {
    this.setState({
      value: {
        ...this.state.value,
        disponible: data.checked,
      },
    });
  };

  handleChangeCKEditor = (data) => {
    console.log(data);
    this.setState({
      value: {
        ...this.state.value,
        detalle: data,
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

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                Descripción del producto (máximo 100 caracteres).
              </span>
            </div>
            <input
              className="form-control"
              maxLength="100"
              type="text"
              onChange={this.handleChange}
              name="descripcion_corta"
            />
          </div>
          <br></br>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Detalles del producto</span>
            </div>
            <CKEditor
              data=""
              onChange={(evt) =>
                this.handleChangeCKEditor(evt.editor.getData())
              }
              name="detalle"
            />
          </div>

          <div className="form-group pt-3">
            <label>
              Publicar producto (Es necesario para recibir pedidos de este
              producto).
            </label>

            <Row>
              <div className="col-12">
                <SwitchButton
                  onChange={this.handleChangeSwitchDisponible}
                  onClick={this.handleClickSwitchDisponible}
                  id="disponible"
                  name="disponible"
                ></SwitchButton>
              </div>
            </Row>
          </div>

          <div className="form-group">
            <label>
              Etiquetas del producto (ayuda a categorizar el producto).
            </label>
            <TagInput
              className="form-control"
              onChange={this.handleChangeTags}
              name="tag"
            ></TagInput>
          </div>

          <div className="form-group">
            <label>Fotos</label>
            <input
              className="form-control"
              type="html"
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
