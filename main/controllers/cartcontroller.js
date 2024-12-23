const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add Product to Cart
exports.addProductToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const { userId } = req;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cart = await Cart.findOne({ userId });
    const existingProduct = cart.products.find(p => p.productId.toString() === productId);

    if (existingProduct) {
      // Update the quantity and total for the existing product
      existingProduct.quantity += quantity;
      existingProduct.total = existingProduct.quantity * (product.price - (product.price * existingProduct.discount) / 100);
    } else {
      // Add new product to the cart
      cart.products.push({
        productId,
        quantity,
        price: product.price,
        total: quantity * product.price,
        discount: product.discount
      });
    }

    // Recalculate cart total, discount, and shipping
    cart.calculateTotal();

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to cart', details: err });
  }
};

// Remove Product from Cart
exports.removeProductFromCart = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    cart.calculateTotal(); // Recalculate the total after removing the product

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove product from cart', details: err });
  }
};
