require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV || "dev",
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASS || "",
  dbHost: process.env.HOST || "localhost",
  dbPort: process.env.DB_PORT || "27017",
  dbName: process.env.DB_NAME || "rest_ab",
};

module.exports = { config };
