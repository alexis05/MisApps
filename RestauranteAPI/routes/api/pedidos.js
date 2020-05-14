const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const pedidoCollection = "pedido";

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

  router.get("/porusuario/:itemId", async function (req, res, next) {
    const { itemId } = req.params;
    try {
      // TODO: por hacer el servicio
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

  router.get("/porrestaurante/:restauranteId", async function (req, res, next) {
    const { restauranteId } = req.params;
    try {
      // TODO: por hacer el servicio
      pedidoServicio
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

  router.post("/", async function (req, res, next) {
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
}

module.exports = pedidoAPI;

// get de pedidos por usuarios

// get de pedidos por restaurante

// post para aprobar o denegar o despachar un pedido
