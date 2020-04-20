const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const { config } = require("../../config");
const validation = require("../../utils/middlewares/validationHandlers");
const productoCollection = "producto";

const {
  productoIdSchema,
  crearProductoSchema,
  actProductoSchema,
} = require("../../utils/schema/producto");

function productosAPI(app, keycloak) {
  const router = express.Router();
  app.use("/api/producto", router);
  const productoServicio = ServicioAPI(productoCollection);

  router.get("/", async function (req, res, next) {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const { tags } = req.query;
    try {
      productoServicio
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

  router.get("/:itemId", async function (req, res, next) {
    const { itemId } = req.params;
    try {
      productoServicio
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

  router.get("/restaurante/:restauranteId", async function (req, res, next) {
    const { restauranteId } = req.params;
    try {
      productoServicio
        .getProductosDeRestaurante({ restauranteId })
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

  router.post("/", validation(crearProductoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: item } = req;

    try {
      productoServicio
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

  router.put(
    "/:itemId",
    validation({ itemId: productoIdSchema }, "params"),
    validation(actProductoSchema),
    async function (req, res, next) {
      const { itemId } = req.params;
      const { body: item } = req;
      try {
        productoServicio
          .update({ itemId, item })
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
    }
  );

  router.delete("/:itemId", async function (req, res, next) {
    const { itemId } = req.params;
    try {
      productoServicio
        .delete({ itemId })
        .then((data) => {
          res.status(200).json({
            data: productoEliminado,
            mensaje: "OK",
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });
}

module.exports = productosAPI;
