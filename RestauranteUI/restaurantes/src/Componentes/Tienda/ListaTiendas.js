import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListaTiendas(props) {
  const [count, setCount] = useState(0);
  const tiendas = props.tiendas.resultado;

  useEffect(() => {
    // Update the document title using the browser API

    console.log(`You clicked ${count} times`);
    //document.title =
  });

  return (
    <div className="container">
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
    </div>
  );
}

export default ListaTiendas;
