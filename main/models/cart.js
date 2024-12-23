const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
  totalAmount: { type: Number, default: 0 }, 
  deliveryCharges: { type: Number, default: 0 }, 
  discount: { type: Number, default: 0 }, 
  isFreeDelivery: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now }
});

cartSchema.methods.calculateTotal = function() {
  let total = 0;
  this.products.forEach(product => {
    total += product.total;
  });

  // Apply free delivery if total amount is above ₹499
  if (total >= 499) {
    this.isFreeDelivery = true;
    this.deliveryCharges = 0;
  } else {
    this.isFreeDelivery = false;
    this.deliveryCharges = 50; 
  }

  this.totalAmount = total + this.deliveryCharges - this.discount;
};

module.exports = mongoose.model('Cart', cartSchema);
