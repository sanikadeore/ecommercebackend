const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deliveryCharges: { type: Number, default: 0 },
  status: { type: String, default: 'pending' }, // Order status (pending, shipped, delivered)
  createdAt: { type: Date, default: Date.now },
  shippingAddress: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
