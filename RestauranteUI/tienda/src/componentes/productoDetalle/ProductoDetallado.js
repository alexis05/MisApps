import parser from "html-react-parser";
import React, { Component } from "react";
import "./DetalleProducto";
import { Button, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import "./DetalleProducto.css";
import ImgBack from "../../images/img-back.png";
import { Redirect } from "react-router-dom";
import { Views } from "../../constantes/index";
import CarritoBar from "../carrito/CarritoBar";
import DetallesCarritoView from "../carrito/DetallesCarritoView";
import { addToCart } from "../../actions/Carrito";
import { tengoEsteProductoEnElCarrito } from "../../constantes/index";
import AddPlusIcon from "../../images/add_plus.png";

class ProductoDetallado extends Component {
  state = {
    backToProductos: false,
    howManyInTheCar: 0,
  };

  componentWillReceiveProps(props) {
    const howManyInTheCar = tengoEsteProductoEnElCarrito(
      props.detalleProducto._id,
      props.carrito.productos
    );
    this.setState({ howManyInTheCar });
  }

  onClickAddTocart = () => {
    let newProduct = {
      cantidad: 1,
      restauranteId: this.props.detalleProducto.restaurante,
      productoId: this.props.detalleProducto._id,
    };
    let body = JSON.parse(JSON.stringify(this.props.carrito));
    body.accion = "agregar";
    body.productos = [];
    body.productos.push(newProduct);
    this.props.addToCart(body);
  };

  onBack = () => {
    this.setState({ backToProductos: true });
  };

  render() {
    if (this.state.backToProductos) {
      return <Redirect to="/Home" />;
    }

    return (
      <div>
        {this.props.viewActive === Views.DETAILSCART ? (
          <DetallesCarritoView className="" />
        ) : (
          <div className="position-relative py-md-3 justify-content-center container-detail-product row px-3 ">
            <div className="col-auto col-md-12 col-lg-12 col-xl-12 container-web-card">
              <div className="row align-items-center justify-content-center pt-3 pt-md-2">
                <div className="col-12 text-center align-items-center py-1 px-0">
                  <Row className="d-flex justify-content-between">
                    <div className="col-4">
                      <Button
                        className="btn-back px-2 float-left "
                        onClick={() => this.onBack()}
                      >
                        <img src={ImgBack} alt="back"></img>
                      </Button>
                    </div>
                    <div className="col-auto col-xs-4 col-sm-4 col-md-2 col-lg-2 pl-0">
                      <CarritoBar onlyButton={true}></CarritoBar>
                    </div>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <div className="col-10 pt-2">
                      <h2 className="title-product mb-0 font-weight-normal">
                        {this.props.detalleProducto.nombre}
                      </h2>
                    </div>
                  </Row>
                </div>
              </div>

              <div className="row align-items-center py-3 justify-content-center container-web d-none d-md-flex">
                <div className="col-auto">
                  <div className="row py-3 justify-content-center">
                    <div className="col-auto">
                      <img
                        className="card-img-top img-fluid"
                        src="https://ak0.picdn.net/shutterstock/videos/22010890/thumb/2.jpg"
                        alt="Card"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <Row className="justify-content-center py-2 ">
                    <Col className="text-center">
                      <span className="price-label">
                        ${this.props.detalleProducto.precio}
                      </span>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="row pl-5">
                <div className="col-auto">
                  <div className="row justify-content-center d-none d-md-block d-lg-block py-3">
                    <div className="col-auto">
                      <span className="lead label-detail">
                        {parser(`${this.props.detalleProducto.detalle}`)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row py-3 py-md-2 justify-content-center d-md-none">
                <div className="col-auto">
                  <img
                    className="card-img-top img-fluid"
                    src="https://ak0.picdn.net/shutterstock/videos/22010890/thumb/2.jpg"
                    alt="Card"
                  />
                </div>
              </div>
              <div className="row justify-content-center d-md-none d-lg-none py-3">
                <div className="col-auto">
                  <div className="lead label-detail">
                    {parser(`${this.props.detalleProducto.detalle}`)}
                  </div>
                </div>
              </div>
              <Row className="justify-content-center py-2 d-md-none">
                <Col className="text-center">
                  <span className="price-label">
                    ${this.props.detalleProducto.precio}
                  </span>
                </Col>
              </Row>
              {this.state.howManyInTheCar > 0 ? (
                <Row className="justify-content-center py-3 py-md-2 px-3">
                  <Col
                    xs={12}
                    sm={12}
                    md={"auto"}
                    className="text-center container-quantity-info py-3"
                  >
                    <span className="label-info">
                      Tienes {this.state.howManyInTheCar}{" "}
                      {this.state.howManyInTheCar > 1 ? "unidades" : ""} en el
                      carrito
                    </span>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              <div className="row py-3 w-100 d-md-none container-row-add-to-cart align-items-center justify-content-center">
                <div className="col-12">
                  <div className="row justify-content-center">
                    <div className="col-xs-10 col-sm-10 col-md-8 col-lx-6 px-0">
                      <Button
                        className="btn-add-card py-2"
                        onClick={() => this.onClickAddTocart()}
                      >
                        <img
                          src={AddPlusIcon}
                          alt="Cart"
                          className="float-left"
                        />
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row py-3 d-none d-md-block  align-items-center justify-content-center">
                <div className="col-12">
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <Button
                        className="btn-add-card py-2"
                        onClick={() => this.onClickAddTocart()}
                      >
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-device box-shadow d-none "></div>
            <div className="product-device product-device-2 box-shadow d-none"></div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (reducer) => ({
  detalleProducto:
    reducer.productoReducer.productoDetalleReducer.detalleProducto,
  carrito: reducer.carritoReducer.carritoReducer.carrito,
  viewActive: reducer.carritoReducer.carritoReducer.viewActive,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoDetallado);
