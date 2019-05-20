import React from "react";
import API from "../../API";

class NuevoProducto extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined
  };

  handleChange = e => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value
      }
    });
  };

  handleCheckBox = e => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.checked
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
      <div>
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
            <label>encargado</label>
            <input
              className="form-control"
              type="text"
              onChange={this.handleChange}
              name="registrado_por"
            />
          </div>

          <div className="form-group">
            <label>restaurante</label>
            <input
              className="form-control"
              type="text"
              onChange={this.handleChange}
              name="restaurante"
            />
          </div>

          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

export default NuevoProducto;
