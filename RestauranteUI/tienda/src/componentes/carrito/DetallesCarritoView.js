import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import {
  backProductListView,
  detalleCarrito,
  editCart,
  pedidoRealizado,
} from "../../actions/Carrito";
import { Redirect } from "react-router-dom";
import { hacerPedido } from "../../actions/Pedido";
import BasureroIcon from "../../images/basurero.svg";
import ChevronRight from "../../images/chevron-right.svg";
import ChevronLeft from "../../images/chevron-left.svg";
import "./carritoDetalle.css";
import Spinner from "../../styleGlobal/Spinner";

class DetallesCarritoView extends Component {
  state = {
    mostrarInputs: false,
    pedido: undefined,
  };

  onBlurCantidad = (element) => {
    const valor = element.target.value;
    if (valor < 1) return;
    const name = element.target.name;
    const id = element.target.id;
    if (name !== "cantidad") return;
    let producto = this.props.carrito.productos.filter((prod) => {
      return prod.productoId === id;
    });
    producto[0].cantidad = Number(valor);
    let body = this.props.carrito;
    body.accion = "agregar";
    body.productos = [];
    body.productos.push(producto[0]);
    this.props.editCart(body);
  };

  onClickDisminuirCantidad = (productoId) => {
    if (!productoId) return;
    let producto = this.props.carrito.productos.filter((prod) => {
      return prod.productoId === productoId;
    });
    if (producto[0].cantidad > 0) {
      if (producto[0].cantidad === 1) return;
      producto[0].cantidad = Number(producto[0].cantidad) - Number(1);
      let body = this.props.carrito;
      body.accion = "agregar";
      body.productos = [];
      body.productos.push(producto[0]);
      this.props.editCart(body);
    } else {
      throw "La cantidad del producto debe ser mayor a Cero";
    }
  };

  onClickAumentarCantidad = (productoId) => {
    if (!productoId) return;
    let producto = this.props.carrito.productos.filter((prod) => {
      return prod.productoId === productoId;
    });
    producto[0].cantidad = Number(producto[0].cantidad) + Number(1);
    let body = this.props.carrito;
    body.accion = "agregar";
    body.productos = [];
    body.productos.push(producto[0]);
    this.props.editCart(body);
  };

  obtenerDetalleCarrito = async () => {
    this.setState({ loading: true, error: null });
    try {
      this.props.detalleCarrito();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      console.log("Error: ", error.message);
    }
  };

  onClickDeleteProducto = (productoId) => {
    let producto = this.props.carrito.productos.filter((prod) => {
      return prod.productoId === productoId;
    });

    let body = this.props.carrito;
    body.accion = "remover";
    body.productos = [];
    body.productos.push(producto[0]);
    this.props.editCart(body);
  };

  onBackProductList = () => {
    this.props.backProductListView();
  };
  onHiddenInputsToPedido = () => {
    this.setState({ mostrarInputs: false });
  };

  onDisplayInputsToPedido = () => {
    this.setState({ mostrarInputs: true });
  };

  onDisplayCheckout = () => {
    this.setState({ mostrarInputs: false });
  };

  onBlur = (e) => {
    this.setState({
      pedido: {
        ...this.state.pedido,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleChange = (e) => {
    this.setState({
      pedido: {
        ...this.state.pedido,
        [e.target.name]: e.target.value,
      },
    });
  };

  onHacerPedido = () => {
    try {
      this.props.hacerPedido(this.state.pedido);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      console.log("Error: ", error.message);
    }
  };

  componentDidMount() {
    this.obtenerDetalleCarrito();
  }
  render() {
    if (this.props.idPedidoRealizado.length > 0) {
      return <Redirect to={`/Home/Pedido/${this.props.idPedidoRealizado}`} />;
    }
    if (this.state.loading) return <Spinner></Spinner>;
    if (this.props.carrito.productos.length === 0) {
      return (
        <div>
          <p>No hay productos en el carrito.</p>
          <Button onClick={this.onBackProductList}>{"<-"} Regresar</Button>
        </div>
      );
    }
    return (
      <div className="col-sm-12 details-cart-view ">
        <Row className="justify-content-center">
          <Col sm={12} className="text-center">
            <Row>
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Carrito de compras</span>
                  <span className="badge badge-secondary badge-pill">
                    {this.props.carrito.totalDeProductos}
                  </span>
                </h4>
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Costo de envio</span>
                    <strong>$10.00</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>SubTotal</span>
                    <strong>${this.props.carrito.precioTotal}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total</span>
                    <strong>${this.props.carrito.precioTotal}</strong>
                  </li>
                </ul>

                <form className="card p-2">
                  <div className="input-group text-center justify-content-center">
                    <div className="input-group-append">
                      {this.state.mostrarInputs ? (
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="direccionEnvio">
                              Direccion de envio
                            </label>
                            <textarea
                              name="direccionEnvio"
                              onBlur={this.onBlur}
                              onChange={this.handleChange}
                              className="form-control"
                              id="direccionEnvio"
                              placeholder="1234 David Chiriqui"
                            ></textarea>
                            <div className="invalid-feedback">
                              Por favor introduzca su direccion de envio.
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="nota">Nota del pedido</label>
                            <textarea
                              name="nota"
                              onBlur={this.onBlur}
                              onChange={this.handleChange}
                              className="form-control"
                              id="nota"
                              placeholder="Puedes ingresar una nota para la tienda"
                            ></textarea>
                            <div className="invalid-feedback">
                              Ingrese una nota del pedido para la tienda.
                            </div>
                          </div>
                          <Button
                            className="btn btn-danger"
                            onClick={this.onHiddenInputsToPedido}
                          >
                            Cancelar
                          </Button>{" "}
                          <Button
                            className="btn btn-success"
                            onClick={this.onHacerPedido}
                          >
                            Comprar
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="btn btn-success"
                          onClick={this.onDisplayInputsToPedido}
                        >
                          Continuar
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Productos en el carrito</h4>
                <div className="table-responsive">
                  {this.props.carrito.productosDetallado ? (
                    <table className="table table-sm heavyTable">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.carrito.productosDetallado.map(
                          (producto) => (
                            <tr key={producto._id}>
                              <td>
                                <div>
                                  <img
                                    className="card-img-top img-fluid imagenProductoMD"
                                    src="https://ak0.picdn.net/shutterstock/videos/22010890/thumb/2.jpg"
                                    alt="Card"
                                  />
                                  {producto.nombre}
                                </div>
                              </td>
                              <td>
                                <div>{producto.precio}</div>
                              </td>
                              <td>
                                <div>
                                  <img
                                    onClick={this.onClickDisminuirCantidad.bind(
                                      null,
                                      producto._id
                                    )}
                                    src={ChevronLeft}
                                    alt="Disminuir cantidad"
                                  ></img>{" "}
                                  <input
                                    name="cantidad"
                                    id={producto._id}
                                    onBlur={this.onBlurCantidad}
                                    className="productoCantidad"
                                    type="text"
                                    defaultValue={producto.cantidad}
                                  ></input>{" "}
                                  <img
                                    onClick={this.onClickAumentarCantidad.bind(
                                      null,
                                      producto._id
                                    )}
                                    src={ChevronRight}
                                    alt="Aumentar cantidad"
                                  ></img>
                                </div>
                              </td>
                              <td>
                                <div>{producto.total}</div>
                              </td>
                              <td>
                                <div
                                  onClick={this.onClickDeleteProducto.bind(
                                    null,
                                    producto._id
                                  )}
                                  data-productoid={producto._id}
                                >
                                  <span>
                                    <img src={BasureroIcon} alt="Remover"></img>
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <Spinner></Spinner>
                  )}
                </div>
              </div>
            </Row>
          </Col>
        </Row>
        <Button onClick={this.onBackProductList}>{"<-"} Regresar</Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  carrito: state.carritoReducer.carritoReducer.carrito,
  loadingGlobal: state.carritoReducer.carritoReducer.loadingGlobal,
  idPedidoRealizado: state.carritoReducer.pedidoReducer.idPedidoRealizado,
});

const mapDispatchToProps = {
  backProductListView,
  detalleCarrito,
  editCart,
  hacerPedido,
  pedidoRealizado,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetallesCarritoView);
