import React from "react";
import ListaTienda from "./ListaTiendas";
import API from "../../API";
import { connect } from "react-redux";

class Tiendas extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined
  };
  componentDidMount() {
    this.fechDataTiendas();
  }

  fechDataTiendas = async () => {
    this.setState({ loading: true, error: null });

    try {
      await API.get(`Restaurante/Producto/Cantidad`).then(res => {
        this.setState({ loading: false, data: res.data });
      });
      this.props.dispatch({
        type: "CARGAR_TIENDAS",
        payload: {
          tiendas: this.state.data
        }
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    console.log("redux");
    console.log(this.props);
    if (this.state.loading === true) {
      return "loading...";
    }
    //return <ListaTienda tiendas={this.props.tiendas_redux} />;
    return <ListaTienda tiendas={this.state.data} />;
  }
}

function mapStateToProps(state, props) {
  return {
    tiendas_redux: state.data.tiendas
  };
}

export default connect(mapStateToProps)(Tiendas);
