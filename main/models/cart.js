const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Product reference
      quantity: { type: Number, required: true }, // Quantity of the product
      price: { type: Number, required: true }, // Price of the product at the time of adding to cart
      discount: { type: Number, default: 0 }, // Discount for individual product (if any)
      total: { type: Number, required: true } // Total for the product (quantity * price - discount)
    }
  ],
  totalAmount: { type: Number, default: 0 }, // Total price of all items in the cart
  deliveryCharges: { type: Number, default: 0 }, // Delivery charges
  discount: { type: Number, default: 0 }, // Total discount on the cart
  isFreeDelivery: { type: Boolean, default: false }, // Whether the cart qualifies for free delivery
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
    this.deliveryCharges = 50; // Example flat delivery charge
  }

  this.totalAmount = total + this.deliveryCharges - this.discount;
};

module.exports = mongoose.model('Cart', cartSchema);
