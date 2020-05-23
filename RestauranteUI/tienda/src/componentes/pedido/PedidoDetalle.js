import React, { Component } from "react";
import { connect } from "react-redux";
import { obtenerPedido } from "../../actions/Pedido";
import { backProductListView } from "../../actions/Carrito";
import { Row, Col, Button } from "reactstrap";
import { Redirect } from "react-router-dom";

const mapStateToProps = (reducer) => ({
  pedido: reducer.carritoReducer.pedidoReducer,
});

const mapDispatchToProps = {
  obtenerPedido,
};

class PedidoDetalle extends Component {
  componentDidMount() {
    this.props.obtenerPedido(this.props.match.params.pedidoId);
  }
  render() {
    if (this.props.pedido.pedido._id) {
      return (
        <div className="pt-2 mt-2 col-12">
          <Row>
            <div className="col-12">
              <Row>
                <Col className="text-center justify-content-center">
                  <h3>Pedido #{this.props.pedido.pedido.transaccion}</h3>
                </Col>
              </Row>
              <Row>
                <Col className="text-center justify-content-center pb-3">
                  ID Pedido: {this.props.pedido.pedido._id}
                </Col>
              </Row>
            </div>
          </Row>
          <Row>
            <Col sm="12">
              <div className="card">
                <div className="card-header">
                  <Row>
                    <div className="col-3">
                      <Row>
                        <Col>PEDIDO REALIZADO:</Col>
                      </Row>
                      <Row>
                        <Col>{this.props.pedido.pedido.fechaPedido}</Col>
                      </Row>
                    </div>
                    <div className="col-2">
                      <Row>
                        <Col>TOTAL:</Col>
                      </Row>
                      <Row>
                        <Col>{this.props.pedido.pedido.precioTotal}</Col>
                      </Row>
                    </div>
                    <div className="col-5">
                      <Row>
                        <Col>DIRECCIÓN DE ENTREGA:</Col>
                      </Row>
                      <Row>
                        <Col>{this.props.pedido.pedido.direccionEnvio}</Col>
                      </Row>
                    </div>
                    <div className="col-2">
                      <Row>
                        <Col>ESTADO:</Col>
                      </Row>
                      <Row>
                        <Col>{this.props.pedido.pedido.estado}</Col>
                      </Row>
                    </div>
                  </Row>
                </div>
                {this.props.pedido.pedido.productos.map((producto, index) => (
                  <div className="card-body" key={index}>
                    <div className="row">
                      <div className="col-2">
                        <h5 className="card-title">{producto.nombre}</h5>
                      </div>
                      <div className="col-2">
                        <div>Cantidad: </div>
                        <h5 className="card-title">{producto.cantidad}</h5>
                      </div>
                      <div className="col-3">
                        <div>Costo unitario: </div>
                        <h5 className="card-title">{producto.precio}</h5>
                      </div>
                      <div className="col-3">
                        <div>Costo total: </div>
                        <h5 className="card-title">{producto.total}</h5>
                      </div>
                      <div className="col-2">
                        <div>Estado: </div>
                        <h5 className="card-title">{producto.estado}</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="card-text">{producto.detalle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      );
    }
    return <div></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PedidoDetalle);
