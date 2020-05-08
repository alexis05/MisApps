const MongoLib = require("./mongo");
class ServicioAPI {
  constructor(collectionName) {
    this.collection = collectionName;
    this.mongoDB = new MongoLib();
  }

  async getAll({ tags, skip, limit }) {
    const query = tags && { tags: { $in: tags } };
    const all = await this.mongoDB.getAll(this.collection, query, skip, limit);
    return all || [];
  }

  async getItem({ itemId }) {
    const item = await this.mongoDB.get(this.collection, itemId);
    return item || [];
  }

  async getByEmail({ email }) {
    const item = await this.mongoDB.getByEmail(this.collection, email);
    return item || [];
  }

  async getByUUID({ uuid }) {
    const item = await this.mongoDB.getByUUID(this.collection, uuid);
    return item || [];
  }

  async getMisRestaurantes({ usuarioId }) {
    const all = await this.mongoDB.getMisRestaurantes(
      this.collection,
      usuarioId
    );
    return all || [];
  }

  async getProductosDeRestaurante({ restauranteId }) {
    const all = await this.mongoDB.getProductosDeRestaurante(
      this.collection,
      restauranteId
    );
    return all || [];
  }

  async getCarritoPorUsuarioId({ usuarioId }) {
    const all = await this.mongoDB.getCarritoPorUsuarioId(
      this.collection,
      usuarioId
    );
    return all || [];
  }

  async getDetalleCarrito({ productos }) {
    const all = await this.mongoDB.getDetalleCarrito(
      this.collection,
      productos
    );
    return all || [];
  }

  async carritoDetallado({ carritoId }) {
    const all = await this.mongoDB.carritoDetallado(carritoId);
    return all || [];
  }

  async carritoDetalladoPorUsuarioId({ usuarioId }) {
    const all = await this.mongoDB.carritoDetalladoPorUsuarioId(usuarioId);
    if (!all[0]) return [];
    delete all[0].convertedId;
    delete all[0].cantidadProductos;
    let costoTotal = 0;
    all[0].detalleCarrito.map((p) => {
      p.map((x) => {
        costoTotal = costoTotal + parseFloat(x.valor);
      });
    });
    all[0].productos.map((prod) => {
      all[0].productosDetallado.map((prodDetalle, index) => {
        if (prod.productoId === prodDetalle._id.toString()) {
          all[0].productosDetallado[index].cantidad = prod.cantidad;
          all[0].productosDetallado[index].total = (
            Number(prod.cantidad) * Number(prodDetalle.precio)
          ).toFixed(2);
        }
      });
    });
    all[0].precioTotal = costoTotal.toFixed(2);
    delete all[0].detalleCarrito;
    return all[0] || [];
  }

  async create({ item }) {
    const crearItem = await this.mongoDB.create(this.collection, item);
    return crearItem;
  }

  async createCarrito({ carrito }) {
    const usuarioCarrito = await this.mongoDB.getCarritoPorUsuarioId(
      "carrito",
      carrito.usuarioId
    );
    if (!usuarioCarrito) {
      await this.mongoDB.createCarrito(carrito);
    } else {
      const productosEnElCarrito = await this.mongoDB.getCarritoPorUsuarioId(
        "carrito",
        carrito.usuarioId
      );
      let productosIdsLista = [];
      let productosQueDebeEstar = [];

      if (productosEnElCarrito) {
        carrito.productos.map((producto, index) => {
          productosEnElCarrito.productos.map((productoEnCarrito) => {
            if (producto.productoId === productoEnCarrito.productoId) {
              carrito.productos[index].cantidad =
                productoEnCarrito.cantidad + producto.cantidad;
            } else {
              if (!productosIdsLista.includes(productoEnCarrito.productoId)) {
                productosIdsLista.push(productoEnCarrito.productoId);
                productosQueDebeEstar.push(productoEnCarrito);
              }
            }
          });
        });

        productosQueDebeEstar.map((prod) => {
          carrito.productos.push(prod);
        });

        const itemId = productosEnElCarrito._id;
        const item = carrito;
        await this.mongoDB.update("carrito", itemId, item);
      }
    }
    const all = await this.mongoDB.carritoDetalladoPorUsuarioId(
      carrito.usuarioId
    );
    console.log(all[0].detalleCarrito);
    delete all[0].convertedId;
    delete all[0].cantidadProductos;
    let costoTotal = 0;
    // all[0].detalleCarrito.map((p) => {
    //   p.map((x) => {
    //     costoTotal = costoTotal + parseFloat(x.valor);
    //   });
    // });
    // all[0].productos.map((prod) => {
    //   all[0].productosDetallado.map((prodDetalle, index) => {
    //     if (prod.productoId === prodDetalle._id) {
    //       all[0].productosDetallado[index].cantidad = prod.cantidad;
    //     }
    //   });
    // });
    all[0].precioTotal = costoTotal.toFixed(2);
    delete all[0].detalleCarrito;
    return all[0] || [];
  }

  async carritoEdicion({ carrito }) {
    const usuarioCarrito = await this.mongoDB.getCarritoPorUsuarioId(
      "carrito",
      carrito.usuarioId
    );
    if (!usuarioCarrito) {
      await this.mongoDB.createCarrito(carrito);
    } else {
      const productosEnElCarrito = await this.mongoDB.getCarritoPorUsuarioId(
        "carrito",
        carrito.usuarioId
      );
      let productosIdsLista = [];
      let productosQueDebeEstar = [];

      if (productosEnElCarrito) {
        carrito.productos.map((producto, index) => {
          productosEnElCarrito.productos.map((productoEnCarrito) => {
            if (producto.productoId === productoEnCarrito.productoId) {
              carrito.productos[index].cantidad = productoEnCarrito.cantidad =
                producto.cantidad;
            } else {
              if (!productosIdsLista.includes(productoEnCarrito.productoId)) {
                productosIdsLista.push(productoEnCarrito.productoId);
                productosQueDebeEstar.push(productoEnCarrito);
              }
            }
          });
        });

        productosQueDebeEstar.map((prod) => {
          carrito.productos.push(prod);
        });

        const itemId = productosEnElCarrito._id;
        const item = carrito;
        await this.mongoDB.update("carrito", itemId, item);
      }
    }
    const all = await this.mongoDB.carritoDetalladoPorUsuarioId(
      carrito.usuarioId
    );
    console.log(all[0].detalleCarrito);
    delete all[0].convertedId;
    delete all[0].cantidadProductos;
    let costoTotal = 0;
    // all[0].detalleCarrito.map((p) => {
    //   p.map((x) => {
    //     costoTotal = costoTotal + parseFloat(x.valor);
    //   });
    // });
    // all[0].productos.map((prod) => {
    //   all[0].productosDetallado.map((prodDetalle, index) => {
    //     if (prod.productoId === prodDetalle._id) {
    //       all[0].productosDetallado[index].cantidad = prod.cantidad;
    //     }
    //   });
    // });
    all[0].precioTotal = costoTotal.toFixed(2);
    delete all[0].detalleCarrito;
    return all[0] || [];
  }

  async update({ itemId, item }) {
    const actualizarItem = await this.mongoDB.update(
      this.collection,
      itemId,
      item
    );
    return actualizarItem;
  }

  async delete({ itemId }) {
    const borrarItem = await this.mongoDB.delete(this.collection, itemId);
    return borrarItem;
  }
}

module.exports = function (collection) {
  return (serviceAPI = new ServicioAPI(collection));
};
