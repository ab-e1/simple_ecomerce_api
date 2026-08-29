require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret:
    process.env.JWT_SECRET || "default_jw_secret_change_it_imediately_or_soon",
  mongoDbUri: process.env.MONGO_URI,
  mongoDbPassword: process.env.MONGO_PASSWORD,
};
