import React, { useState, useContext, useEffect } from "react";
import { ContextProductCreation } from "../context/product";
import TagInput from "../../../componentes/utils/TagInput";
import Select from "react-select";
import API from "../../../API";

export default () => {
  const [tipoProductos, setTipoProductos] = useState(false);
  const [selectOption, setSelectOption] = useState();
  const [oneType, setOneType] = useState([]);
  let { state, dispatch } = useContext(ContextProductCreation);
  let reset = () => dispatch({ type: "reset" });
  let setTag = (tagVal) => dispatch({ type: "tag", payload: tagVal });
  let setProductType = (productTypeVal) =>
    dispatch({ type: "tipo_producto", payload: productTypeVal });

  let handleChangeTags = (data) => {
    setTag(data.tags);
  };

  useEffect(function () {
    try {
      API.get(`/tipo/productoapi/`).then((res) => {
        const tipos = res.data.data;
        const lista = [];
        tipos.forEach((element) => {
          lista.push({
            label: element.nombre,
            value: element._id,
          });
        });
        if (tipos.length === 1) setOneType(true);
        setTipoProductos(lista);
      });
    } catch (error) {
      console.log(error);
      setTipoProductos([]);
    }
  }, []);

  useEffect(function () {
    console.log(state);
  });

  return (
    <div className="container">
      <div className="form-group">
        <label>
          Etiquetas del producto (ayuda a encontrar productos similares).
        </label>
        <TagInput
          className="form-control"
          onChange={handleChangeTags}
          value={state.tag}
          name="tag"
        ></TagInput>
      </div>
      <div className="form-group">
        <label>Tipo de producto.</label>
        {oneType ? (
          <Select
            options={tipoProductos}
            isSearchable
            placeholder="Seleccione un tipo de producto."
            onChange={(selectedOption) => {
              setProductType(selectedOption);
            }}
          />
        ) : (
          <Select
            options={tipoProductos}
            value={tipoProductos}
            isSearchable
            placeholder="Seleccione un tipo de producto"
          />
        )}
      </div>
    </div>
  );
};
