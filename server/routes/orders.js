const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const PDFDocument = require('pdfkit');

const router = express.Router();

// Get orders (user or admin)
router.get('/', auth, async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'admin') {
      orders = await Order.find().populate('user', 'name email').populate('products.product');
    } else {
      orders = await Order.find({ user: req.user.id }).populate('products.product');
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create order
router.post('/', auth, async (req, res) => {
  const { products, total } = req.body;
  try {
    const order = new Order({ user: req.user.id, products, total });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update order status (admin/seller)
router.put('/:id/status', [auth, roleCheck(['admin', 'seller'])], async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Export order to PDF
router.get('/:id/pdf', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('products.product');
    if (!order || (order.user._id.toString() !== req.user.id && req.user.role !== 'admin')) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=order.pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Order Details', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.text(`User: ${order.user.name} (${order.user.email})`);
    doc.text(`Status: ${order.status}`);
    doc.text(`Total: $${order.total}`);
    doc.moveDown();
    doc.text('Products:');
    order.products.forEach(item => {
      doc.text(`${item.product.name} - Quantity: ${item.quantity}`);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;