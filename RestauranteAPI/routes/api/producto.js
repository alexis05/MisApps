const express = require("express");
const router = express.Router();
const ProductoServicio = require("../../servicios/producto/producto");

const productoServicio = new ProductoServicio();

router.get("/", async function(req, res, next) {

  let limit = req.query.limit;
  let skip = req.query.skip;
  const { tags } = req.query;
  try {
    const productos = await productoServicio.getProductos({ tags, skip, limit });
    res.status(200).json({
      data: productos,
      mensage: "OK"
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:productoId", async function(req, res, next) {
  const { productoId } = req.params;
  try {
    const productos = await productoServicio.getProducto({ productoId });
    res.status(200).json({
      data: productos,
      mensage: "OK"
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:productoId", async function(req, res, next){
  const { productoId } = req.params;
  const { body: producto } = req;
  try {
    const productoActualizado = await productoServicio.updateProducto({
      productoId,
      producto
    });
    res.status(200).json({
      data: productoActualizado,
      message: "OK"
    });
  } catch (err) {
    next(err);
  }
})

router.put("/:productoId", async function(req, res, next){
  const { productoId } = req.params;
  try {
    const productoEliminado = await productoServicio.deleteProducto({ productoId });

    res.status(200).json({
      data: productoEliminado,
      message: "OK"
    });
  } catch (err) {
    next(err);
  }
})

module.exports = router;