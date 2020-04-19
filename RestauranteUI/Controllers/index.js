const express = require("express");
const URL_API = "http://127.0.0.1:5050";
var rp = require("request-promise");
const auth = require("../auth");

function PublicController(app) {
  const router = express.Router();
  app.use("/public", router);

  router.post(`/auth`, function (req, res, next) {
    const { body: user } = req;
    if (!user)
      return res.status(400).json({
        mensaje: "json es requerido",
      });
    var options = {
      method: "POST",
      uri: `${URL_API}/api/auth`,
      body: {
        ...user,
      },
      json: true, // Automatically stringifies the body to JSON
    };

    rp(options)
      .then(function (parsedBody) {
        var permissions = parsedBody.data.role;

        const json = {
          uuid: parsedBody.data.uuid,
          permissions,
        };
        auth.sign(
          { ...json, exp: Math.floor(Date.now() / 1000) + 60 * 720 },
          function (err, token) {
            res.status(200).json({
              mensaje: "OK",
              token: token,
            });
          }
        );
      })
      .catch(function (err) {
        if (err.statusCode === 400) {
          const json = err.error;
          if (json.mensaje === "NO_LOGIN") {
            res.status(200).json({
              mensaje: "NO_LOGIN",
            });
          }
        } else {
          console.log("Ha occurido un error: ");
          console.log(err);
          next(err);
        }
      });
  });
}

module.exports = PublicController;
