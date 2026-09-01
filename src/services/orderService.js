import { Cart } from "../model/cart.js";
import { Order } from "../model/order.js";

export const createOrder = async (id) => {
  const cart = await Cart.findOne({ user: id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return { ok: false, error: "cart is empty" };
  }
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const order = await Order.create({
    user: id,
    items: cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
    })),
    totalPrice,
    status: "pending",
  });

  cart.items = [];
  await cart.save();

  return {
    ok: true,
    data: order,
  };
};

export const listOrders = async (id) => {
  const order = await Order.find({ user: id }).populate("items.product");
  return {
    ok: true,
    data: order,
  };
};
