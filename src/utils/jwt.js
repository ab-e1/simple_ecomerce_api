const jwt = require("jsonwebtoken");
const { jwtSecret, jwtSecret } = require("../config/loadEnv.js");

const signToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  returnjwt.verify(token, jwtSecret);
};

module.exports = { signToken, verifyToken };
