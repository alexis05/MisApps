export const Views = {
  PRODUCTLIST: "lista_productos",
  DETAILSCART: "detalles_carrito",
  PEDIDO_REALIZADO: "pedido_realizado",
};

export function tengoEsteProductoEnElCarrito(productoId, productos) {
  if (!productos) {
    productos = [];
  }
  const result = productos.find(
    (producto) => producto.productoId == productoId
  );
  const cantidad = 0;
  if (result) {
    return result.cantidad;
  }
  return cantidad;
}

export function formateDate(date,onlyDate){
  onlyDate = !onlyDate ? false :onlyDate;
  if(date){
    let fromat = Date.parse(date);
    let valueDate = new Date(fromat);
    let stringValue = valueDate.toLocaleString();
    if(onlyDate){
      let str = stringValue.split(" ");
      stringValue = str[0];
    }
    return stringValue;
  }
  return "";
}
