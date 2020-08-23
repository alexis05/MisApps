const express = require("express");
var rp = require("request-promise");
var auth = require("express-jwt");
var guard = require("express-jwt-permissions")();
const config = require("../../config");

function atributosAPI(app) {
  const router = express.Router();
  app.use("/atributosapi", router);

  router.get(
    `/`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/config/atributos?skip=0&limit=50`,
      };

      rp(options)
        .then(function (pedidos) {
          res.setHeader("Content-Type", "application/json");
          res.end(pedidos);
        })
        .catch(function (err) {
          console.log("Ha ocurrido un error: ", err);
        });
    }
  );

  router.get(
    `/:atributoId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { atributoId } = req.params;
      if (!atributoId) return res.send({ error: "Requiere el atributo id" });

      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/config/atributo/${atributoId}`,
      };

      rp(options)
        .then(function (producto) {
          res.setHeader("Content-Type", "application/json");
          res.end(producto);
        })
        .catch(function (err) {
          console.log("Ha ocurrido un error: ", err);
        });
    }
  );

  router.post(
    `/`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { body: atributo } = req;
      if (!atributo)
        return res.status(400).json({
          mensaje: "json es requerido",
        });
      var options = {
        method: "POST",
        uri: `${config.urlLN}/api/config/atributo`,
        body: {
          ...atributo,
        },
        json: true, // Automatically stringifies the body to JSON
      };

      rp(options)
        .then(function (parsedBody) {
          res.setHeader("Content-Type", "application/json");
          res.status(201).json(parsedBody);
        })
        .catch(function (err) {
          console.log("Ha occurido un error: ", err);
          next(err);
        });
    }
  );

  router.put(
    `/:atributoId`,
    auth(config.auth),
    guard.check(["admin"]),
    function (req, res, next) {
      const { atributoId } = req.params;
      const { body: atributo } = req;
      if (!atributo)
        return res.status(400).json({
          mensaje: "json es requerido",
        });
      var options = {
        method: "PUT",
        uri: `${config.urlLN}/api/config/atributo/${atributoId}`,
        body: {
          ...atributo,
        },
        json: true, // Automatically stringifies the body to JSON
      };

      rp(options)
        .then(function (parsedBody) {
          res.setHeader("Content-Type", "application/json");
          res.status(201).json(parsedBody);
        })
        .catch(function (err) {
          console.log("Ha occurido un error: ", err);
          next(err);
        });
    }
  );
}

module.exports = atributosAPI;
