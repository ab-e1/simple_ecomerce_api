import { Product } from "../model/product.js";

export const listAllProducts = async (page = 1, limit = 15) => {
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();

  return {
    ok: true,
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    return { ok: false, error: "no product found with the provided id" };
  }

  return {
    ok: true,
    data: product,
  };
};

export const createProduct = async (data) => {
  const duplicate = await Product.findOne({
    name: data.name.trim(),
  });
  if (duplicate) {
    return { ok: false, error: "product have already been created" };
  }
  const newProduct = await Product.create({
    name: data.name,
    price: Number(data.price),
    description: data.description,
    category: data.category,
    inStock: true,
  });

  return {
    ok: true,
    data: newProduct,
  };
};

export const updateProduct = async (id, data) => {
  const check = await Product.findOne({
    _id: id,
  });
  const { name, price, description, category, inStock } = data;
  if (!check) {
    return { ok: false, error: "no product with the provided id" };
  }

  const update = await Product.findByIdAndUpdate(
    id,
    { name, price, description, category, inStock },
    { new: true },
  );

  return {
    ok: true,
    data: update,
  };
};

export const deleteProduct = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    return { ok: false, error: "no product with the provided id" };
  }

  return {
    ok: true,
    data: deleted,
  };
};
