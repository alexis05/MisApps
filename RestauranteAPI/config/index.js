require("dotenv").config();
const NODE_ENV = "production";

const config = {
  dev: NODE_ENV !== "production",
  port: process.env.PORT,
  dbUser: "",
  dbPassword: "",
  dbHost: "localhost",
  dbPort: "27017",
  dbName: "rest_ab",
  authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
  authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
  authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
  authJwtSecret: process.env.AUTH_JWT_SECRET
};

module.exports = { config };
