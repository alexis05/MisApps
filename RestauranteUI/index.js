const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "tienda/build")));
app.use(express.static(path.join(__dirname, "tienda-admin/build")));

app.get("/hola", function(req, res, next) {
  res.send("Hola");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda/build/index.html"));
});

app.get("/Admin*", (req, res) => {
  res.sendFile(path.join(__dirname + "/tienda-admin/build/index.html"));
});

const server = app.listen(3030, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
  console.log(path.join(__dirname));
});
