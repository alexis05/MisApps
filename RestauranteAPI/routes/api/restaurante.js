const express = require("express");
const RestauranteServicio = require("../../servicios/restaurante/restaurante");
const { config } = require("../../config");
const validation = require("../../utils/middlewares/validationHandlers");

const {
  restauranteIdSchema,
  crearRestauranteSchema,
  actRestauranteSchema
} = require("../../utils/schema/restaurante");

function restaurantesAPI(app, keycloak) {
  const router = express.Router();
  app.use("/api/restaurante", router);
  const restServicio = new RestauranteServicio();

  setProtect = role => {
    if (!config.dev) {
      return keycloak.protect(role);
    }
    return keycloak.middleware();
  };

  router.get("/", setProtect(), async function(req, res, next) {
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
  router.get("/:restId", setProtect(), async function(req, res, next) {
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

  router.post(
    "/",
    setProtect(),
    validation(crearRestauranteSchema),
    async function(req, res, next) {
      const { body: restaurante } = req;

      try {
        const restCreado = await restServicio.createRestaurante({
          restaurante
        });

        res.status(201).json({
          data: restCreado,
          message: "OK"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:restId",
    setProtect(),
    validation({ restId: restauranteIdSchema }, "params"),
    validation(actRestauranteSchema),
    async function(req, res, next) {
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
    }
  );

  router.delete("/:restId", setProtect(), async function(req, res, next) {
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
}
module.exports = restaurantesAPI;
