import React, { Component } from "react";
import { connect } from "react-redux";
import {Row,Col,Button,Label} from "reactstrap";
import styled from "styled-components"
import Order from "./Order"
import {obtenerMisPedidos} from "../../actions/MisPedidos";
import imgChecked from "../../images/checked.png"
import imgCancelled from "../../images/cancel.png"
import OrderDetail from "./OrderDetail";


const Views={
  PRINCIPAL:"principal",
  DETAIL:"detail"
};

const ContainerDivOrders = styled.div`
  background-color:#fff;
  height:calc(100vh - 62px);
`
const ButtonCustom = styled(Button)`
  font-size:14px;
  border:none !important;
  color:black;
  font-family: 'Roboto', sans-serif;
  background-color:white;
  padding:0px;
  display:flex;
  border-radius: 20px;
  box-shadow:none !important;
  &.active{
    color:white !important;
    /* font-weight:bold; */
    background-color:${({Color}) => Color} !important;
    box-shadow:none !important;
  }
  & :active,:focus,:hover{
    color:white !important;
    /* font-weight:bold; */
    background-color:${({Color}) => Color} !important;  
    box-shadow:none !important;
  }
  padding:5px 8px;
`

const LabelStatus = styled(Label)`
  font-weight:bold;
  color:#fff;
  vertical-align: top;
  line-height: 16px;
  margin-bottom:0px;
`

const DivRoundCustom = styled.div`
  height:23px;
  width:23px;
  background-color:#0176ce;
  margin-bottom:0px;
  border-radius:50px;
  margin-right:3px;
  &img{
    height: 16px;
    width: 16px;
  }
`
const DivRoundDelivered = styled.div`
  height:23px;
  width:23px;
  background-color:#2eb300;
  margin-bottom:0px;
  border-radius:50px;
  margin-right:3px;
  &img{
    height: 16px;
    width: 16px;
  }
`

const DivRoundCancelled = styled.div`
 height:23px;
  width:23px;
  background-color:#f15123;
  margin-bottom:0px;
  border-radius:50px;
  margin-right:3px;
  &img{
    height: 16px;
    width: 16px;
  }
`
const LabelInformation = styled(Label)`
  font-family: 'Roboto', sans-serif;
  color:#ccc;
  margin-bottom:0px;
`;
const LabelValue = styled(Label)`
  font-weight:bold;
  color:black;
  margin-bottom:0px;
  font-weight:bold;
  font-size:${({size})=> { return size = size ? `${size}px;` : "16px;"}}
`;

class MisPedidos extends Component {

  state ={
    activeName:"pending",
    activeView:Views.PRINCIPAL,
    id:"",
    orderNumber:""
  }

  onFilterClick = (name)=>{
    this.setState({activeName:name});
  }

  onShowDetail = (id,orderNumber)=>{
    this.setState({id,orderNumber,activeView:Views.DETAIL});
  }

  onBack = ()=>{
    this.setState({activeView:Views.PRINCIPAL});
  }

 

  componentDidMount(){
    this.props.obtenerMisPedidos();
  }

  render() {


    return (
      
        <ContainerDivOrders className="justify-content-center container py-4">
          {this.state.activeView ==Views.DETAIL ?
            <Row className="justify-content-center">
              <OrderDetail onBack={this.onBack} orderNumber={this.state.orderNumber} id={this.state.id}/>
            </Row>
          :
          <>
            <Row className="justify-content-center align-items-center py-2">
            <Col xs={"auto"} className="px-1">
              <ButtonCustom onClick={()=>this.onFilterClick("pending")} Color={"#0176ce !important;"} className={this.state.activeName.trim() === "pending" ? 'active' : ''}>
                <DivRoundCustom>
                  <LabelStatus>{"..."}</LabelStatus>
                </DivRoundCustom>
                Pendiente
              </ButtonCustom>
            </Col>
            <Col xs={"auto"} className="px-1">
              <ButtonCustom onClick={()=>this.onFilterClick("delivered")} Color={"#2eb300 !important;"} className={this.state.activeName.trim() === "delivered" ? 'active' : ''}>
                <DivRoundDelivered>
                  <img src={imgChecked} alt="Entregado"></img>
                </DivRoundDelivered>
              Entregado</ButtonCustom>
            </Col>
            <Col xs={"auto"} className="px-1">
              <ButtonCustom onClick={()=>this.onFilterClick("cancel")} Color={"#f15123 !important;"}  className={this.state.activeName.trim() === "cancel" ? 'active' : ''}>
                <DivRoundCancelled>
                    <img src={imgCancelled} alt="Cancelado"></img>
                </DivRoundCancelled>
                Cancelado
              </ButtonCustom>
            </Col>
          </Row>
        
            <Row className="justify-content-center">
            {this.props.misPedidos.lenght === 0 ?
              <Col sm={10} lg={8}>
                <Row className="justify-content-center py-5 align-items-center">
                  <Col sm={12} className="text-center" >
                    <LabelValue>Sin pedidos</LabelValue><br></br>
                    <LabelInformation>Ve por tu primer pedido.!!</LabelInformation>
                  </Col>
                </Row>
              </Col>
            :
              <>
              {this.props.misPedidos.map((order)=>
                <Col key={order._id} sm={10} lg={8}>
                  <Order order={order}  onShowDetail={this.onShowDetail}/>
                </Col>
              )}
              </>
            }
          </Row>
          </>
          }
        </ContainerDivOrders>     
      
    );
  }
}

const mapStateToProps = (state) => ({
  viewActive: state.carritoReducer.carritoReducer.viewActive,
  misPedidos:state.misPedidosReducer.misPedidosReducer.misPedidos,
});

const mapDispatchToProps = {obtenerMisPedidos}

export default connect(mapStateToProps, mapDispatchToProps)(MisPedidos);
