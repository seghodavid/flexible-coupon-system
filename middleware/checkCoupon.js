const { Coupon } = require("../models");
const { BadRequestError } = require("../errors")

const checkCoupon = async (req, res, next) => {
 try {
     const { code } = req.body;

     const existingCode = await Coupon.findOne({ where: { code: code } });

     if (!existingCode)
       throw new BadRequestError(`The code ${code} is invalid or expired`);

     next();
 } catch (error)  {
    next(error)
 }
};

module.exports = checkCoupon