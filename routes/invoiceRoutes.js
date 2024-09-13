// routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// GET /api/invoices - Get all invoices
router.get('/', invoiceController.getInvoices);

// POST /api/invoices - Create a new invoice
router.post('/', invoiceController.createInvoice);

module.exports = router;
