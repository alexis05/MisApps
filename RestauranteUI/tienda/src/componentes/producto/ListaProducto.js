import React from "react";
import { Row,Col,Button,Label } from 'reactstrap';
import ShopingCart from "../../images/shopping-cart-white.png";
import { connect } from "react-redux";
import Producto from "./Producto";

const ListaProducto = ({ productos }) => (
  <div>
    <div className="col-12 pt-2">
        <div className="row justify-content-around justify-content-lg-start  pb-5">
          {productos.map((producto, index) => (
            <div
              className="card-deck mb-4 pb-2 pt-3 px-0 mx-0 col-5 col-md-3 col-lg-2 col-xl-2"
              key={index}
            >
              <Producto
                nombre={producto.nombre}
                precio={producto.precio}
                detalle={producto.detalle}
                creado={producto.registrado}
                _id={producto._id}
              />
            </div>
          ))}
        </div>
    </div>
    
    <div className="col-sm-12 container-cart-list">
          <Row className="justify-content-center"> 
            <Col sm={12} className="text-center">
              <div className="fixed-bottom">
                <div className="cart-box">
                 <Row className="justify-content-center  mx-3 mb-2 container-cart-values align-items-center">
                   <Col xs={2} className=" text-left h-100 px-0">
                     <Label className="total-label mb-0">Total :</Label>
                   </Col>
                   <Col xs={6} className="text-left h-100">
                     <Label className="total-value mb-0">$0.00</Label>
                   </Col>
                   <Col xs={2} className="pr-0 h-100 text-right">
                      <Button className="btn form-control btn-view-cart">Cart
                        <img src={ShopingCart} alt="Cart" />
                      </Button>
                   </Col>
                 </Row>
                 </div>
              </div>
            </Col>
          </Row>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  productos: state.productoReducer.productoReducer.productos,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListaProducto);
