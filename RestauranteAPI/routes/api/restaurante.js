const express = require("express");
const router = express.Router();
const RestauranteServicio = require("../../servicios/restaurante/restaurante");

const restServicio = new RestauranteServicio();

router.get("/", async function(req, res, next) {
  const { tags } = req.query;
  try {
    const restaurantes = await restServicio.getRestaurantes({ tags });
    res.status(200).json({
      data: restaurantes,
      mensaje: "OK"
    });
  } catch (err) {
    next(err);
  }
});
router.get("/:restId", async function(req, res, next) {
  const { restId } = req.params;
  try {
    const restaurante = await restServicio.getRestaurante({ restId });
    res.status(200).json({
      data: restaurante,
      mensage: "OK"
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:restId", async function(req, res, next) {
  const { restId } = req.params;
  const { body: restaurante } = req;
  try {
    const restActualizado = await restServicio.updateRestaurante({
      restId,
      restaurante
    });
    res.status(200).json({
      data: restActualizado,
      message: "OK"
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:restId", async function(req, res, next) {
  const { restId } = req.params;
  try {
    const restEliminado = await restServicio.deleteRestaurante({ restId });

    res.status(200).json({
      data: restEliminado,
      message: "OK"
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
