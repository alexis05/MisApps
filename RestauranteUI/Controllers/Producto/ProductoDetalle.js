var Request = require("request");
const URL_API = "http://127.0.0.1:5000";

module.exports = app => {
  app.get(`/Api/Producto/Detallado`, function(req, res, next) {
    if (!req.query.productoId)
      return res.send({ erro: "Requiere el producto id" });
    let productoId = req.query.productoId;

    Request.get(
      `${URL_API}/Producto/${productoId}`,
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
};
