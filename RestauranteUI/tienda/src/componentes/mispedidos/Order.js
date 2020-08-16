import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {Row,Col,Label,Button} from "reactstrap";
import imgCalendar from "../../images/ic-calendar.png"
import imgLocation from "../../images/ic-location.png"
import imgChecked from "../../images/checked.png"
import imgCancelled from "../../images/cancel.png"
import {formateDate} from "../../constantes/index"
import { Link } from "react-router-dom";
import {OrderDetail} from "./OrderDetail";


const StatusPedidos={
  activo:"activo",
  cancelado:"cancelado",
  entregado:"entregado",
  procesando:"procesando"
}

const Views={
  PRINCIPAL:"principal",
  DETAIL:"detail"
}

const ContainerRowOrder = styled(Row)`
  border-radius:8px;
  background-color:#fff;
  box-shadow: 0 19px 38px rgba(1, 1, 1, 0.1), 0 0px 0px rgba(1, 1, 1, 1);
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
`
const LabelCustom = styled(Label)`
  font-weight:bold;
  color:black;
  margin-bottom:0px;
`

const LabelMoney = styled(Label)`
  font-weight:bold;
  color:#499d29;
  margin-bottom:0px;
`

const LabelInfo = styled(Label)`
  font-weight:bold;
  color:#ccc;
  margin-bottom:0px;
`
const LabelValue = styled(Label)`
  font-weight:bold;
  color:black;
  margin-bottom:0px;
  font-weight:bold;
  font-size:${({size})=> { return size = size ? `${size}px;` : "16px;"}}
`

const DivRoundCustom = styled.div`
  height:23px;
  width:23px;
  background-color:#0176ce;
  margin-bottom:0px;
  border-radius:50px;
  margin: 0px 5px 5px 0px;
`
const DivRoundDelivered = styled.div`
  height:23px;
  width:23px;
  background-color:#2eb300;
  margin-bottom:0px;
  border-radius:50px;
`

const DivRoundCancelled = styled.div`
 height:23px;
  width:23px;
  background-color:#f15123;
  margin-bottom:0px;
  border-radius:50px;
`


const LabelStatus = styled(Label)`
  font-weight:bold;
  color:#fff;
  vertical-align: top;
  line-height: 16px;
  margin-bottom:0px;
`
const LabelInformation = styled(Label)`
  font-family: 'Roboto', sans-serif;
  color:#ccc;
  margin-bottom:0px;
`


const ImgCustom = styled.img`
  width:20px;
  height:20px;
  margin:5px;
  margin-top:0px;
  margin-left:0px;
`

const ButtonDetails = styled(Button)`
  font-size:14px;
  border:1px solid gray;
  color:black;
  font-family: 'Roboto', sans-serif;
  background-color:white;
  width: 84px;
  border-radius: 20px;
  position: absolute;
  top: -16px;
  left: calc(100% - 84px);
  & :active,:focus{
    color:black !important;
    background-color:white !important;
  }
`

class Order extends Component {
  
  state ={
    showDetail:false,
    id:"",
  };



   render() {
   const{order} = this.props;
    
      return (
        <div>
         
          {this.props.order === undefined ? "" :
            <ContainerRowOrder className="justify-content-start mb-4 mx-0 px-0 px-lg-4 px-xl-4 py-3">
            <Col xs={12} sm={12}>
              <Row className="py-1">
                <Col xs={"auto"} sm="auto" className="text-center pr-0">
                  {order.estado == StatusPedidos.activo ? 
                    <DivRoundCustom>
                      <LabelStatus>{"..."}</LabelStatus>
                    </DivRoundCustom>
                  : ""}
                  {order.estado == StatusPedidos.entregado ? 
                    <DivRoundDelivered>
                      <img src={imgChecked} alt="Entregado"></img>
                    </DivRoundDelivered>
                  : ""}
                  {order.estado == StatusPedidos.cancelado ? 
                  <DivRoundCancelled>
                    <img src={imgCancelled} alt="Cancelado"></img>
                  </DivRoundCancelled>
                  : ""}
                </Col>
                <Col xs={"5"} sm="5" className="pr-0 pl-0 pl-xl-0">
                  <LabelInformation>Order #: </LabelInformation>
                  <LabelCustom className="mx-1"> {this.props.order.transaccion}</LabelCustom>
                </Col>
                <Col xs={"5"} sm="6" className="pr-0 pr-sm-3 pr-lg-2 text-right">
                  <LabelInformation >Total: </LabelInformation>
                  <LabelMoney className="ml-1 mr-0"> ${this.props.order.precioTotal}</LabelMoney>
                </Col>
              </Row>
              <Row className="py-1 align-items-center">
                {/* <Col sm="auto" className="text-center">
                  <div style={{width:"30px"}}></div>
                </Col> */}
                <Col sm="6" xs="6" className=" pr-0">
                  <ImgCustom src={imgCalendar} alt="calendar"></ImgCustom>
                  <LabelValue size={14}> {formateDate(order.fechaPedido,true)}</LabelValue>
                </Col>
                {/* <Col sm="auto" className="text-center d-none d-xl-block">
                  <div style={{width:"30px"}}></div>
                </Col> */}
                <Col xs="6" sm="6" className="pl-xl-0  text-right">
                  <LabelInformation>Cantidad: </LabelInformation>
                  <LabelValue className="font-weight-bold mx-1"> {this.props.order.productos.length}</LabelValue>
                </Col>
                {/* <Col sm="5" className="d-none d-xl-block">
                  <ImgCustom src={imgLocation} alt="location"></ImgCustom>
                  <LabelValue>{this.props.order.direccionEnvio}</LabelValue>
                </Col> */}
              </Row>
              <Row className="py-1 align-items-center ">
                
                <Col xs={8} sm="8" className="">
                  <ImgCustom src={imgLocation} alt="location"></ImgCustom>
                  <LabelValue size={14}>{this.props.order.direccionEnvio}</LabelValue>
                </Col>
                <Col xs={4} sm="4" className="text-right">
                  <div className="position-relative">
                    <ButtonDetails onClick={()=>this.props.onShowDetail(order._id,order.transaccion)}>Detalles</ButtonDetails> 
                  </div>
                </Col>
              
              </Row>
            </Col>
          </ContainerRowOrder>
          }
         
        </div>
      );
    
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
