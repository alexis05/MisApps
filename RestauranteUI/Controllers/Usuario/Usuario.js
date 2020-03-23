var Request = require("request");
const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("boom");
const URL_API = "http://127.0.0.1:5000";

module.exports = app => {
  app.post("/Api/Auth", function(req, res, next) {
    if (!req.body.usuario) return res.send({ erro: "Requiere datos" });
    if (!req.body.clave) return res.send({ error: "Requiere datos" });
    let usuario = req.body.usuario;
    let clave = req.body.clave;

    body_session = {
      usuario,
      clave
    };

    Request.post(`${URL_API}/Auth`, body_session, (error, response, body) => {
      if (error) {
        console.log("Ha ocurrido un error: ", error);
        return;
      }
      res.setHeader("Content-Type", "application/json");
      res.end(body);
    });
  });
};
