import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    category: { type: String, required: false },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product = new mongoose.model("Product", productSchema);
