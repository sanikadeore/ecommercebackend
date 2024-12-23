// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { addProductToCart, removeProductFromCart } = require('../controllers/cartController');
const { verifyUser } = require('../middlewares/authMiddleware');  // Ensure user is authenticated

// Add product to the user's cart
router.post('/add', verifyUser, addProductToCart);

// Remove product from the user's cart
router.delete('/remove/:productId', verifyUser, removeProductFromCart);

module.exports = router;

