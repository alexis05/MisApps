import * as React from "react";

let ContextProductCreation = React.createContext();

let initialState = {
  nombre: "",
  descripcion_corta: "",
  detalle: "",
  tag: [],
  tipo_producto: "",
};

let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "nombre":
      return { ...state, nombre: action.payload };
    case "descripcion_corta":
      return { ...state, descripcion_corta: action.payload };
    case "detalle":
      return { ...state, detalle: action.payload };
    case "tag":
      return { ...state, tag: action.payload };
    case "tipo_producto":
      return { ...state, tipo_producto: action.payload };
  }
};

function ContextProductCreationProvider(props) {
  // [A]
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  // [B]
  return (
    <ContextProductCreation.Provider value={value}>
      {props.children}
    </ContextProductCreation.Provider>
  );
}

let ContextProductCreationConsumer = ContextProductCreation.Consumer;

// [C]
export {
  ContextProductCreation,
  ContextProductCreationProvider,
  ContextProductCreationConsumer,
};
