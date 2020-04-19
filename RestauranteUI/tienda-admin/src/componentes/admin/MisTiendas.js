import React, { Component } from "react";
import Select from "react-select";
import API from "../../API";

class MisTiendas extends Component {
  constructor(props) {
    super(props);
    //this.miTienda = this.getTiendaIdFromLS("tiendaLocal");
  }

  state = {
    loading: true,
    error: null,
    data: undefined,
    usuarioLogueado: undefined,
    misRestaurante: [],
    restauranteDrop: undefined,
  };

  handleChangeDropdown = (e) => {
    console.log(e);
  };
  componentDidMount() {
    this.fechDataUsuarioLogueado();
  }

  rellenarDropDeMisTiendas() {
    const mistiendas = this.state.misRestaurante;
    var lista = [];
    mistiendas.map(function (element) {
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
