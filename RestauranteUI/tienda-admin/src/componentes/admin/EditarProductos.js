import React from "react";
import API from "../../API";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import Spinner from "../Spinner";
import CKEditor from "ckeditor4-react";
import SwitchButton from "../utils/MySwitchButton";
import TagInput from "../utils/TagInput";
import { Row } from "reactstrap";

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
    loadingGetProducto: true,
    loadingGetUsuario: true,
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
    this.setState({ loadingGetUsuario: true, error: null });
    try {
      await API.get(`usuarioapi/estatus`).then((res) => {
        this.setState({
          loadingGetUsuario: false,
          data: res.data.data,
          usaurioId: res.data.data._id,
          value: { ...this.state.value, registrado_por: res.data.data._id },
        });
      });
    } catch (error) {
      this.setState({ loadingGetUsuario: false, error: error });
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
  };

  handleChangeCKEditor = (data) => {
    this.setState({
      value: {
        ...this.state.value,
        detalle: data,
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

  handleChangeTags = (data) => {
    this.setState({
      value: {
        ...this.state.value,
        tags: data.tags,
      },
    });
  };

  GetDataProducto = async () => {
    this.setState({
      loadingGetProducto: true,
      error: null,
    });
    try {
      let getproductid = this.props.match.params.productId;

      await API.get(`productoapi/producto/${getproductid}`).then((res) => {
        this.setState({
          loadingGetProducto: false,
          value: {
            nombre: res.data.data.nombre,
            detalle: res.data.data.detalle,
            precio: res.data.data.precio,
            disponible: res.data.data.disponible,
            foto: res.data.data.foto,
            descripcion_corta: res.data.data.descripcion_corta,
            tags: res.data.data.tags,
          },
        });
      });
    } catch (error) {
      this.setState({ loadingGetProducto: false, error: error });
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
    if (this.state.loadingGetProducto && this.state.loadingGetUsuario) {
      return "Loading ...";
    }
    if (this.state.redirectProductoList) {
      return <Redirect to="/Admin/Productos" />;
    }
    return (
      <div className="container">
        <h2>Editando producto</h2>

        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>Nombre</label>
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
              value={this.state.value.descripcion_corta}
            />
          </div>
          <br></br>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Detalles del producto</span>
            </div>
            <CKEditor
              data={this.state.value.detalle}
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
                  checked={this.state.value.disponible}
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
              value={this.state.tags}
            ></TagInput>
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
