const Cart = require("./cart");
const CartItem = require("./cartItem");
const Coupon = require("./coupon");


Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Cart.belongsToMany(Coupon, { through: "CartCoupons" });
Coupon.belongsToMany(Cart, { through: "CartCoupons" });


module.exports = {
    Cart,
    CartItem,
    Coupon
}