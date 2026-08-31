import { verifyToken } from "../utils/jwt.js";
import { failure } from "../utils/response.js";

export const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return failure(res, "no toen provided", 401);
  }
  const token = header.split(" ")[1];

  try {
    const decodedheader = verifyToken(token);
    req.user = decodedheader;
    next();
  } catch (err) {
    return failure(res, "token expired or invalid token", 401);
  }
};
