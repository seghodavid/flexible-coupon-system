const couponService = require('../services/coupon')
const { StatusCodes } = require("http-status-codes");

const createCoupon = async (req,res,next) => {
    try {
        const {code, type, minimumCartValue, minimumCartItem } = req.body
        const coupon = await couponService.createCoupon(code,type,minimumCartValue,minimumCartItem)

        res.status(StatusCodes.CREATED).json({
          status: "success",
          msg: "Coupon code was created successfully",
          data: coupon,
        });
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getCoupon = async (req, res, next) => {
    try {
        const coupon = await couponService.getCoupon()

        res.status(StatusCodes.OK).json({
          status: "success",
          msg: "Available coupon codes",
          data: coupon,
        });
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const applyCoupon = async (req, res, next) => {
    try {
        const {code, cartId} = req.body
        const coupon = await couponService.applyCoupon(code, cartId)

         res.status(StatusCodes.OK).json({
           status: "success",
           msg: "Free discount for you",
           data: coupon,
         });
    } catch (error) {
        console.error(error)
        next(error)
    }
}

module.exports = {
    createCoupon,
    getCoupon,
    applyCoupon
}