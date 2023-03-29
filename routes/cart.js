const express = require("express")
const { createCart, createCartItems, addItemToCart } = require("../controllers/cart") 

const router = express.Router()

router.route('/').post(createCart)
router.route('/:cartId').post(createCartItems)
router.route('/:cartId/:itemId').get(addItemToCart)


module.exports = router