const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const productosApiRouter = require("./routes/api/producto");
const restauranteApiRouter = require("./routes/api/restaurante")

app.use(bodyParser.json());

app.use("/restaurante", restauranteApiRouter);
app.use("/producto", productosApiRouter);
app.get("/console/up", function(request, response, next) {
  response.send("Hola!!");
});

const server = app.listen(5050, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
