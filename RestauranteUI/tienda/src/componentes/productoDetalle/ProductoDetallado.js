import React from "react";
import "./DetalleProducto";
import { Button,Row,Col,InputGroup,InputGroupAddon,Input ,Link} from 'reactstrap';
import { connect } from "react-redux";
import "./DetalleProducto.css"
import ImgBack from "../../images/img-back.png";


const ProductoDetallado = ({ detalleProducto }) => {
  return (
    <div>
      <div className="position-relative py-md-3 justify-content-center container-detail-product row px-3 ">
        <div className="col-auto col-md-6 container-web-card">
          <div className="row align-items-center justify-content-center pt-3 pt-md-2">
         
            <div className="col-12 text-center align-items-center py-1 px-0">
                <Button className="btn-back px-2 float-left d-md-none">
                  <img src={ImgBack} alt="back"></img>
                </Button>
                <h2 className="title-product mb-0 font-weight-normal">
                {detalleProducto.nombre}
              </h2>
            </div>
          </div>
          
          <div className="row py-3 justify-content-center container-web d-none d-md-flex">
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
            <div className="col-6">
              <div className="row justify-content-center  py-3">
                  <div className="col-auto">
                    <span className="lead label-detail">{detalleProducto.detalle}</span>
                  </div>
                </div>
                <Row className="justify-content-center py-2 ">
                  <Col className="text-center">
                      <span className="price-label">${detalleProducto.precio}</span>
                  </Col>
                </Row>
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
         <div className="row justify-content-center d-md-none py-3">
            <div className="col-auto">
              <span className="lead label-detail">{detalleProducto.detalle}</span>
            </div>
         </div>
         <Row className="justify-content-center py-2 d-md-none">
           <Col className="text-center">
              <span className="price-label">${detalleProducto.precio}</span>
           </Col>
         </Row>
         <Row className="justify-content-center py-3 py-md-2 px-3">
           <Col xs={12} sm={12} md={"auto"} className="text-center container-quantity-info py-3">
              <span className="label-info">Tienes 2 unidades en el carrito</span>
           </Col>
         </Row>
          <div className="row py-3 w-100 d-md-none container-row-add-to-cart align-items-center justify-content-center">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-10">
                  <Button className="btn-add-card py-2">Add to cart</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="row py-3 d-none d-md-block  align-items-center justify-content-center">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-10">
                  <Button className="btn-add-card py-2">Add to cart</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-device box-shadow d-none "></div>
        <div className="product-device product-device-2 box-shadow d-none"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (reducer) => ({
  detalleProducto:
    reducer.productoReducer.productoDetalleReducer.detalleProducto,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductoDetallado);
