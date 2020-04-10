const express = require("express");
const ProductoServicio = require("../../servicios/producto/producto");
const { config } = require("../../config");
const validation = require("../../utils/middlewares/validationHandlers");

const {
  productoIdSchema,
  crearProductoSchema,
  actProductoSchema,
} = require("../../utils/schema/producto");

function productosAPI(app, keycloak) {
  const router = express.Router();
  app.use("/api/producto", router);
  const productoServicio = new ProductoServicio();

  setProtect = (role) => {
    if (!config.dev) {
      return keycloak.protect(role);
    }
    return keycloak.middleware();
  };

  router.get("/", setProtect(), async function (req, res, next) {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const { tags } = req.query;
    try {
      const productos = await productoServicio.getProductos({
        tags,
        skip,
        limit,
      });
      res.status(200).json({
        data: productos,
        mensaje: "OK",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:productoId", setProtect(), async function (req, res, next) {
    const { productoId } = req.params;
    try {
      const productos = await productoServicio.getProducto({ productoId });
      res.status(200).json({
        data: productos,
        mensaje: "OK",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/",
    setProtect(),
    validation(crearProductoSchema),
    async function (req, res, next) {
      const { body: producto } = req;

      try {
        const productoCreado = await productoServicio.createProducto({
          producto,
        });

        res.status(201).json({
          data: productoCreado,
          mensaje: "OK",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:productoId",
    setProtect(),
    validation({ productoId: productoIdSchema }, "params"),
    validation(actProductoSchema),
    async function (req, res, next) {
      const { productoId } = req.params;
      const { body: producto } = req;
      try {
        const productoActualizado = await productoServicio.updateProducto({
          productoId,
          producto,
        });
        res.status(200).json({
          data: productoActualizado,
          mensaje: "OK",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete("/:productoId", setProtect(), async function (req, res, next) {
    const { productoId } = req.params;
    try {
      const productoEliminado = await productoServicio.deleteProducto({
        productoId,
      });

      res.status(200).json({
        data: productoEliminado,
        mensaje: "OK",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = productosAPI;
