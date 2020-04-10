const express = require("express");
const URL_API = "http://127.0.0.1:5050";
var rp = require("request-promise");

function restauranteAPI(app) {
  const router = express.Router();
  app.use("/restauranteapi", router);

  router.get("/restaurante", function (req, res, next) {
    if (!req.query.limit) return res.send({ erro: "Requiere limite" });
    if (!req.query.skip)
      return res.send({ error: "Requiere cantidad a ignorar" });
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
        console.log("Ha ocurrido un error: ", err);
      });
  });

  router.get(`/restaurante/:restauranteId`, function (req, res, next) {
    const { restauranteId } = req.params;
    if (!restauranteId) return res.send({ erro: "Requiere el restaurante id" });
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
      });
  });

  router.post(`/restaurante`, function (req, res, next) {
    const { body: restaurante } = req;

    var options = {
      method: "POST",
      uri: "http://api.posttestserver.com/post",
      body: {
        some: "payload",
      },
      json: true, // Automatically stringifies the body to JSON
    };

    rp(options)
      .then(function (parsedBody) {
        // POST succeeded...
      })
      .catch(function (err) {
        // POST failed...
      });
  });
}

module.exports = restauranteAPI;
