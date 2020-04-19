const express = require("express");
const URL_API = "http://127.0.0.1:5050";
var rp = require("request-promise");
var auth = require("express-jwt");
var guard = require("express-jwt-permissions")();
const config = require("../../config");

function restauranteAPI(app) {
  const router = express.Router();
  app.use("/restauranteapi", router);

  router.get(
    "/restaurante",
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      let limit = req.query.limit;
      let skip = req.query.skip;

      var options = {
        method: "GET",
        uri: `${URL_API}/api/restaurante?limit=${limit}&skip=${skip}`,
      };

      rp(options)
        .then(function (restaurantes) {
          res.setHeader("Content-Type", "application/json");
          res.end(restaurantes);
        })
        .catch(function (err) {
          next(err);
          console.log("Ha ocurrido un error: ", err);
        });
    }
  );

  router.get(
    `/restaurante/:restauranteId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { restauranteId } = req.params;
      if (!restauranteId)
        return res.status(400).json({
          mensaje: "el id es requerido",
        });
      var options = {
        method: "GET",
        uri: `${URL_API}/api/restaurante/${restauranteId}`,
      };

      rp(options)
        .then(function (restaurante) {
          res.setHeader("Content-Type", "application/json");
          res.end(restaurante);
        })
        .catch(function (err) {
          console.log("Ha ocurrido un error: ", err);
          next(err);
        });
    }
  );

  router.get(
    `/misrestaurante/:ownerId`,
    auth(config.auth),
    guard.check(["admin"]),
    function (req, res, next) {
      const { ownerId } = req.params;
      if (!ownerId)
        return res.status(400).json({
          mensaje: "el owner es requerido",
        });
      var options = {
        method: "GET",
        uri: `${URL_API}/api/restaurante/mis/tiendas/${ownerId}`,
      };

      rp(options)
        .then(function (restaurantes) {
          res.setHeader("Content-Type", "application/json");
          res.end(restaurantes);
        })
        .catch(function (err) {
          console.log("Ha ocurrido un error: ", err);
          next(err);
        });
    }
  );

  router.post(
    `/restaurante`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { body: restaurante } = req;
      if (!restaurante)
        return res.status(400).json({
          mensaje: "json es requerido",
        });
      var options = {
        method: "POST",
        uri: `${URL_API}/api/restaurante`,
        body: {
          ...restaurante,
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
    `/restaurante/:restauranteId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { restauranteId } = req.params;
      const { body: restaurante } = req;
      if (!restauranteId)
        return res.status(400).json({
          mensaje: "el id es requerido",
        });
      if (!restaurante)
        return res.status(400).json({
          mensaje: "json es requerido",
        });
      var options = {
        method: "PUT",
        uri: `${URL_API}/api/restaurante/${restauranteId}`,
        body: {
          ...restaurante,
        },
        json: true,
      };

      rp(options)
        .then(function (parsedBody) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json(parsedBody);
        })
        .catch(function (err) {
          console.log("Ha occurido un error: ", err);
          next(err);
        });
    }
  );
}

module.exports = restauranteAPI;
