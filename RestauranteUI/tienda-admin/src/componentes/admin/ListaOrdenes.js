import React, { Component } from "react";
import API from "../../API";
import Cookies from "universal-cookie";
import { Redirect, Link } from "react-router-dom";
import Modal from "./ModalPedido";

import "./style/ThemeOrder.css";

class ListaOrdenes extends Component {
  state = {
    loading: true,
    error: null,
    data:[],
    modalIsOpen: false,
    idpedido:undefined,
    pedido: undefined,
  };

  componentDidMount() {
    this.GetPedidos();
  }


  handleChangePedido = (e) => {
    this.setState({
     pedido:{estado:"Procesando"},
    });
    console.log(this.state.pedido);
  };


  handleModalClose = (e) => {
    this.setState({
      modalIsOpen: false,
      idpedido: "",
      pedido: [],
    });
  };

  handleModalOpen = async (e) => {
    let pedidoid = e.currentTarget.id;
    console.log(pedidoid, "En la funcion");
    this.setState({ loading: true, error: null });
    try {
      await API.get(`pedidoapi/pedido/${pedidoid}`).then((res) => {
        console.log(res.data.data);
        this.setState({loading: false,modalIsOpen: true,idpedido: pedidoid,pedido: res.data.data});
        
      });
      console.log(this.state);
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };



  GetPedidos = async () => {
    this.setState({ loading: true, error: null });
    try {
      await API.get(`pedidoapi/pedido?limit=${50}&skip=${0}`).then((res) => {
        this.setState({ loading: false, data: res.data.data });
      });
     
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  UpdatePedido = async (pedido) => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      let getpedidoid = this.state.idpedido;

      await API.put(`/pedido/${getpedidoid}`,pedido).then(
        (res) => {
          this.setState({
            loading: false,
            redirectProductoList: true,
          });
        }
      );
    } catch (error) {
      this.setState({ loading: false, error: error });
      console.log("Error API");
    }
  };

  render() {
    return (
      <div className="container-fluid ">
        {this.state.data.map((producto, index) => (
          <button
            id={producto._id}
            className="order-container"
            onClick={this.handleModalOpen}
          >
            <div className="row d-flex align-items-center">
              <div className="text-center no_order">
                <span>{index}</span>
              </div>

              <div className="col col-sm-2 col-md-1 energyplus-orders--item-badge text-center">
                <span class="estado_order text-center">
                  <span class="txt-center circulo" aria-hidden="true"></span>
                  <br />
                  {(() => {
                    if (producto.estado == "activo") {
                      return "Pendiente";
                    } else {
                      return producto.estado;
                    }
                  })()}
                </span>
              </div>

              <div className=" col-7 col-sm-2 text-center">
                <p className="cliente_order_Name">{producto.nota}</p>
                <p className="cliente_order_direccion">
                  {producto.direccionEnvio}
                </p>
              </div>
              <div
                className="col col-sm-2 detalle_orden"
                data-colname="Details"
              >
                <span>{producto.fechaPedido}</span>
                <span>
                  16:05 <br />
                </span>
                Direct bank transfer
              </div>
              <div
                className="col col-sm-4 d-md-none d-lg-block __A__Order_Products __A__Col_3"
                data-colname="Products"
              >
                <div className="__A__Product_Image_Container"></div>
              </div>
              <div
                className="col __A__Col_Price __A__Col_3X text-right"
                data-colname="Price"
              >
                <span class="energyplus-orders--item-price">
                  <span class="woocommerce-Price-amount amount">
                    <span class="woocommerce-Price-currencySymbol">$</span>
                    {producto.precioTotal}
                  </span>
                </span>
                <br />
              </div>
            </div>
          </button>
        ))}
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={this.handleModalClose}
          onOpen={this.handleModalOpen}
          idpedido={this.state.idpedido}
          datosPedido = {this.state.pedido}
          
          chancgePedido ={this.handleChangePedido}
        ></Modal>
      </div>
    );
  }
}

export default ListaOrdenes;
