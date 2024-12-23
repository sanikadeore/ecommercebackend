// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');
const { verifyUser } = require('../middlewares/authMiddleware');  // Ensure user is authenticated

// Place an order after validating cart
router.post('/placeOrder', verifyUser, placeOrder);

module.exports = router;
