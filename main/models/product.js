const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  productId: { type: String, unique: true, required: true }, 
  inStockValue: { type: Number, default: 0 }, 
  soldStockValue: { type: Number, default: 0 }, 
  visibility: { type: String, default: 'on' }, 
  images: [{ type: String }], 
  freeDelivery: { type: Boolean, default: false }, 
  discount: { type: Number, default: 0 }, 
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true } 
});

module.exports = mongoose.model('Product', productSchema);
