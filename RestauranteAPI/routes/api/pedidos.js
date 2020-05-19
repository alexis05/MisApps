const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const pedidoCollection = "pedido";
const validation = require("../../utils/middlewares/validationHandlers");
const {
  crearPedidoSchema,
  estadoPedidoSchema,
} = require("../../utils/schema/pedido");

function pedidoAPI(app) {
  const router = express.Router();
  app.use("/api/pedido", router);
  const pedidoServicio = ServicioAPI(pedidoCollection);

  router.get("/:itemId", async function (req, res, next) {
    const { itemId } = req.params;
    try {
      pedidoServicio
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

  router.get("/porusuario/:usuarioId", async function (req, res, next) {
    const { usuarioId } = req.params;
    let limit = req.query.limit;
    let skip = req.query.skip;
    try {
      pedidoServicio
        .getPedidosPorUsuarioId({ usuarioId, skip, limit })
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

  router.get("/porrestaurante/:restauranteId", async function (req, res, next) {
    const { restauranteId } = req.params;
    try {
      pedidoServicio
        .getPedidosPorRetauranteId({ restauranteId })
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

  router.post("/", validation(crearPedidoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: pedido } = req;

    try {
      pedidoServicio
        .createPedido({ pedido })
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

  router.put("/", validation(estadoPedidoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: pedido } = req;
    try {
      pedidoServicio
        .cambiarEstadoPedido({ pedido })
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
}

module.exports = pedidoAPI;
