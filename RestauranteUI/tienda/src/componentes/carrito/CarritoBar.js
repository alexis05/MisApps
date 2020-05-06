import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Label } from "reactstrap";
import ShopingCart from "../../images/shopping-cart-white.png";
import {
  viewCart,
  backProductListView,
  detalleCarrito,
} from "../../actions/Carrito";

class CarritoBar extends Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    this.obtenerDetalleCarrito();
  }

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
  onClickViewCart = () => {
    this.props.viewCart();
  };

  render() {
    if (this.state.loading) {
      return <div>cargando...</div>;
    }
    return (
      <div className="col-sm-12 container-cart-list">
        <Row className="justify-content-center">
          <Col sm={12} className="text-center">
            <div className="fixed-bottom">
              <div className="cart-box">
                <Row className="justify-content-center  mx-3 mb-2 container-cart-values align-items-center">
                  <Col xs={"auto"} className=" text-left h-100 px-0">
                    <Label className="total-label mb-0">Total :</Label>
                  </Col>
                  <Col xs={6} className="text-left h-100">
                    <Label className="total-value mb-0">
                      $
                      {this.props.carrito.precioTotal
                        ? this.props.carrito.precioTotal
                        : "0.00"}
                    </Label>
                  </Col>
                  <Col xs={2} className="pr-0 h-100 text-right">
                    <Button
                      className="btn form-control btn-view-cart"
                      onClick={this.onClickViewCart}
                    >
                      <span>
                        ({" "}
                        {this.props.carrito.totalDeProductos
                          ? this.props.carrito.totalDeProductos
                          : "0"}{" "}
                        )
                      </span>
                      <img src={ShopingCart} alt="Cart" />
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  carrito: state.carritoReducer.carritoReducer.carrito,
});

const mapDispatchToProps = {
  viewCart,
  detalleCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarritoBar);
