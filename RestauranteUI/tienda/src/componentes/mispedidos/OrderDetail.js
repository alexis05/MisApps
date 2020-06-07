import React, { useState, useEffect  } from "react";
import { connect } from "react-redux";
import {Row,Col,Label,Button} from "reactstrap";
import { obtenerPedido } from "../../actions/Pedido";
import ImgBack from "../../images/img-back.png";
import styled from "styled-components";

const ButtonBack = styled(Button)`
    border-radius: 8px;
    background-color: transparent !important;
    border: 0px solid #ccc;
    color: black;
    border:none !important;
  :focus,:active{
    background-color: transparent !important;
    border: 0px solid #ccc;
    color: black;
    border:none !important;
  }
`;

const mapStateToProps = (reducer) => ({
  pedido: reducer.carritoReducer.pedidoReducer,
});

const mapDispatchToProps = {
  obtenerPedido,
};
 function OrderDetail ({obtenerPedido,id,pedido,onBack,orderNumber}) {
  const [searched, setData] = useState(false);
 
  useEffect(() => {
      setData(false);
      obtenerPedido(id);
      setData(true);
      
  }, {});
      return (
       
        <div className="col-12">
          {pedido.pedido !== "" && searched ?
          
          <>
          <Row className="py-2 justify-content-center">
            <Col className="text-center">
              <ButtonBack className="btn-back px-2 float-left " onClick={()=> onBack()}>
                  <img src={ImgBack} alt="back"></img>
              </ButtonBack>
              <h3>Pedido #{pedido.pedido.transaccion}</h3>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <div className="card">
                <div className="card-header">
                  <Row>
                    <div className="col-3">
                      <Row>
                        <Col>REALIZADO:</Col>
                      </Row>
                      <Row>
                        <Col>{pedido.pedido.fechaPedido}</Col>
                      </Row>
                    </div>
                    <div className="col-2">
                      <Row>
                        <Col>TOTAL:</Col>
                      </Row>
                      <Row>
                        <Col>{pedido.pedido.precioTotal}</Col>
                      </Row>
                    </div>
                    <div className="col-5">
                      <Row>
                        <Col>DIRECCIÓN DE ENTREGA:</Col>
                      </Row>
                      <Row>
                        <Col>{pedido.pedido.direccionEnvio}</Col>
                      </Row>
                    </div>
                    <div className="col-2">
                      <Row>
                        <Col>ESTADO:</Col>
                      </Row>
                      <Row>
                        <Col>{pedido.pedido.estado}</Col>
                      </Row>
                    </div>
                  </Row>
                </div>
                {pedido.pedido.productos.map((producto, index) => (
                  <div className="card-body" key={index}>
                    <div className="row">
                      <div className="col-2">
                        <h5 className="card-title">{producto.nombre}</h5>
                      </div>
                      <div className="col-2">
                        <div>Cantidad: </div>
                        <h5 className="card-title">{producto.cantidad}</h5>
                      </div>
                      <div className="col-3">
                        <div>Costo unitario: </div>
                        <h5 className="card-title">{producto.precio}</h5>
                      </div>
                      <div className="col-3">
                        <div>Costo total: </div>
                        <h5 className="card-title">{producto.total}</h5>
                      </div>
                      <div className="col-2">
                        <div>Estado: </div>
                        <h5 className="card-title">{producto.estado}</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="card-text">{producto.detalle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center justify-content-center pb-3">
              Referencia: {pedido.pedido._id}
            </Col>
          </Row> 
          </>
          :
            <Row>
              <div className="col-12">
                <Row className="align-items-center">
                  <Col className="text-center justify-content-center">
                    <ButtonBack className="btn-back px-2 float-left " onClick={()=> onBack()}>
                        <img src={ImgBack} alt="back"></img>
                    </ButtonBack>
                    <h3>Pedido #{orderNumber}</h3>
                  </Col>
                </Row>
              </div>
            </Row>
          }
        </div>
      );
     
    }
    // return <div></div>;
//   }
// }

 export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
