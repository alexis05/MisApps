import React from "react";
import { Link } from "react-router-dom";

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
      <small className="text-muted">{props.creado}</small>
    </div>
  </div>
);

export default Producto;
