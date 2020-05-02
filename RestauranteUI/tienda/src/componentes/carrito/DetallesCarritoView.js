import React,{Component} from "react";
import { connect } from "react-redux";
import { Row,Col,Button,Label } from 'reactstrap';
import {backProductListView} from "../../actions/Carrito";


class DetallesCarritoView extends Component{
    onBackProductList = () =>{
        this.props.backProductListView();
    }
     render(){
        return( <div className="col-sm-12 details-cart-view ">
                <Row className="justify-content-center"> 
                    <Col sm={12} className="text-center">
                        <Button onClick={this.onBackProductList}>Back</Button>Detalles del carrito

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
    backProductListView
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(DetallesCarritoView);