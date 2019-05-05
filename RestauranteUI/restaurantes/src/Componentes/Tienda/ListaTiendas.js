import React from "react";

function ListaTiendas(props) {
  const tiendas = props.tiendas.resultado;

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
          <li
            key={tienda.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {tienda.nombre}
            <span className="badge badge-primary badge-pill">14</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTiendas;
