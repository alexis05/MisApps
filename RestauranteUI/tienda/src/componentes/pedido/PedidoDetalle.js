import React, { Component } from "react";

class PedidoDetalle extends Component {
  render() {
    return <div>{this.props.match.params.pedidoId}</div>;
  }
}

export default PedidoDetalle;
