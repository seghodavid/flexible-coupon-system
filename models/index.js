const Cart = require("./cart");
const CartItem = require("./cartItem");
const Coupon = require("./coupon");
const sequelize = require("../config/database.config");



Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Cart.belongsToMany(Coupon, { through: "CartCoupons" });
Coupon.belongsToMany(Cart, { through: "CartCoupons" });

sequelize.sync();

module.exports = {
    Cart,
    CartItem,
    Coupon
}