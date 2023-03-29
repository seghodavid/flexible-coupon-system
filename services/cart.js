const { Cart, CartItem } = require("../models");
const { BadRequestError } = require("../errors")

class cartService {
  static async createCart() {
    const cart = await Cart.create();
    return cart;
  }

  static async getCart(cartId) {
    const cart = await Cart.findOne({ where: { id: cartId }, include: [CartItem] });

    if (!cart) {
      throw new BadRequestError(`Cart with id ${cartId} not found`);
    }

     const totalPrice = cart.CartItems.reduce(
       (acc, item) => acc + item.price * item.quantity,
       0
     );

     cart.totalAmount = totalPrice

     await cart.save()

    return {cart, totalPrice};
  }

  static async getAllCart() {
    const cart = await Cart.findAll({include: [CartItem]})

    return {cart}
  }

  static async createCartItem(cartId, itemName, price) {
    const cart = await Cart.findByPk(cartId)

    if(!cart) throw new BadRequestError("Cart does not exist");

    const cartItem = await CartItem.create({
        cartId, itemName, price
    })

    return cartItem
  }

  static async addItemToCart(cartId, itemId) {
    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      throw new BadRequestError("Cart not found");
    }

    const cartItem = await CartItem.findOne({ where: { id: itemId, cartId } });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      await CartItem.create({ itemId, cartId});
    }

    return this.getCart(cartId);
  }
}


module.exports = cartService