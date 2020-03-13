var Request = require("request");
const URL_API = "http://127.0.0.1";

module.exports = app => {
  app.get("/Api/Productos", function(req, res, next) {
    if (!req.query.limit) return res.send({ erro: "Requiere limite" });
    if (!req.query.skip)
      return res.send({ error: "Requiere cantidad a ignorar" });
    let limit = req.query.limit;
    let skip = req.query.skip;

    Request.get(
      `${URL_API}/Productos/${limit}/${skip}`,
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
