// for the car each user needs to have a cart
// as well as each user should access their own cart only, so only registered users should be able to view carts
// and some how we need to pass the current sesion or when the token bearer or jwt token is passed it should pass the
// user_id, if another user passes a id delibratly it should fail
// so the id should be passed from the auth middleware wehwn vrify token passes
// so id isnot a req.parmeter


import { Cart } from "../model/cart.js";
import { Product } from "../model/product.js";

 export const addToCart = async (id, productId, qty) => {
  const product = await Product.findById(productId);
  if (!product) {
    return { ok: false, error: "no product found with the provided id" };
  }

  let cart = await Cart.findOne({ user: id });

  if (!cart) {
    cart = await Cart.create({user: id})
    }

 const existingItem = cart.items.find((i) => i.product.toString() === productId);
  if (!existingItem) {
    cart.items.push({ product: productId, quantity: qty });
    await cart.save()
  } else {
    existingItem.quantity = existingItem.quantity + qty;
    await cart.save();
  }

  const populatedCart = await Cart.findById(cart._id).populate("items.product");

    return{
      ok: true,
      data: populatedCart,
    }
 }


export const listCart = async (id) => {
  const cart = await Cart.findOne({ user: id }).populate("items.product");

  if(!cart){
    const newCart = await Cart.create({ user: id });
    return {
      ok: true,
      data: newCart,
    }
  }
  return {
    ok: true,
    data: cart,
  }
 }

export const deleteFromCart = async (id, productId) => {
  const cart = await Cart.findOne({ user: id });
  if (!cart) {
    return {
      ok: false,
      error: "there is no product in the cart"
    }
  }

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) {
      return { ok: false, error: "no product in cart with the provided product id" }
    }

  await Cart.updateOne(
    { user: id },
    { $pull: { items: { product: productId } } }
  );

  const cartAfterDelete = await Cart.findById(cart._id).populate("items.product");

  return {
    ok: true,
    data: cartAfterDelete,
  }
}
