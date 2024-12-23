const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true }, // Coupon code
  discountPercentage: { type: Number, required: true }, // Discount percentage
  minimumOrderAmount: { type: Number, required: true }, // Minimum order value for coupon to be applicable
  validTill: { type: Date, required: true }, // Expiry date of the coupon
  isActive: { type: Boolean, default: true }, // Whether the coupon is active
  usageLimit: { type: Number, default: 1 }, // Limit on number of uses
  usedCount: { type: Number, default: 0 } // Track how many times the coupon has been used
});

module.exports = mongoose.model('Coupon', couponSchema);
