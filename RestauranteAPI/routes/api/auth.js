const express = require("express");
const ServicioAPI = require("../../restaurante-db");
const usuarioCollection = "usuario";
const Bcrypt = require("bcryptjs");

function authAPI(app) {
  const router = express.Router();
  app.use("/api/auth", router);
  const usuarioServicio = ServicioAPI(usuarioCollection);

  router.post("/", async function (req, res, next) {
    const { body: usuario } = req;
    if (!usuario)
      return res.status(400).json({
        mensaje: "Se require el json",
      });
    if (!usuario.email)
      return res.status(400).json({
        mensaje: "Se require el json",
      });
    if (!usuario.clave)
      return res.status(400).json({
        mensaje: "Se require el json",
      });
    const email = usuario.email;
    try {
      usuarioServicio
        .getByEmail({ email })
        .then((data) => {
          if (Bcrypt.compareSync(usuario.clave, data.clave)) {
            delete data.clave;
            res.status(200).json({
              data: data,
              mensaje: "OK",
            });
          } else {
            res.status(400).json({
              mensaje: "NO_LOGIN",
            });
          }
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });
}

module.exports = authAPI;
