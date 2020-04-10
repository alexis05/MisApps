const MongoLib = require("../../lib/mongo");

class RestauranteServicio {
  constructor() {
    this.collection = "restaurante";
    this.mongoDB = new MongoLib();
  }

  async getRestaurantes({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const restaurante = await this.mongoDB.getAll(this.collection, query);

    return restaurante || [];
  }

  async getRestaurante({ restauranteId }) {
    const restaurante = await this.mongoDB.get(this.collection, restauranteId);
    return restaurante || [];
  }

  async createRestaurante({ restauranteData }) {
    const restauranteCrear = await this.mongoDB.create(
      this.collection,
      restauranteData
    );
    return restauranteCrear;
  }

  async updateRestaurante({ restauranteId, restaurante }) {
    const restauranteActualizar = await this.mongoDB.update(
      this.collection,
      restauranteId,
      restaurante
    );

    return restauranteActualizar;
  }

  async deleteRestaurante({ restauranteId }) {
    const restauranteBorrar = await this.mongoDB.delete(
      this.collection,
      restauranteId
    );

    return restauranteBorrar;
  }
}

module.exports = RestauranteServicio;
