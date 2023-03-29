const { Cart, CartItem, Coupon } = require("../models");
const cartService = require("./cart");

class couponService {
  static async createCoupon(code, type, minimumCartValue, minimumCartItems) {
    const coupon = await Coupon.create({
      code,
      type,
      minimumCartValue,
      minimumCartItems,
    });

    return coupon;
  }

  static async getCoupon() {
    const coupon = await Coupon.findAll();

    return coupon;
  }

  static async applyCoupon(couponCode) {
    const coupon = await Coupon.findOne({ where: { code: couponCode } });
    if (!coupon) {
      throw new Error("Invalid coupon code");
    }

    const cart = await Cart.findOne({
      where: { Id: 3 },
      include: [CartItem],
    });

    if (
      cart.totalAmount <= coupon.minimumCartValue ||
      cart.CartItems.length < coupon.minimumCartItems
    ) {
      throw new Error(
        `Coupon code requires you spend minimum ${coupon.minimumCartValue} or purchase at least ${coupon.minimumCartItems} items`
      );
    }

    let adjustedPrice = cart.totalAmount;
    let discountAmount = 0;

    if (coupon.type === "percent") {
      discountAmount = cart.totalAmount * (coupon.discountAmount / 100);
      adjustedPrice = cart.totalAmount - discountAmount;
    } else if (coupon.type === "fixed") {
      discountAmount = coupon.discountAmount;
      adjustedPrice = cart.totalAmount - discountAmount;
    } else if (coupon.type === "mixed") {
      const percentDiscount = (coupon.discountAmount / 100) * cart.totalAmount;
      const fixedDiscount = cart.totalAmount - coupon.discountAmount;
      discountAmount = Math.max(percentDiscount, fixedDiscount);
    } else if (coupon.type === "rejected") {
      const fixedAmount = cart.totalAmount - 10.0;
      const percentOff = (10 / 100) * cart.totalAmount;
      discountAmount = fixedAmount + percentOff;
      adjustedPrice = cart.totalAmount - discountAmount;
    }

    coupon.discountAmount = discountAmount;

    return { adjustedPrice, discountAmount };
  }
}

module.exports = couponService;
