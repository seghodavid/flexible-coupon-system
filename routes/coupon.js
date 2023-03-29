const express = require("express");
const { createCoupon, getCoupon, applyCoupon } = require("../controllers/coupon");
const checkCoupon = require("../middleware/checkCoupon");

const router = express.Router()


router.route('/createCoupon').post(createCoupon)
router.route('/').get(getCoupon).post(applyCoupon)


module.exports = router;