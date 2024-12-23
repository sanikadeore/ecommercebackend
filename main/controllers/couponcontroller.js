const Coupon = require('../models/Coupon');

// Apply Coupon Code
exports.applyCoupon = async (req, res) => {
  const { code } = req.body;
  const { userId } = req;

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(400).json({ error: 'Invalid coupon code' });
    }

    if (coupon.isActive && coupon.validTill >= new Date()) {
      const cart = await Cart.findOne({ userId });

      if (cart.totalAmount >= coupon.minimumOrderAmount) {
        const discountAmount = (cart.totalAmount * coupon.discountPercentage) / 100;
        cart.discount = discountAmount;
        cart.calculateTotal(); // Recalculate cart total with discount

        await cart.save();
        res.status(200).json({ message: 'Coupon applied successfully', cart });
      } else {
        res.status(400).json({ error: 'Minimum order amount not met for this coupon' });
      }
    } else {
      res.status(400).json({ error: 'Coupon is either expired or inactive' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply coupon', details: err });
  }
};

