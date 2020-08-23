const express = require("express");
const ServicioAPI = require("../../../restaurante-db");
const tipoProductoCollection = "tipoProducto";
const validation = require("../../../utils/middlewares/validationHandlers");
const { tipoProductoSchema } = require("../../../utils/schema/config");

function TipoProductoConfigAPI(app) {
  const router = express.Router();
  app.use("/api/config", router);
  const configServicio = ServicioAPI(tipoProductoCollection);

  router.get("/tipo/producto", async function (req, res, next) {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const { tags } = req.query;
    try {
      configServicio
        .getAll({
          tags,
          skip,
          limit,
        })
        .then((data) => {
          res.status(200).json({
            data: data,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  router.get("/tipo/producto/:itemId", async function (req, res, next) {
    const { itemId } = req.params;
    try {
      configServicio
        .getItem({ itemId })
        .then((data) => {
          res.status(200).json({
            data: data,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  router.post("/tipo/producto", validation(tipoProductoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: item } = req;

    try {
      configServicio
        .create({ item })
        .then((data) => {
          res.status(201).json({
            data: data,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  // falta el api de editar
}

module.exports = TipoProductoConfigAPI;
