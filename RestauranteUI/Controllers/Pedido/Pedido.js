const express = require("express");
var rp = require("request-promise");
var auth = require("express-jwt");
var guard = require("express-jwt-permissions")();
const config = require("../../config");
const SecurityTools = require("../../util/Security");

function pedidoAPI(app) {
  const router = express.Router();
  app.use("/pedidoapi", router);

  router.get(
    `/pedido`,
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
        uri: `${config.urlLN}/api/pedido?limit=${limit}&skip=${skip}`,
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
    `/pedido/:pedidoId`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { pedidoId } = req.params;
      if (!pedidoId) return res.send({ error: "Requiere el pedido id" });

      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/pedido/${pedidoId}`,
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
    guard.check(["admin"]),
    function (req, res, next) {
      const { restauranteId } = req.params;
      if (!restauranteId)
        return res.send({ error: "Requiere el restaurante id" });

      var options = {
        method: "GET",
        uri: `${config.urlLN}/api/pedido/restaurante/${restauranteId}`,
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
    `/pedido`,
    auth(config.auth),
    guard.check(["admin"], ["user"]),
    function (req, res, next) {
      const { headers } = req;
      const token = headers["authorization"];
      securityTools = new SecurityTools(token);
      const usuarioId = securityTools.decodeToken();
      const { body: pedido } = req;
      if (!pedido)
        return res.status(400).json({
          mensaje: "json es requerido",
        });
      pedido.usuarioId = usuarioId;
      var options = {
        method: "POST",
        uri: `${config.urlLN}/api/pedido`,
        body: {
          ...pedido,
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


  router.put(`/:pedidoId`, auth(config.auth), guard.check(["admin"]), 
  function (req,res,next) {
    const { pedidoId } = req.params;
    const { body: pedido } = req;
    if (!pedido)
      return res.status(400).json({
        mensaje: "json es requerido",
      });
    var options = {
      method: "PUT",
      uri: `${config.urlLN}/api/${pedidoId}`,
      body: {
        ...pedido,
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

module.exports = pedidoAPI;
