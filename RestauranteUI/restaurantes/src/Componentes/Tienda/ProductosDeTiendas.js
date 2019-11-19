import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../imagenes/img.svg";

function ProductosDeTiendas(props) {
  const [count, setCount] = useState(0);
  const tiendas = props.tiendas.resultado;

  useEffect(() => {
    // Update the document title using the browser API
    //console.log(`You clicked ${count} times`);
    //document.title =
  });
  console.log(tiendas);

  return (
    <div className="col-12 pt-2">
      <div className="container">
        <div className="row">
          {props.tiendas.resultado.map(producto => (
            <div className="card-deck pb-2 col-sm-4" key={producto.id}>
              <div className="card">
                <img className="card-img-top" src={img} alt="Card" />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.detalle}</p>
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
                  <small className="text-muted">{producto.creado}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    /*  <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h3 className="section-subheading text-muted">
            Lista de Tiendas ({tiendas.length}).
          </h3>
        </div>
      </div>
      <ul className="list-group">
        {tiendas.map(tienda => (
          <Link
            to={"/tienda/" + tienda.id}
            params={{ nombreTienda: tienda.nombre }}
            key={tienda.id}
          >
            <li
              key={tienda.id}
              onClick={() => setCount(count + 1)}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {tienda.nombre}
              <span className="badge badge-primary badge-pill">
                {tienda.cantidadDeProductos}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div> */
  );
}

export default ProductosDeTiendas;
