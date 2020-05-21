const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const { config } = require("../../config");
const validation = require("../../utils/middlewares/validationHandlers");
const usuarioCollection = "usuario";
const Bcrypt = require("bcryptjs");
var uuid = require("uuid");

const {
  usuarioIdSchema,
  crearUsuarioSchema,
} = require("../../utils/schema/usuario");

function usuariosAPI(app) {
  const router = express.Router();
  app.use("/api/usuario", router);
  
  const usuarioServicio = ServicioAPI(usuarioCollection);

  router.get("/", async function (req, res, next) {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const { tags } = req.query;

    try {
      usuarioServicio
        .getAll({ tags, skip, limit })
        .then((data) => {
          data.map((i) => {
            delete i.clave;
          });
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

  router.get("/:itemId", async function (req, res, next) {
    const { itemId } = req.params;

    try {
      usuarioServicio
        .getItem({ itemId })
        .then((data) => {
          delete data.clave;
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

  router.get("/byuuid/:uuid", async function (req, res, next) {
    const { uuid } = req.params;
    try {
      usuarioServicio
        .getByUUID({ uuid })
        .then((data) => {
          delete data.clave;
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
    /*validation(crearUsuarioSchema),*/
    async function (req, res, next) {
      const { body: usuario } = req;
      if (!usuario)
        return res.status(400).json({
          mensaje: "Se require el json",
        });

      const item = {
        uuid: uuid.v4(),
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        apellido: usuario.apellido,
        email: usuario.email,
        direccion: usuario.direccion,
        creado: new Date(),
        clave: Bcrypt.hashSync(usuario.clave, 10),
        foto: usuario.foto,
        activo: true,
        role: usuario.role,
      };
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
