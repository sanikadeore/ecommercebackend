const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place Order
exports.placeOrder = async (req, res) => {
  const { userId } = req;
  
  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const newOrder = new Order({
      userId,
      products: cart.products.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
        total: product.total
      })),
      totalAmount: cart.totalAmount,
      discount: cart.discount,
      deliveryCharges: cart.deliveryCharges,
      status: 'pending',
      shippingAddress: req.body.shippingAddress, 
    });

    await newOrder.save();

    // Clear Cart after placing order
    cart.products = [];
    cart.totalAmount = 0;
    cart.discount = 0;
    cart.deliveryCharges = 0;
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order', details: err });
  }
};
