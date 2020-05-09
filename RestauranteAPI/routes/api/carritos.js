const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const carritoCollection = "carrito";
const validation = require("../../utils/middlewares/validationHandlers");

const {
  crearCarritoSchema,
  detalleCarritoSchema,
} = require("../../utils/schema/carrito");

function carritoAPI(app) {
  const router = express.Router();
  app.use("/api/carrito", router);
  const carritoServicio = ServicioAPI(carritoCollection);

  router.get("/:carritoId", async function (req, res, next) {
    const { carritoId } = req.params;
    if (!carritoId)
      return res.status(400).json({ error: "Requiere el carrito id" });
    try {
      carritoServicio
        .carritoDetallado({ carritoId })
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
    if (!usuarioId)
      return res.status(400).json({ error: "Requiere el usuario id" });

    try {
      carritoServicio
        .carritoDetalladoPorUsuarioId({ usuarioId })
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

  router.post("/detalle", validation(detalleCarritoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: body } = req;
    const productoServicio = ServicioAPI("producto");
    try {
      const productos = body.productos;
      productoServicio
        .getDetalleCarrito({ productos })
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

  router.post("/agregar", validation(crearCarritoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: carrito } = req;
    try {
      delete carrito.accion;
      carritoServicio
        .createCarrito({ carrito })
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

  router.post("/", validation(crearCarritoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: carrito } = req;
    try {
      carritoServicio
        .carritoEdicion({ carrito })
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

module.exports = carritoAPI;
