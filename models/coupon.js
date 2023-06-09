const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database.config");

const Coupon = sequelize.define("Coupon", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM("fixed", "mixed", "percent", "rejected"),
  },
  discountAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  minimumCartValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  minimumCartItems: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Coupon