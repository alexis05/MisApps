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

  router.get("/:itemId", async function (req, res, next) {
    const { itemId } = req.params;
    try {
      carritoServicio
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

  router.get("/usuario/:usuarioId", async function (req, res, next) {
    const { usuarioId } = req.params;
    try {
      carritoServicio
        .getCarritoPorUsuarioId({ usuarioId })
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

  router.post("/", validation(crearCarritoSchema), async function (
    req,
    res,
    next
  ) {
    const { body: item } = req;
    const { productos, usuarioId, accion } = item;
    delete item.accion;
    console.log("id");
    try {
      let carrito;
      carritoServicio
        .getCarritoPorUsuarioId({ usuarioId })
        .then((carritoResponse) => {
          console.log("response carrito ",carritoResponse);
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
              console.log("va a agregar");
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
                console.log("va a agregar 2");
                if(listaDeProductosABorrar.length > 0){
                  do {
                    console.log("va a borrar",listaDeProductosABorrar);
                      listaDeProductosABorrar.map((p) => {
                        productos.map((prod, index) => {
                          if (prod.productoId === p) {
                            productos.splice(index, 1);
                            return;
                          }
                        });
                      });
                    } while (listaDeProductosABorrar.length === 0);
                }
                console.log("va a 3");
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
            console.log("va al update");
            const itemId = carritoResponse._id;
            const item = carrito;
            carritoServicio
              .update({ itemId, item })
              .then((data) => {
                if (data) {
                  carritoServicio
                    .getCarritoPorUsuarioId({ usuarioId })
                    .then((data) => {
                      delete data.usuarioId;
                      var carrito = data;
                      res.status(200).json({
                        carrito,
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
