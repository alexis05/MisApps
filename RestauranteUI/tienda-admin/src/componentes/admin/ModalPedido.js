import React from "react";
import ReactDOM from "react-dom";
import "./style/Modal.css";
function Modal(props) {
  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-container" tabindex="-1">
      <div className="modal-dialog modal-lg" role="document">
         <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Informacion del Pedido</h5>
          </div>
          <div className="modal-body row">
          <div className="col-md-4 col-sm-6">
              {props.datosPedido.productos.map((producto, index) => (
                <div className="row __A__Order_Item">
                  <div className="col-9 col-sm-9 col-md-10">
                    <h4>{producto.nombre}</h4>
                    <div className="fiyat">
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">$</span>
                        {producto.precio}
                      </span>{" "}
                      x <span className="badge badge-pill badge-danger">
                        {producto.cantidad}
                      </span> ={" "}
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">$</span>
                        {producto.total}
                      </span>{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          <div className="col-md-4 col-sm-5">
          <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <h4>Datos del Cliente</h4>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                Id. {props.datosPedido._id}
                <br />
              Estado.{" "}{props.datosPedido.estado}
                <br />
                {props.datosPedido.direccionEnvio}
                <br />
                Nota. {props.datosPedido.nota}
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 p20">
                <strong>E-Mail</strong>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <a href="#">Email@test.com</a>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 p20">
                <strong>Telefono</strong>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <a href="tel:+00 (456) 789-0123">(507)6678-9404</a>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-md-2">

          <div className="col-md-4 col-sm-12 accion-items">
          <div className="row">
           <h4>Accion..</h4>
           <a  type="button"  className="__A__Ajax_Button __A__StopPropagation __A__Order_Change_Statuses"><span className="text-pendiente">⬤</span>pendiente</a>
            <a  type="button" onclick={props.changePedido} className="__A__Ajax_Button __A__StopPropagation __A__Order_Change_Statuses"><span className="text-procesando">⬤</span>Procesando</a>
            <a  type="button" className="__A__Ajax_Button __A__StopPropagation __A__Order_Change_Statuses"><span className="text-completado">⬤</span>Completado</a>
            <a  type="button" className="__A__Ajax_Button __A__StopPropagation __A__Order_Change_Statuses"><span className="text-cancelado">⬤</span>Cancelado</a>
         
             <br/>
             </div>
          
                    </div>
          </div>
   
        
        
         </div>
         
        
         <div className="modal-footer">
          <button type="button" className="btn btn-primary" >Save changes</button>
          <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
        </div>
     
        </div>
      {props.children}
      </div>
    </div>,

    document.getElementById("modal")
  );
}
export default Modal;
