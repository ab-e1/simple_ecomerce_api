import * as orderService from "../services/orderService.js";
import { failure, success } from "../utils/response.js";

export const createOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(req.user._id);
    if (!result.ok) {
      return failure(res, result.error, 404);
    }

    return success(res, result.data, 201);
  } catch (err) {
    next(err);
  }
};

export const listOrder = async (req, res, next) => {
  try {
    const result = await orderService.listOrders(req.user._id);
    return success(res, result.data);
  } catch (err) {
    next(err);
  }
};
