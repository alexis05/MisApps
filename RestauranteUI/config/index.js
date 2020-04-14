require("dotenv").config();

module.exports = {
  auth: {
    secret: process.env.JWT_SECRET || "3yD3nP5m3l5BA71s75BuS75v1N0",
  },
  dev: process.env.NODE_ENV || "dev",
};
