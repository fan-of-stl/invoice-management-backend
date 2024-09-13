const express = require('express');
const { createInvoicePostgres } = require('../controllers/invoiceControllerPostgres');

const router = express.Router();

router.post('/', createInvoicePostgres);

module.exports = router;
