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

  async create({ item }) {
    const crearItem = await this.mongoDB.create(this.collection, item);
    return crearItem;
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
