const CartService = require('../services/cart')
const {StatusCodes} = require("http-status-codes")


const createCart = async(req, res, next) => {
    try{
        const cart = await CartService.createCart()

        res.status(StatusCodes.CREATED).json({
            "status": "success",
            "msg": "Cart creation was successful",
            "data": cart
        })
    } catch(error) {
        console.error(error)
        next(error)
    }
}

const createCartItems = async (req,res,next) => {
    try{
        const { cartId } = req.params;
        const { itemName, price } = req.body;
        const cartItem = await CartService.createCartItem(
          cartId,
          itemName,
          price
        );

        res.status(StatusCodes.CREATED).json({
          status: "success",
          msg: "Cart item creation was successful",
          data: cartItem,
        });
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const addItemToCart = async (req,res,next) => {
    try {
        const { cartId, itemId } = req.params
        const addedItem = await CartService.addItemToCart(cartId, itemId)

        res.status(StatusCodes.OK).json({
          status: "success",
          msg: "Cart item creation was successful",
          data: addedItem,
        });
    } catch (error) {
        console.error(error)
        next(error)
    }
}



module.exports = {
    createCart,
    createCartItems,
    addItemToCart
}