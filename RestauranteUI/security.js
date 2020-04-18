var guard = require("express-jwt-permissions")();
const myAuth = require("./auth");

exports.ValidateToken = ValidateToken = (header) => {
  const headerAuth = header;
  let token = undefined;
  if (headerAuth) {
    token = headerAuth.replace("Bearer ", "");
    if (token) {
      try {
        myAuth.verify(token);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

exports.CustomAuth = CustomAuth = (role = []) => {
  guard.check(role);
  return function (err, req, res, next) {
    ValidateToken(req.headers["authorization"]);
    if (err.code === "credentials_required") {
      res.status(401).send("No authorization token was found");
    } else if (err.code === "invalid_token") {
      res.status(401).send("Invalid Token");
    }
    next(err);
  };
};
