const express = require("express");
var rp = require("request-promise");
const URL_API = "http://127.0.0.1:5050";
var auth = require("express-jwt");
var guard = require("express-jwt-permissions")();
const config = require("../../config");

function productoAPI(app) {
  const router = express.Router();
  app.use("/productoapi", router);

  router.get(
    "/producto",
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      if (!req.query.limit) return res.send({ error: "Requiere limite" });
      if (!req.query.skip)
        return res.send({ error: "Requiere cantidad a ignorar" });
      let limit = req.query.limit;
      let skip = req.query.skip;

      var options = {
        method: "GET",
        uri: `${URL_API}/api/producto?limit=${limit}&skip=${skip}`,
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

  router.get(
    `/producto/:productoId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { productoId } = req.params;
      if (!productoId) return res.send({ error: "Requiere el producto id" });

      var options = {
        method: "GET",
        uri: `${URL_API}/api/producto/${productoId}`,
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
    `/producto/restaurante/:restauranteId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { restauranteId } = req.params;
      if (!restauranteId)
        return res.send({ error: "Requiere el restaurante id" });

      var options = {
        method: "GET",
        uri: `${URL_API}/api/producto/restaurante/${restauranteId}`,
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

  router.post(`/producto`, auth(config.auth), guard.check(["admin"]), function (
    req,
    res,
    next
  ) {
    const { body: producto } = req;
    if (!producto)
      return res.status(400).json({
        mensaje: "json es requerido",
      });
    var options = {
      method: "POST",
      uri: `${URL_API}/api/producto`,
      body: {
        ...producto,
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
  });
}

module.exports = productoAPI;
