import React, { Component } from "react";
import Select from "react-select";
import API from "../../API";
import Cookies from "universal-cookie";

class MisTiendas extends Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    usuarioLogueado: undefined,
    misRestaurante: [],
    restauranteDrop: undefined,
  };

  handleChangeDropdown = (e) => {
    const cookies = new Cookies();
    cookies.set("rt", e.value, { path: "/Admin" });
    // @TODO: cuando se cambia a una nueva tienda se debe act todo el admin
  };
  componentDidMount() {
    this.fechDataUsuarioLogueado();
  }

  rellenarDropDeMisTiendas() {
    const mistiendas = this.state.misRestaurante;
    var lista = [];
    mistiendas.forEach(function (element) {
      lista.push({
        label: element.nombre,
        value: element._id,
      });
    });
    this.setState({ restauranteDrop: lista });
  }
  fechDataUsuarioLogueado = async () => {
    this.setState({ loading: true, error: null });
    try {
      await API.get(`usuarioapi/estatus`).then((res) => {
        this.setState({ loading: false, usuarioLogueado: res.data.data });
        this.fechDataMisTienda(res.data.data._id);
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  fechDataMisTienda = async (usuarioId) => {
    this.setState({ loading: true, error: null });
    try {
      await API.get(`restauranteapi/misrestaurante/${usuarioId}`).then(
        (res) => {
          this.setState({ loading: false, misRestaurante: res.data.data });
          this.rellenarDropDeMisTiendas();
          if (res.data.data.length === 1) {
            const cookies = new Cookies();
            cookies.set("rt", res.data.data[0]._id, { path: "/Admin" });
          }
        }
      );
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.misRestaurante.length === 1) {
      return (
        <div className="navbar-brand col-sm-3 col-md-2 mr-0">
          <Select
            value={this.state.restauranteDrop}
            options={this.state.restauranteDrop}
            isSearchable
            placeholder="Seleccione una tienda"
            onChange={this.handleChangeDropdown}
          />
        </div>
      );
    }
    return (
      <div>
        <Select
          options={this.state.restauranteDrop}
          isSearchable
          placeholder="Seleccione una tienda"
          onChange={this.handleChangeDropdown}
        />
      </div>
    );
  }
}

export default MisTiendas;
