require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  dbUser: "",
  dbPassword: "",
  dbHost: "localhost",
  dbPort: "27017",
  dbName: "rest_ab",
  authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
  authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
  authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  realm: "restaurante",
  auth_server_url: "http://192.168.0.15:8080/auth/",
  ssl_required: "external",
  resource: "restaurant-client",
  public_client: true,
  confidential_port: 0

};

module.exports = { config };