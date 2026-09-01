import * as productServices from "../services/productService.js";
import { failure, success } from "../utils/response.js";

export const listAllProducts = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 15, 1), 100);

    const result = await productServices.listAllProducts(page, limit);
    if (!result.ok) {
      return failure(res, "invalid page request or limit request");
    }

    return res.status(200).json({
      ok: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const result = await productServices.createProduct(req.body);

    if (!result.ok) {
      return failure(res, result.error, 401);
    }

    return success(res, result.data, 201);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const result = await productServices.updateProduct(req.params.id, req.body);

    if (!result.ok) {
      return failure(res, result.error, 404);
    }

    return success(res, result.data, 200);
  } catch (err) {
    next(err);
  }
  };

export const deleteProduct = async (req, res, next) => {
  try {
    const result = await productServices.deleteProduct(req.params.id);

    if (!result.ok) {
      return failure(res, result.error, 404);
    }

    return success(res, result.data);
  } catch (err) {
    next(err);
  }
  };

export const getProductById = async (req, res, next) => {
  try {
    const result = await productServices.getProductById(req.params.id);
    if (!result.ok) {
      return failure(res, result.error, 404);
    }

    return success(res, result.data)
  } catch (err) {
    next(err);
  }
};
