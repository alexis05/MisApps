const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const productoApi = require("./Controllers/Producto/Producto.js");

// rutas de los files de react compilado
app.use(express.static(path.join(__dirname, "tienda/build")));
app.use(express.static(path.join(__dirname, "tienda-admin/build")));

// Lista de controladores para usar la API
// Productos
productoApi(app);

// Verificar si esta funcionando
app.get("/Console/up", function(req, res, next) {
  res.send("Hola!");
});

// pagina del player
app.get("/Home*", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda/build/index.html"));
});

// pagina para crear nueva tienda
app.get("/Nueva/Tienda", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda/build/index.html"));
});

// pagina para el admin
app.get("/Admin*", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda-admin/build/index.html"));
});

const server = app.listen(8080, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
