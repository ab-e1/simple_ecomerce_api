import * as cartService from "../services/cartService.js";
import {failure, success} from "../utils/response.js"

export const addToCart = async (req, res, next) => {
  try {
    const result = await cartService.addToCart(req.user._id, req.body.productId, req.body.quantity);
    if (!result.ok) {
      return failure(res, result.error, 404);
    }
    return success(res, result.data, 201);
  } catch (err) {
    return next(err);
  }
}
  export const listCart = async (req, res, next) => {
    try {
      const result = await cartService.listCart(req.user._id);
      return success(res, result.data);
    } catch (err) {
      return next(err)
    }
}

export const deleteFromCart = async (req, res, next) => {
  try {
    const result = await cartService.deleteFromCart(req.user._id, req.params.id);
    if (!result.ok) {
      return failure(res, result.error, 404);
    }

    return success(res, result.data)
  } catch (err) {
    return next(err)
  }
}
