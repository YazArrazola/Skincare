const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add product (admin/seller)
router.post('/', [auth, roleCheck(['admin', 'seller'])], async (req, res) => {
  const { name, description, ingredients, price, image, category } = req.body;
  try {
    const product = new Product({ name, description, ingredients, price, image, category });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update product
router.put('/:id', [auth, roleCheck(['admin', 'seller'])], async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete product
router.delete('/:id', [auth, roleCheck(['admin'])], async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;