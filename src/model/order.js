import mongoose from "mongoose";

const orderSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
    },
  ],

  totlaPrice: { type: Number },

  status: {
    type: String,
    enum: ["pending", "paid", "shipped"],
    default: "pending",
  },

  timestamps: true,
};

export const Order = new mongoose.model("Order", orderSchema);
