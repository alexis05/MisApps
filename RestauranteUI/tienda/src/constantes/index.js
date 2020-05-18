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
