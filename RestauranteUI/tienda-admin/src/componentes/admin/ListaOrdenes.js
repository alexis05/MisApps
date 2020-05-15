import React, { Component } from "react";
import API from "../../API";
import Cookies from "universal-cookie";
import { Redirect, Link } from "react-router-dom";

import "./style/ThemeOrder.css";

const dataOrdenes = [
  {
    numero: "12",
    estado: "pendiente",
    cliente: "Jorge Hernandez",
    direccion: "Calle 55 San Francisco",
    fecha: "Hoy",
    uds: "2",
    total: "20.95",
  },
  {
    numero: "50",
    estado: "procesada",
    cliente: "Emanuel Torres",
    direccion: "Chorrera,Costa Verde",
    fecha: "Ayer",
    uds: "5",
    total: "100.95",
  },
  {
    numero: "68",
    estado: "cancelada",
    cliente: "Marina",
    direccion: "Bella Vista Calle 3ra",
    fecha: "Ayer",
    uds: "10",
    total: "69.95",
  },
];
class ListaOrdenes extends Component {
  render() {
    return (
      <div className="container-fluid ">
        {dataOrdenes.map((producto, index) => (
          <div className="order-container">
            <div className="container-list row d-flex align-items-center">
              <div className="text-center no_order">
                <span>{producto.numero}</span>
              </div>

              <div className="col col-sm-2 col-md-1 energyplus-orders--item-badge text-center">
                <span class="estado_order text-center">
                  <span class="txt-center circulo" aria-hidden="true"></span>
                  <br />
                  {producto.estado}
                </span>
              </div>

              <div className=" col-7 col-sm-2 text-center">
                <p className="cliente_order_Name">{producto.cliente}</p>
                <p className="cliente_order_direccion">{producto.direccion}</p>
              </div>
              <div className="col col-sm-2 detalle_orden" data-colname="Details">
                <span>14 May,</span>
                <span>
                  16:05 <br />
                </span>
                Direct bank transfer
              </div>
              <div className="col col-sm-4 d-md-none d-lg-block __A__Order_Products __A__Col_3"
                data-colname="Products">
                <div className="__A__Product_Image_Container">
                  
                </div>
              </div>
              <div className="col __A__Col_Price __A__Col_3X text-right" data-colname="Price">
        <span class="energyplus-orders--item-price"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>{producto.total}</span></span>
                    <br/>
               

                  </div>




            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListaOrdenes;
