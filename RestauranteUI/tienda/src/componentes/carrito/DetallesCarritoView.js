import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import { backProductListView, detalleCarrito } from "../../actions/Carrito";
import BasureroIcon from "../../images/basurero.svg";
import ChevronRight from "../../images/chevron-right.svg";
import ChevronLeft from "../../images/chevron-left.svg";
import "./carritoDetalle.css";

class DetallesCarritoView extends Component {
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

  onBackProductList = () => {
    this.props.backProductListView();
  };

  componentDidMount() {
    this.obtenerDetalleCarrito();
  }
  render() {
    return (
      <div className="col-sm-12 details-cart-view ">
        <Row className="justify-content-center">
          <Col sm={12} className="text-center">
            <Row>
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Detalle</span>
                  <span className="badge badge-secondary badge-pill">
                    {this.props.carrito.totalDeProductos}
                  </span>
                </h4>
                <ul className="list-group mb-3">
                  {this.props.carrito.productosDetallado.map(
                    (producto, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between lh-condensed"
                      >
                        <div className="text-left">
                          <div className="ml-0 pl-0 my-0">
                            {producto.nombre}
                          </div>
                          <small className="text-muted">
                            {producto.detalle}
                          </small>
                        </div>
                        <span className="text-muted">${producto.total}</span>
                      </li>
                    )
                  )}

                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total</span>
                    <strong>${this.props.carrito.precioTotal}</strong>
                  </li>
                </ul>

                <form className="card p-2">
                  <div className="input-group text-center justify-content-center">
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-success">
                        Comprar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Productos en el carrito</h4>
                <div className="table-responsive">
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
                        (producto, index) => (
                          <tr key={index}>
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
                                  src={ChevronLeft}
                                  alt="Disminuir cantidad"
                                ></img>{" "}
                                <input
                                  className="productoCantidad"
                                  type="text"
                                  defaultValue={producto.cantidad}
                                ></input>{" "}
                                <img
                                  src={ChevronRight}
                                  alt="Aumentar cantidad"
                                ></img>
                              </div>
                            </td>
                            <td>
                              <div>{producto.total}</div>
                            </td>
                            <td>
                              <div>
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
});

const mapDispatchToProps = {
  backProductListView,
  detalleCarrito,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetallesCarritoView);
