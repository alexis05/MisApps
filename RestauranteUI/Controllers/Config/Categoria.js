const express = require("express");
var rp = require("request-promise");
var auth = require("express-jwt");
var guard = require("express-jwt-permissions")();
const config = require("../../config");

function categoriasAPI(app) {
  const router = express.Router();
  app.use("/categoriaapi", router);

  router.get(
    `/`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/config/categorias?skip=0&limit=50`,
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
    `/:categoriaId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { categoriaId } = req.params;
      if (!categoriaId) return res.send({ error: "Requiere el categoria id" });

      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/config/categoria/${categoriaId}`,
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
      const { body: categoria } = req;
      if (!categoria)
        return res.status(400).json({
          mensaje: "json es requerido",
        });

      var options = {
        method: "POST",
        uri: `${config.urlLN}/api/config/categoria`,
        body: {
          ...categoria,
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
    `/:categoriaId`,
    auth(config.auth),
    guard.check(["admin"]),
    function (req, res, next) {
      const { categoriaId } = req.params;
      const { body: categoria } = req;
      if (!categoria)
        return res.status(400).json({
          mensaje: "json es requerido",
        });
      var options = {
        method: "PUT",
        uri: `${config.urlLN}/api/config/categoria/${categoriaId}`,
        body: {
          ...categoria,
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

module.exports = categoriasAPI;
