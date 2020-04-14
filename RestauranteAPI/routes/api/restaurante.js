const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const restauranteCollection = "restaurante";
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
  const restServicio = ServicioAPI(restauranteCollection);

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
      restServicio
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
      restServicio
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
    /*validation(crearRestauranteSchema),*/
    async function (req, res, next) {
      const { body: restaurante } = req;
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
        const usuarioCollection = "usuario";
        const usuarioServicio = ServicioAPI(usuarioCollection);
        const item = usuario;
        usuarioServicio
          .create({ item })
          .then((data) => {
            if (data) {
              const restauranteData = {
                nombre,
                telefono,
                email,
                horario,
                logo: foto,
                creado,
                activo,
                eslogan,
                owner: data,
              };
              var item = restauranteData;
              restServicio
                .create({ item })
                .then((data) => {
                  res.status(201).json({
                    data: data,
                    mensaje: "OK",
                  });
                })
                .catch((err) => next(err));
            }
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
    /*validation({ restId: restauranteIdSchema }, "params"),
    validation(actRestauranteSchema),*/
    async function (req, res, next) {
      const { itemId } = req.params;
      const { body: restaurante } = req;
      delete restaurante._id;
      try {
        restServicio
          .update({ itemId })
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

  router.delete("/:itemId", setProtect(), async function (req, res, next) {
    const { itemId } = req.params;
    try {
      restServicio
        .delete({ itemId })
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
module.exports = restaurantesAPI;
