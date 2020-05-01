const express = require("express");
var rp = require("request-promise");
var auth = require("express-jwt");
var guard = require("express-jwt-permissions")();
const config = require("../../config");

function productoAPI(app) {
  const router = express.Router();
  app.use("/carritoapi", router);

  router.get(
    `/:carritoId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { carritoId } = req.params;
      if (!carritoId) return res.send({ error: "Requiere el carrito id" });

      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/carrito/${carritoId}`,
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

  router.get(
    `/usuario/:usuarioId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { usuarioId } = req.params;
      if (!usuarioId) return res.send({ error: "Requiere el restaurante id" });

      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/carrito/usuario/${usuarioId}`,
      };

      rp(options)
        .then(function (productos) {
          res.setHeader("Content-Type", "application/json");
          res.end(productos);
        })
        .catch(function (err) {
          console.log("Ha ocurrido un error: ", err);
        });
    }
  );

  router.post(
    `/detalle`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { body: productos } = req;
      if (!productos)
        return res.status(400).json({
          mensaje: "json es requerido",
        });
      var options = {
        method: "POST",
        uri: `${config.urlLN}/api/carrito/detalle`,
        body: {
          ...productos,
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

  router.post(
    `/`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { body: carrito } = req;
      if (!carrito)
        return res.status(400).json({
          mensaje: "json es requerido",
        });
      var options = {
        method: "POST",
        uri: `${config.urlLN}/api/carrito`,
        body: {
          ...carrito,
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

module.exports = productoAPI;
