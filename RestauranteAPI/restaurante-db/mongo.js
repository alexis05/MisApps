const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("./config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`; // prettier-ignore

//const MONGO_URI_WITH_USER_PASS = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`; // prettier-ignore
// console.log(
//   `mongodb://${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`
// );

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
          reject(error);
        }

        console.log("Connected succesfully to mongo");
        resolve(this.client.db(this.dbName));
      });
    });
  }

  getAll(collection, query, skip, limit) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find(query)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  getByEmail(collection, email) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ email: email });
    });
  }

  getByUUID(collection, uuid) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ uuid: uuid });
    });
  }

  getMisRestaurantes(collection, usuarioId) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find({ owner: ObjectId(usuarioId) })
        .toArray();
    });
  }

  getProductosDeRestaurante(collection, restauranteId) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find({ restaurante: ObjectId(restauranteId) })
        .toArray();
    });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
