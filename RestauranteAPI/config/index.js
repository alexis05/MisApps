require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV || "dev",
  port: process.env.PORT,
  dbUser: "",
  dbPassword: "",
  dbHost: "localhost",
  dbPort: "27017",
  dbName: "rest_ab",
  jwtSecret: process.env.JWT_SECRET || "3yD3nP5m3l5BA71s75BuS75v1N0",
};

module.exports = { config };
