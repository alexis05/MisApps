import React from "react";
import { Link } from "react-router-dom";

const mostrarFecha = time => {
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
    [58060800000, "siglos", 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "ago",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
};

const Producto = props => (
  <div className="card">
    <img
      className="card-img-top"
      src="https://ak0.picdn.net/shutterstock/videos/22010890/thumb/2.jpg"
      alt="Card"
    />
    <div className="card-body">
      <h5 className="card-title">{props.nombre}</h5>
      <p className="card-text">{props.detalle}</p>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-lg-4">
            <Link to="/" className="btn btn-primary">
              Pedir <i className="icon-edit" />
            </Link>
          </div>
          <div className="col col-lg-4">
            <Link to="/" className="btn btn-link">
              Ver <i className="icon-edit" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="card-footer">
      <small className="text-muted">{mostrarFecha(props.creado)}</small>
    </div>
  </div>
);

export default Producto;
