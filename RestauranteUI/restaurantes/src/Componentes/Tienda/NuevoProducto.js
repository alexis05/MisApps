import React from "react";
import API from "../../API";
import Select from "react-select";
class NuevoProducto extends React.Component {
  constructor(props) {
    super(props);
    //this.miTienda = this.getTiendaIdFromLS("tiendaLocal");
  }

  state = {
    loading: true,
    error: null,
    data: undefined,
    encargadosList: undefined
  };

  getTiendaIdFromLS(key) {
    if (localStorage.hasOwnProperty(key)) {
      let value = localStorage.getItem(key);
      try {
        value = JSON.parse(value);
        return value;
      } catch (e) {
        return e;
      }
    }
  }

  rellenarDropDeEncargados() {
    const encargados_tienda = this.state.data.resultado;
    var lista = [];
    encargados_tienda.forEach(function(element) {
      lista.push({
        label: element.usuario[0].nombre,
        value: element.id
      });
    });
    this.setState({ encargadosList: lista });
  }

  componentDidMount() {
    this.fechDataEncargados();
  }

  fechDataEncargados = async () => {
    this.setState({ loading: true, error: null });
    try {
      await API.get(`Encargados/${this.props.match.params.id}`).then(res => {
        this.setState({ loading: false, data: res.data });
        this.rellenarDropDeEncargados();
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleChange = e => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value,
        restaurante: this.props.match.params.id
      }
    });
  };

  handleChangeDropdown = e => {
    this.setState({
      value: {
        ...this.state.value,
        registrado_por: e.value,
        restaurante: this.props.match.params.id
      }
    });
  };

  handleCheckBox = e => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.checked,
        restaurante: this.props.match.params.id
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.crearProducto(this.state.value);
  };

  crearProducto = async producto => {
    this.setState({ loading: true, error: null });

    try {
      await API.post(`Producto/Nuevo`, producto).then(res => {
        this.setState({ loading: false, data: res.data });
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Nuevo Producto</h1>

        <form onSubmit={this.handleSubmit}>
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
            <label htmlFor="disponible">Disponible para la venta</label>
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
            <label>Encargado</label>
            <Select
              options={this.state.encargadosList}
              isSearchable
              placeholder="Seleccione un encargado"
              onChange={this.handleChangeDropdown}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="hidden"
              onChange={this.handleChange}
              name="restaurante"
              value={this.props.match.params.id}
            />
          </div>

          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

export default NuevoProducto;
