const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("./config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

// local
//const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`; // prettier-ignore

// Sanbox
const MONGO_URI =  "mongodb+srv://F1f52020:Fu7b0l2020@cluster0-rhoaz.gcp.mongodb.net/test?retryWrites=true&w=majority"; // prettier-ignore

//const MONGO_URI_WITH_USER_PASS = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`; // prettier-ignore
// console.log(
//   `mongodb://${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`
// );

class MongoLib {
  constructor() {
    if (!!MongoLib.intancia) {
      return MongoLib.intancia;
    }
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
    MongoLib.intancia = this;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
          console.log("No se pudo conectar a la bd atravez de la instancia ..");
          reject(error);
        }

        console.log("Conectado a la instancia de mongo correctamente..");
        resolve(this.client.db(this.dbName));
      });
    });
  }

  countPedidos() {
    return this.connect().then((db) => {
      return db.collection("pedido").count();
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
        .find({ restaurante: restauranteId })
        .toArray();
    });
  }

  getCarritoPorUsuarioId(collection, usuarioId) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ usuarioId });
    });
  }

  getDetalleCarrito(collection, productos) {
    let lista = [];
    productos.forEach((producto) => {
      lista.push(ObjectId(producto));
    });
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find({ _id: { $in: [...lista] } })
        .toArray();
    });
  }

  carritoDetalladoPorUsuarioId(usuarioId) {
    return this.connect().then((db) => {
      return db
        .collection("carrito")
        .aggregate([
          { $match: { usuarioId: usuarioId } },
          {
            $addFields: {
              convertedId: {
                $map: {
                  input: "$productos",
                  as: "r",
                  in: { $toObjectId: "$$r.productoId" },
                },
              },
            },
          },
          {
            $lookup: {
              from: "producto",
              localField: "convertedId",
              foreignField: "_id",
              as: "productosDetallado",
            },
          },
          {
            $addFields: {
              detalleCarrito: {
                $map: {
                  input: "$productos",
                  as: "r",
                  in: {
                    $map: {
                      input: "$productosDetallado",
                      as: "z",
                      in: {
                        $cond: [
                          {
                            $eq: ["$$z._id", { $toObjectId: "$$r.productoId" }],
                          },
                          {
                            valor: {
                              $toString: {
                                $toDecimal: {
                                  $multiply: [
                                    { $toDecimal: "$$z.precio" },
                                    "$$r.cantidad",
                                  ],
                                },
                              },
                            },
                          },
                          { valor: "0.00" },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
          {
            $addFields: {
              cantidadProductos: {
                $map: {
                  input: "$productos",
                  as: "r",
                  in: { $toInt: "$$r.cantidad" },
                },
              },
            },
          },
          {
            $addFields: {
              totalDeProductos: { $sum: "$cantidadProductos" },
            },
          },
          {
            $addFields: {
              precioTotal: {
                $sum: {
                  $map: {
                    input: "$detalleCarrito",
                    as: "r",
                    in: {
                      $map: {
                        input: "$$r",
                        as: "d",
                        in: { $toDecimal: { $sum: "$$d.valor" } },
                      },
                    },
                  },
                },
              },
            },
          },
        ])
        .toArray();
    });
  }

  carritoDetallado(carritoId) {
    return this.connect().then((db) => {
      return db
        .collection("carrito")
        .aggregate([
          { $match: { _id: ObjectId(carritoId) } },
          {
            $addFields: {
              convertedId: {
                $map: {
                  input: "$productos",
                  as: "r",
                  in: { $toObjectId: "$$r.productoId" },
                },
              },
            },
          },
          {
            $lookup: {
              from: "producto",
              localField: "convertedId",
              foreignField: "_id",
              as: "productosDetallado",
            },
          },
        ])
        .toArray();
    });
  }

  getPedidosPorUsuarioId(usuarioId, skip, limit) {
    return this.connect().then((db) => {
      return db
        .collection("pedido")
        .find({ usuarioId: usuarioId })
        .sort({ fechaPedido: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .toArray();
    });
  }

  getPedidosPorRestauranteId(restauranteId, skip, limit) {
    return this.connect().then((db) => {
      return db
        .collection("pedido")
        .find({ "productos.restaurante": restauranteId })
        .sort({ fechaPedido: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
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

  createPedido(pedido) {
    return this.connect()
      .then((db) => {
        return db.collection("pedido").insertOne(pedido);
      })
      .then((result) => result.insertedId);
  }

  createCarrito(carrito) {
    return this.connect()
      .then((db) => {
        return db.collection("carrito").insertOne(carrito);
      })
      .then((result) => result.insertedId);
  }

  updateEstadoPedido(pedido) {
    return this.connect()
      .then((db) => {
        return db.collection("pedido").updateOne(
          {
            _id: ObjectId(pedido.pedidoId),
            "productos._id": ObjectId(pedido.productoId),
            "productos.restaurante": pedido.restauranteId,
          },
          { $set: { "productos.0.estado": pedido.estado } },
          { upsert: false }
        );
      })
      .then((result) => result.upsertedId || pedido.pedidoId);
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
