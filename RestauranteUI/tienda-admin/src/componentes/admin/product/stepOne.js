import React, { useContext } from "react";
import CKEditor from "ckeditor4-react";
import { ContextProductCreation } from "../context/product";

export default () => {
  let { state, dispatch } = useContext(ContextProductCreation);

  let reset = () => dispatch({ type: "reset" });
  let setNombre = (nombreVal) =>
    dispatch({ type: "nombre", payload: nombreVal });
  let setDescripcion_corta = (descripcion_cortaVal) =>
    dispatch({ type: "descripcion_corta", payload: descripcion_cortaVal });
  let setDetalle = (detalleVal) =>
    dispatch({ type: "detalle", payload: detalleVal });

  return (
    <div className="container">
      <div className="form-group">
        <label>Nombre</label>
        <input
          className="form-control"
          onChange={(e) => setNombre(e.target.value)}
          onBlur={(e) => setNombre(e.target.value)}
          type="text"
          name="nombre"
          value={state.nombre}
        />
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            Descripción del producto (máximo 100 caracteres).
          </span>
        </div>
        <input
          className="form-control"
          maxLength="100"
          type="text"
          name="descripcion_corta"
          onChange={(e) => setDescripcion_corta(e.target.value)}
          onBlur={(e) => setDescripcion_corta(e.target.value)}
          value={state.descripcion_corta}
        />
      </div>
      <br></br>

      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Detalles del producto</span>
        </div>
        <CKEditor
          data={state.detalle}
          name="detalle"
          onChange={(evt) => setDetalle(evt.editor.getData())}
          onBlur={(evt) => setDetalle(evt.editor.getData())}
        />
      </div>
    </div>
  );
};
