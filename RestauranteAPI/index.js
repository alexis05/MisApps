const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const productosApiRouter = require("./routes/api/producto");
const restauranteApiRouter = require("./routes/api/restaurante");
const { config } = require("./config");

app.use(bodyParser.json());
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });
//session

app.use(
  session({
    secret: "3214f82e0cf03f418a55d24f110bcfe8bcb068477a6f821c7ffd2c55c4f2ee20",
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

console.log(config.dev);
setProtect = role => {
  if (!config.dev) {
    return keycloak.protect(role);
  }
  return keycloak.middleware();
};

app.use(keycloak.middleware());

app.use("/restaurante", setProtect(), restauranteApiRouter);
app.use("/producto", productosApiRouter);
app.get("/console/up", function(request, response, next) {
  response.send("Hola!!");
});

app.use(keycloak.middleware({ logout: "/" }));

const server = app.listen(5050, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
