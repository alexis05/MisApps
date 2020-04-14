const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const productosApi = require("./routes/api/producto");
const restauranteApi = require("./routes/api/restaurante");
const usuariosApi = require("./routes/api/usuario");
const authApi = require("./routes/api/auth");

const keycloakConfig = {
  realm: "restaurante",
  "auth-server-url": "http://192.168.0.15:8080/auth/",
  "ssl-required": "external",
  resource: "client",
  "public-client": true,
  "bearer-only": true,
  "confidential-port": 0,
};
app.use(bodyParser.json());
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
//session

app.use(
  session({
    secret: "3214f82e0cf03f418a55d24f110bcfe8bcb068477a6f821c7ffd2c55c4f2ee20",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(keycloak.middleware());

restauranteApi(app, keycloak);
productosApi(app, keycloak);
usuariosApi(app, keycloak);
authApi(app);

app.get("/console/up", function (request, response, next) {
  response.send("Hola!!");
});

app.use(keycloak.middleware({ logout: "/" }));

const server = app.listen(5050, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
