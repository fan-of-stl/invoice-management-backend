// controllers/invoiceController.js
const Invoice = require('../models/invoiceModel');

// Get all invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error });
  }
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    console.log(req.body);
    
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: 'Error creating invoice', error });
  }
};
