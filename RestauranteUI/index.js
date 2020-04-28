const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
var cors = require('cors') 
const app = express();
app.use(cors())
const productoApi = require("./Controllers/Producto/Producto.js");
const restauranteApi = require("./Controllers/Restaurante/Restaurante");
const usuarioApi = require("./Controllers/Usuario/Usuario");
const publicController = require("./Controllers/index");
const cookieParser = require("cookie-parser");

const DIST_DIR = path.join(__dirname, "/dist/");
const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(bodyParser.json());
app.use(cookieParser());
// rutas de los files de react compilado
//app.use(express.static(path.join(__dirname, "tienda/build")));
//app.use(express.static(path.join(__dirname, "tienda-admin/build")));

app.use(express.static(DIST_DIR));
// Lista de controladores para usar la API
productoApi(app);
restauranteApi(app);
usuarioApi(app);
publicController(app);

// Verificar si esta funcionando
app.get("/Console/up", function (req, res, next) {
  res.send("Hola!");
});

app.get("/Login/", function (req, res, next) {
  res.sendFile(HTML_FILE);
});

app.get("/Home*", function (req, res, next) {
  res.sendFile(HTML_FILE);
});

app.get("/Nueva/Tienda", function (req, res, next) {
  res.sendFile(HTML_FILE);
});

// // pagina para el admin
// app.get("/Admin*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/tienda-admin/build/index.html"));
// });

const server = app.listen(3001, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
