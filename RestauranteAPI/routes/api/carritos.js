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

  router.get("/usuario/:usuarioId", async function (req, res, next) {
    const { usuarioId } = req.params;
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
    const { body: item } = req;
    const { productos, usuarioId, accion } = item;
    delete item.accion;

    try {
      let carrito;
      carritoServicio
        .getCarritoPorUsuarioId({ usuarioId })
        .then((carritoResponse) => {
          if (carritoResponse.length === 0) {
            carritoServicio
              .create({ item })
              .then((carritoCreado) => {
                carritoId = carritoCreado;
                carritoServicio
                  .getCarritoPorUsuarioId({ usuarioId })
                  .then((data) => {
                    res.status(200).json({
                      data: data,
                      mensaje: "OK",
                    });
                  })
                  .catch((err) => next(err));
              })
              .catch((err) => next(err));
          } else {
            if (accion === "agregar") {
              carrito = carritoResponse;
              let listaDeProductosABorrar = [];
              if (carrito.productos.length !== 0) {
                productos.map((productoEnLista, index) => {
                  carrito.productos.map((productoEnElCarrito, i) => {
                    if (
                      productoEnLista.productoId ===
                      productoEnElCarrito.productoId
                    ) {
                      if (
                        productoEnLista.cantidad ===
                        productoEnElCarrito.cantidad
                      ) {
                        listaDeProductosABorrar.push(
                          productos[index].productoId
                        );
                      } else {
                        carrito.productos[i].cantidad =
                          productoEnLista.cantidad;

                        listaDeProductosABorrar.push(
                          productos[index].productoId
                        );
                      }
                    }
                  });
                });

                do {
                  listaDeProductosABorrar.map((p) => {
                    productos.map((prod, index) => {
                      if (prod.productoId === p) {
                        productos.splice(index, 1);
                        return;
                      }
                    });
                  });
                } while (listaDeProductosABorrar.length === 0);

                if (productos.length > 0) carrito.productos.push(...productos);
              }
            } else if (accion === "remover") {
              let listaDeProductosABorrar = [];
              carrito = carritoResponse;
              productos.map((productoABorrar) => {
                carrito.productos.map((prod, index) => {
                  if (productoABorrar.productoId === prod.productoId) {
                    listaDeProductosABorrar.push(
                      carrito.productos[index].productoId
                    );
                  }
                });
              });

              do {
                listaDeProductosABorrar.map((p) => {
                  carrito.productos.map((prod, index) => {
                    if (prod.productoId === p) {
                      carrito.productos.splice(index, 1);
                      return;
                    }
                  });
                });
              } while (listaDeProductosABorrar.length === 0);
            } else {
              res.status(400).json({
                mensaje: "Accion no esperada",
              });
            }
            const itemId = carritoResponse._id;
            const item = carrito;
            carritoServicio
              .update({ itemId, item })
              .then((data) => {
                if (data) {
                  carritoServicio
                    .getCarritoPorUsuarioId({ usuarioId })
                    .then((data) => {
                      res.status(200).json({
                        data: data,
                        mensaje: "OK",
                      });
                    })
                    .catch((err) => next(err));
                }
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });
}

module.exports = carritoAPI;
