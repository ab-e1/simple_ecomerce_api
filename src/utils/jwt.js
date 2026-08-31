import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/loadEnv.js";

export const signToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
