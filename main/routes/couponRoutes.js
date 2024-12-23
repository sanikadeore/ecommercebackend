// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const { applyCoupon } = require('../controllers/couponController');
const { verifyUser } = require('../middlewares/authMiddleware');  // Ensure user is authenticated

// Apply coupon to the cart
router.post('/apply', verifyUser, applyCoupon);

module.exports = router;

