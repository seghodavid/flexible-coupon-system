const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database.config')

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
})

module.exports = Cart