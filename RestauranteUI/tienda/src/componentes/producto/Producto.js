import React, { Component } from "react";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import { connect } from "react-redux";
import "./producto.css";
import { addToCart } from "../../actions/Carrito";

const mostrarPrecioConDosDecimales = (precio) => {
  return (Math.round(precio * 100) / 100).toFixed(2);
};

const mostrarFecha = (time) => {
  //time = time.replace(" GMT", "");
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "segundos", 1], // 60
    [120, "hace un minuto", "Dentro de un minuto"], // 60*2
    [3600, "minutos", 60], // 60*60, 60
    [7200, "hace una hora", "Dentro de una hora"], // 60*60*2
    [86400, "horas", 3600], // 60*60*24, 60*60
    [172800, "Ayer", "Tomorrow"], // 60*60*24*2
    [604800, "dias", 86400], // 60*60*24*7, 60*60*24
    [1209600, "Hace una semana", "Siguiente semana"], // 60*60*24*7*4*2
    [2419200, "semanas", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "Hace un mes", "Siguiente mes"], // 60*60*24*7*4*2
    [29030400, "meses", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "Ultimo año", "Siguiente año"], // 60*60*24*7*4*12*2
    [2903040000, "años", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "Ultimo siglo", "Siguiente siglo"], // 60*60*24*7*4*12*100*2
    [58060800000, "siglos", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var now = new Date();
  var nowInMilliseconds = now.getTime();
  var seconds = (+nowInMilliseconds - time) / 1000,
    token = "Hace",
    list_choice = 1;
  if (seconds === 0) {
    return "Justo ahora";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "desde ahora";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++])) {
    if (seconds < format[0]) {
      if (typeof format[2] == "string") {
        return format[list_choice];
      } else {
        return token + " " + Math.floor(seconds / format[2]) + " " + format[1];
      }
    }
  }
  return time;
};

// const Producto = (props) => {
class Producto extends Component {
  onClickAddTocart = (e) => {
    e.preventDefault();
    let newProduct = {
      cantidad: 1,
      restauranteId: this.props.restaurante,
      productoId: this.props._id,
    };
    let body = this.props.carrito;
    body.accion = "agregar";
    body.productos = [];
    body.productos = [];
    body.productos.push(newProduct);
    this.props.addToCart(body);
  };

  substringDescripcionCorta = (value) => {
    return value.substring(0, 100) + "...";
  };
  render() {
    return (
      <div className="card-product mb-2 mx-xs-0 mx-md-2 mx-lg-3 pt-2">
        <img
          className="card-img-top img-fluid"
          src="https://ak0.picdn.net/shutterstock/videos/22010890/thumb/2.jpg"
          alt="Card"
        />
        <div className="card-body px-3">
          <div className="row pt-4 justify-content-start">
            <div className="col-12 text-left">
              <h5 className="card-title text-left">{this.props.nombre}</h5>
            </div>
            <div className="col-12">
              <p className="card-text mb-0">
                {this.props.descripcion_corta
                  ? this.substringDescripcionCorta(this.props.descripcion_corta)
                  : ""}
              </p>
            </div>
          </div>
          <div className="rowm d-none">
            <div className="col-12">
              <div className="precio-producto">
                ${mostrarPrecioConDosDecimales(this.props.precio)}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer w-100  text-center pt-0 pr-1 pl-1 pb-0">
          <div className="col-12">
            <div className="row justify-content-end align-items-center">
              <div className="col-10 text-left">
                <span className="precio-producto">
                  ${mostrarPrecioConDosDecimales(this.props.precio)}
                </span>
              </div>
              <div className="col-2 px-0">
                <button
                  className="btn btn-add-product"
                  onClick={this.onClickAddTocart}
                >
                  {" "}
                  +
                </button>
              </div>
            </div>

            <div className="row d-none">
              <div className="col">
                <small className="text-muted justify-content-center">
                  Publicado: {mostrarFecha(this.props.creado)}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  carrito: state.carritoReducer.carritoReducer.carrito,
});

const mapDispatchToProps = {
  addToCart,
};
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Producto);
