"use strict";

const jwt = require("jsonwebtoken");
const config = require("./config");

function sign(payload, callback) {
  jwt.sign(payload, config.auth.secret, callback);
}

function verify(token, callback) {
  jwt.verify(token, config.auth.secret, callback);
}

module.exports = {
  sign,
  verify,
};
