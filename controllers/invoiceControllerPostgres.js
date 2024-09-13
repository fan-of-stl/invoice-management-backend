const { createInvoice } = require('../models/invoiceModelPostgres');

// Create a new invoice
const createInvoicePostgres = async (req, res) => {
  const invoiceData = req.body;

  try {
    console.log(invoiceData);
    
    const invoiceId = await createInvoice(invoiceData);
    res.status(201).json({ message: 'Invoice created', invoiceId });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Error creating invoice', error });
  }
};

module.exports = {
  createInvoicePostgres
};
