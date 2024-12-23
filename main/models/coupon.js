const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true }, 
  discountPercentage: { type: Number, required: true }, 
  minimumOrderAmount: { type: Number, required: true }, 
  validTill: { type: Date, required: true }, 
  isActive: { type: Boolean, default: true }, 
  usageLimit: { type: Number, default: 1 },
  usedCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Coupon', couponSchema);
