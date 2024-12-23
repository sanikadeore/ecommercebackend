
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, removeProduct, uploadProductImages } = require('../controllers/productController');
const { verifySeller } = require('../middlewares/authMiddleware');  // Make sure seller is authenticated

// Route for adding a new product (requires seller authentication)
router.post('/add', verifySeller, addProduct);

// Route for removing a product by its ID (requires seller authentication)
router.delete('/remove/:productId', verifySeller, removeProduct);

// Route for uploading product images (can be a separate upload route if needed)
router.post('/uploadImages', uploadProductImages);

module.exports = router;
