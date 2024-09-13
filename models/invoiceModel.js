// models/invoiceModel.js
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  basicAmount: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  advancePaid: { type: Number, default: 0 },
  tdsAmount: { type: Number, default: 0 },
  netPayable: { type: Number, required: true },
  payeeDetails: {
    alternatePayee1: { type: String },
    alternatePayee2: { type: String },
    city: { type: String },
    street: { type: String },
    country: { type: String },
    bankDetails: {
      ifscCode: { type: String },
      accountNo: { type: String },
    },
  },
  lineItems: [
    {
      debit: { type: String },
      glDesc: { type: String },
      glCode: { type: String },
      text: { type: String },
    },
  ],
});

module.exports = mongoose.model('Invoice', invoiceSchema);
