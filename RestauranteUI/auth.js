"use strict";

const jwt = require("jsonwebtoken");
const config = require("./config");

function sign(payload, callback) {
  jwt.sign(payload, config.jwtSecret, callback);
}

function verify(token, callback) {
  jwt.verify(token, config.jwtSecret, callback);
}

module.exports = {
  sign,
  verify,
};
