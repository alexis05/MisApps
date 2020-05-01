const express = require("express");
var rp = require("request-promise");
var auth = require("express-jwt");
var guard = require("express-jwt-permissions")();
const config = require("../../config");
const myAuth = require("../../auth");

function usuarioAPI(app) {
  const router = express.Router();
  app.use("/usuarioapi", router);

  router.get("/usuario", auth(config.auth), guard.check(["admin"]), function (
    req,
    res,
    next
  ) {
    let limit = req.query.limit;
    let skip = req.query.skip;

    var options = {
      method: "GET",
      uri: `${config.urlLN}/api/usuario?limit=${limit}&skip=${skip}`,
    };

    rp(options)
      .then(function (usuarios) {
        res.setHeader("Content-Type", "application/json");
        res.end(usuarios);
      })
      .catch(function (err) {
        next(err);
        console.log("Ha ocurrido un error: ", err);
      });
  });

  router.get(
    `/usuario/:usuarioId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { usuarioId } = req.params;
      if (!usuarioId)
        return res.status(400).json({
          mensaje: "el id es requerido",
        });
      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/usuarios/${usuarioId}`,
      };

      rp(options)
        .then(function (usuario) {
          res.setHeader("Content-Type", "application/json");
          res.end(usuario);
        })
        .catch(function (err) {
          console.log("Ha ocurrido un error: ", err);
          next(err);
        });
    }
  );

  router.get(
    `/estatus`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const cookie = req.cookies;
      if (!cookie.sidtk) return res.status(401).send("unauthorized");
      const token = cookie.sidtk;
      try {
        myAuth.verify(token, function (err, decoded) {
          var ownerId = decoded.uuid;

          var options = {
            method: "GET",
            uri: `${config.urlLN}/api/usuario/byuuid/${ownerId}`,
          };

          rp(options)
            .then(function (usuario) {
              res.setHeader("Content-Type", "application/json");
              res.end(usuario);
            })
            .catch(function (err) {
              console.log("Ha ocurrido un error: ", err);
              next(err);
            });
        });
      } catch (e) {
        return res.status(401).send("unauthorized");
      }
    }
  );
}
module.exports = usuarioAPI;
