// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Seller = require('../models/Seller');

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  // Assuming token is passed as Bearer token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

const verifySeller = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  // Assuming token is passed as Bearer token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.sellerId = decoded.id;
    const seller = await Seller.findById(decoded.id);
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { verifyUser, verifySeller };

