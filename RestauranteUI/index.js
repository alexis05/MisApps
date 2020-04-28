const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(cors());
const productoApi = require("./Controllers/Producto/Producto.js");
const restauranteApi = require("./Controllers/Restaurante/Restaurante");
const usuarioApi = require("./Controllers/Usuario/Usuario");
const publicController = require("./Controllers/index");
const cookieParser = require("cookie-parser");

const DIST_DIR = path.join(__dirname, "/dist/");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const DIST_DIR_BO = path.join(__dirname, "/distbo/");
const HTML_FILE_BO = path.join(DIST_DIR_BO, "index.html");

app.use(bodyParser.json());
app.use(cookieParser());

productoApi(app);
restauranteApi(app);
usuarioApi(app);
publicController(app);
// Verificar si esta funcionando
app.get("/", function (req, res, next) {
  res.send("Hola!");
});

app.use(express.static(DIST_DIR));

app.get("/Login/", function (req, res, next) {
  res.sendFile(HTML_FILE);
});

app.get("/Home*", function (req, res, next) {
  res.sendFile(HTML_FILE);
});

app.get("/Nueva/Tienda/", function (req, res, next) {
  res.sendFile(HTML_FILE);
});

app.use(express.static(DIST_DIR_BO));
app.get("/Admin/*", function (req, res, next) {
  res.sendFile(HTML_FILE_BO);
});

const server = app.listen(3001, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
