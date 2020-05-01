const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const productosApi = require("./routes/api/producto");
const restauranteApi = require("./routes/api/restaurante");
const usuariosApi = require("./routes/api/usuario");
const authApi = require("./routes/api/auth");
const carritosApi = require("./routes/api/carritos");

app.use(bodyParser.json());

restauranteApi(app);
productosApi(app);
usuariosApi(app);
carritosApi(app);
authApi(app);

app.get("/console/up", function (request, response, next) {
  response.send("Hola!!");
});

const server = app.listen(5050, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
