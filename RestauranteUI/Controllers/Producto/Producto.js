const express = require("express");
var Request = require("request");
const URL_API = "http://127.0.0.1:5050";

function productoAPI(app) {
  const router = express.Router();
  app.use("/productoapi", router);

  // muestra la lista de productos y se puede agregar un limite y tambien aplicar skip
  router.get("/producto", function(req, res, next) {
    if (!req.query.limit) return res.send({ erro: "Requiere limite" });
    if (!req.query.skip)
      return res.send({ error: "Requiere cantidad a ignorar" });
    let limit = req.query.limit;
    let skip = req.query.skip;

    Request.get(
      `${URL_API}/api/producto?limit=${limit}&skip=${skip}`,
      (error, response, body) => {
        if (error) {
          console.log("Ha ocurrido un error: ", error);
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.end(body);
      }
    );
  });

  router.get(`/producto/:productoId`, function(req, res, next) {
    const { productoId } = req.params;
    if (!productoId) return res.send({ erro: "Requiere el producto id" });

    Request.get(
      `${URL_API}/api/producto/${productoId}`,
      (error, response, body) => {
        if (error) {
          console.log("Ha ocurrido un error: ", error);
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.end(body);
      }
    );
  });
}

module.exports = productoAPI;
