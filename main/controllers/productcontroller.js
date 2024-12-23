
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage engine for product images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/products/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).array('productImages', 5); // Max 5 images

// Add Product
exports.addProduct = (req, res) => {
  const { name, price, description, category, productId, inStockValue, visibility, discount } = req.body;
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "At least one product image is required." });
  }

  const productImages = req.files.map(file => file.path);

  const newProduct = new Product({
    name,
    price,
    description,
    category,
    productId,
    inStockValue,
    soldStockValue: 0, // Initially 0 sold stock
    visibility: visibility || 'on',
    images: productImages,
    discount: discount || 0,  // Default to 0% discount
    sellerId: req.seller._id, // Assuming you are using a middleware to identify the seller
  });

  newProduct.save()
    .then(product => res.status(201).json({ product }))
    .catch(err => res.status(500).json({ error: "Failed to add product", details: err }));
};

// Remove Product
exports.removeProduct = (req, res) => {
  const { productId } = req.params;

  Product.findByIdAndDelete(productId)
    .then(() => res.status(200).json({ message: 'Product removed successfully' }))
    .catch(err => res.status(500).json({ error: "Failed to remove product", details: err }));
};

// Upload Product Images
exports.uploadProductImages = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Images uploaded successfully', images: req.files });
  });
};
