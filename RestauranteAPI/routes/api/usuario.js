const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const { config } = require("../../config");
const validation = require("../../utils/middlewares/validationHandlers");
const usuarioCollection = "producto";

const {
  usuarioIdSchema,
  crearUsuarioSchema,
} = require("../../utils/schema/usuario");

function usuariosAPI(app, keycloak) {
  const router = express.Router();
  app.use("/api/usuario", router);
  const usuarioServicio = ServicioAPI(usuarioCollection);

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
      usuarioServicio
        .getAll({ tags, skip, limit })
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

  router.get("/:itemId", setProtect(), async function (req, res, next) {
    const { itemId } = req.params;

    try {
      usuarioServicio
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

  router.post(
    "/",
    setProtect(),
    validation(crearUsuarioSchema),
    async function (req, res, next) {
      const { body: item } = req;
      try {
        usuarioServicio
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
    }
  );

  router.put(
    "/:itemId",
    setProtect(),
    validation({ itemId: usuarioIdSchema }, "params"),
    async function (req, res, next) {
      const { itemId } = req.params;
      const { body: item } = req;

      try {
        usuarioServicio
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
}

module.exports = usuariosAPI;
