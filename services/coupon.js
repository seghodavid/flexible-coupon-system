const { Cart, CartItem, Coupon } = require("../models");
const { BadRequestError } = require("../errors")

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

  static async applyCoupon(couponCode, cartId) {
    const coupon = await Coupon.findOne({ where: { code: couponCode } });
    if (!coupon) {
      throw new BadRequestError(`The coupon code ${couponCode} is invalid or expired`);
    }

    const cart = await Cart.findOne({
      where: { Id: cartId },
      include: [CartItem],
    });

    if (
      Number(cart.totalAmount) <= coupon.minimumCartValue ||
      cart.CartItems.length < coupon.minimumCartItems
    ) {
      throw new BadRequestError(
        `Coupon code requires you spend minimum ${coupon.minimumCartValue} or purchase at least ${coupon.minimumCartItems} items`
      );
    }

    let totalAmount = Number(cart.totalAmount);
    let adjustedPrice = totalAmount;
    let discountAmount = Number(coupon.discountAmount);

    if (coupon.type === "percent") {
      discountAmount = totalAmount * ( discountAmount/ 100);
      adjustedPrice -= discountAmount;
    } else if (coupon.type === "fixed") {
      discountAmount;
      adjustedPrice -= discountAmount;
    } else if (coupon.type === "mixed") {
      const percentDiscount = (discountAmount / 100) * totalAmount;
      const fixedDiscount = discountAmount;
      discountAmount = Math.max(percentDiscount, fixedDiscount);
      console.log(discountAmount)
      adjustedPrice -= discountAmount;
    } else if (coupon.type === "rejected") {
      const fixedAmount = discountAmount;
      const percentOff = (discountAmount / 100) * totalAmount;
      discountAmount = fixedAmount + percentOff;
      adjustedPrice -= discountAmount;
    }

    coupon.discountAmount = discountAmount;

    return { adjustedPrice, discountAmount };
  }
}

module.exports = couponService;
