const express = require("express");
const ServicioAPI = require("../../../restaurante-db");
const configCollection = "atributos";
const validation = require("../../../utils/middlewares/validationHandlers");
const { crearAtributoSchema } = require("../../../utils/schema/config");

function AtributosConfigAPI(app) {
  const router = express.Router();
  app.use("/api/config", router);
  const configServicio = ServicioAPI(configCollection);

  router.get("/atributos", async function (req, res, next) {
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

  router.get("/atributo/:itemId", async function (req, res, next) {
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

  router.post("/atributo", validation(crearAtributoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: item } = req;

    try {
      configServicio
        .createIfNotExistsThisAtribute({ item })
        .then((data) => {
          if (!data) {
            res.status(400).json({
              mensaje: `Este atributo ya existe, ${item.nombre}`,
            });
          } else {
            res.status(201).json({
              data: data,
              mensaje: "OK",
            });
          }
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  // falta el api de editar
}

module.exports = AtributosConfigAPI;
