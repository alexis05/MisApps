function LocalStorage(props) {
  var datos = {
    tienda: undefined,
    encargado: undefined
  };
  if (props) {
    if (props.tienda) {
      datos.tienda = props.tienda;
    }
    if (props.encargado) {
      console.log("encargado");
    }
  }
  localStorage.setItem("tiendaLocal", JSON.stringify(datos));
  return "";
}
export default LocalStorage;
