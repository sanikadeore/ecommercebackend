const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Verification status
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Reference to the user's cart
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // List of user orders
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
