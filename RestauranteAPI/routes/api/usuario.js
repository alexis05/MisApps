const express = require("express");
const UsuarioServicio = require("../../servicios/usuario/usuario");
const { config } = require("../../config");
const validation = require("../../utils/middlewares/validationHandlers");

const {
  usuarioIdSchema,
  crearUsuarioSchema,
} = require("../../utils/schema/usuario");

function usuariosAPI(app, keycloak) {
  const router = express.Router();
  app.use("/api/usuario", router);
  const usuarioServicio = new UsuarioServicio();

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
      const usuarios = await usuarioServicio.getUsuarios({ tags, skip, limit });
      res.status(200).json({
        data: usuarios,
        mensaje: "OK",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:usuarioId", setProtect(), async function (req, res, next) {
    const { usuarioId } = req.params;

    try {
      const usuario = await usuarioServicio.getUsuario({ usuarioId });
      res.status(200).json({
        data: usuario,
        mensaje: "OK",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/",
    setProtect(),
    validation(crearUsuarioSchema),
    async function (req, res, next) {
      const { body: usuario } = req;
      try {
        const usuarioCreado = await usuarioServicio.createUsusario({ usuario });

        res.status(200).json({
          data: usuarioCreado,
          mensaje: "OK",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:usuarioId",
    setProtect(),
    validation({ usuarioId: usuarioIdSchema }, "params"),
    async function (req, res, next) {
      const { usuarioId } = req.params;
      const { body: usuario } = req;

      try {
        const usaurioActualizado = await usuarioServicio.updateUsuario({
          usuarioId,
          usuario,
        });
        res.status(200).json({
          data: usaurioActualizado,
          mensaje: "OK",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = usuariosAPI;
