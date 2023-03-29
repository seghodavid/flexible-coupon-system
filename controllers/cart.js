const cartService = require('../services/cart')
const {StatusCodes} = require("http-status-codes")


const createCart = async(req, res, next) => {
    try{
        const cart = await cartService.createCart()

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
        const cartItem = await cartService.createCartItem(
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
        const addedItem = await cartService.addItemToCart(cartId, itemId)

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

const getCart = async (req,res,next) => {
    try {
        const {cartId } = req.params

        const cart = await cartService.getCart(cartId)

         res.status(StatusCodes.OK).json({
           status: "success",
           msg: "Hello! here are your cart items",
           data: cart,
         });
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getAllCart = async (req,res,next) => {
    try {
        const cart = await cartService.getAllCart()

         res.status(StatusCodes.OK).json({
           status: "success",
           msg: "Hello! here are your cart items",
           data: cart,
         });
    } catch (error) {
        console.error(error)
        next(error)
    }
}



module.exports = {
    createCart,
    createCartItems,
    addItemToCart,
    getCart,
    getAllCart
}