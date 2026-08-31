import * as authService from "../services/authService.js";
import { success, failure } from "../utils/response.js";

export const register = async (req, res) => {
  const result = await authService.register(req.body);
  if (!result.ok) {
    return failure(res, result.error, 401);
  }
  return success(res, result.data, 201, result.token);
};

export const login = async (req, res) => {
  const result = await authService.login(req.body);
  if (!result.ok) {
    return failure(res, result.error, 401);
  }
  return success(res, result.data, 200, result.token);
};
