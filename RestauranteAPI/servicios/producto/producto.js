const MongoLib = require("../../lib/mongo");

class ProductoServicio {
  constructor() {
    this.collection = "producto";
    this.mongoDB = new MongoLib();
  }

  async getProductos({ tags, skip, limit }) {
    const query = tags && { tags: { $in: tags } };
    const productos = await this.mongoDB.getAll(this.collection, query, skip, limit);

    return productos || [];
  }

  async getProducto({ productoId }) {
    const producto = await this.mongoDB.get(this.collection, productoId);
    return producto || [];
  }

  async createProducto({ producto }) {
    const productoACrear = await this.mongoDB.create(this.collection, producto);
    return productoACrear;
  }

  async updateProducto({ productoId, producto }) {
    const productoActualizar = await this.mongoDB.update(
      this.collection,
      productoId,
      producto
    );

    return productoActualizar;
  }

  async deleteProducto({ productoId }) {
    const productoBorrar = await this.mongoDB.delete(
      this.collection,
      productoId
    );

    return productoBorrar;
  }
}

module.exports = ProductoServicio;
