const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  productId: { type: String, unique: true, required: true }, // Unique product ID
  inStockValue: { type: Number, default: 0 }, // Available stock value
  soldStockValue: { type: Number, default: 0 }, // Number of items sold
  visibility: { type: String, default: 'on' }, // Visibility of product
  images: [{ type: String }], // Array of image paths
  freeDelivery: { type: Boolean, default: false }, // Flag for free delivery
  discount: { type: Number, default: 0 }, // Discount percentage
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true } // Seller ID reference
});

module.exports = mongoose.model('Product', productSchema);
