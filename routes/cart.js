const express = require("express")
const { createCart, createCartItems, addItemToCart, getAllCart, getCart } = require("../controllers/cart") 

const router = express.Router()

router.route('/').post(createCart).get(getAllCart)
router.route('/:cartId').post(createCartItems).get(getCart)
router.route('/:cartId/:itemId').get(addItemToCart)


module.exports = router