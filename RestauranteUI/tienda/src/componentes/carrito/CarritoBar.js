import React,{Component} from "react";
import { connect } from "react-redux";
import { Row,Col,Button,Label } from 'reactstrap';
import ShopingCart from "../../images/shopping-cart-white.png";
import {viewCart,backProductListView} from "../../actions/Carrito";

class CarritoBar extends Component{
    onClickViewCart = () =>{
        this.props.viewCart();
    }
    
     render(){
        return( <div className="col-sm-12 container-cart-list">
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
                            <Button className="btn form-control btn-view-cart" onClick={this.onClickViewCart}>Cart
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
    viewCart
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CarritoBar);
