const express = require("express");
const RestauranteServicio = require("../../servicios/restaurante/restaurante");
const UsuarioServicio = require("../../servicios/usuario/usuario");
const { config } = require("../../config");
const validation = require("../../utils/middlewares/validationHandlers");

const {
  restauranteIdSchema,
  crearRestauranteSchema,
  actRestauranteSchema,
} = require("../../utils/schema/restaurante");

function restaurantesAPI(app, keycloak) {
  const router = express.Router();
  app.use("/api/restaurante", router);
  const restServicio = new RestauranteServicio();

  setProtect = (role) => {
    if (!config.dev) {
      return keycloak.protect(role);
    }
    return keycloak.middleware();
  };

  router.get("/", setProtect(), async function (req, res, next) {
    const { tags } = req.query;
    try {
      const restaurantes = await restServicio.getRestaurantes({ tags });
      res.status(200).json({
        data: restaurantes,
        mensaje: "OK",
      });
    } catch (err) {
      next(err);
    }
  });
  router.get("/:restauranteId", setProtect(), async function (req, res, next) {
    const { restauranteId } = req.params;
    try {
      const restaurante = await restServicio.getRestaurante({ restauranteId });
      res.status(200).json({
        data: restaurante,
        mensage: "OK",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/",
    setProtect(),
    /*validation(crearRestauranteSchema),*/
    async function (req, res, next) {
      const { body: restaurante } = req;
      usuarioServicio = new UsuarioServicio();
      const nombre = restaurante.nombre;
      const telefono = restaurante.telefono;
      const apellido = "Admin";
      const email = restaurante.email;
      const direccion = restaurante.direccion;
      const creado = new Date();
      const clave = restaurante.clave;
      const foto = "";
      const activo = true;
      const role = "";
      const horario = restaurante.horario;
      const eslogan = restaurante.eslogan;

      const usuario = {
        nombre,
        telefono,
        apellido,
        email,
        direccion,
        creado,
        clave,
        foto,
        activo,
        role,
      };

      try {
        const usuarioAdminCreado = await usuarioServicio.createUsusario({
          usuario,
        });
        if (usuarioAdminCreado) {
          const restauranteData = {
            nombre,
            telefono,
            email,
            horario,
            logo: foto,
            creado,
            activo,
            eslogan,
            owner: usuarioAdminCreado,
          };
          const restCreado = await restServicio.createRestaurante({
            restauranteData,
          });

          if (restCreado && usuarioAdminCreado) {
            res.status(201).json({
              data: restCreado,
              mensaje: "OK",
            });
          }
        }
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
    async function (req, res, next) {
      const { restId } = req.params;
      const { body: restaurante } = req;
      try {
        const restActualizado = await restServicio.updateRestaurante({
          restId,
          restaurante,
        });
        res.status(200).json({
          data: restActualizado,
          mensaje: "OK",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete("/:restId", setProtect(), async function (req, res, next) {
    const { restId } = req.params;
    try {
      const restEliminado = await restServicio.deleteRestaurante({ restId });

      res.status(200).json({
        data: restEliminado,
        mensaje: "OK",
      });
    } catch (err) {
      next(err);
    }
  });
}
module.exports = restaurantesAPI;
