const { pool } = require('../config/db');

const createInvoice = async (invoiceData) => {
  const {
    currency, basicAmount, taxAmount, totalAmount, advancePaid, tdsAmount, netPayable, payeeDetails, lineItems
  } = invoiceData;

  const client = await pool.connect();

  try {
    // Begin transaction
    await client.query('BEGIN');

    // Insert into invoices table
    const insertInvoiceQuery = `
      INSERT INTO invoices(currency, basicAmount, taxAmount, totalAmount, advancePaid, tdsAmount, netPayable, payeeDetails)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    `;
    const invoiceResult = await client.query(insertInvoiceQuery, [
      currency, basicAmount, taxAmount, totalAmount, advancePaid, tdsAmount, netPayable, payeeDetails
    ]);

    const invoiceId = invoiceResult.rows[0].id;

    // Insert line items
    const insertLineItemsQuery = `
      INSERT INTO lineItems(invoice_id, debit, glDesc, glCode, text)
      VALUES($1, $2, $3, $4, $5)
    `;
    for (let lineItem of lineItems) {
      await client.query(insertLineItemsQuery, [
        invoiceId,
        lineItem.debit,
        lineItem.glDesc,
        lineItem.glCode,
        lineItem.text
      ]);
    }

    // Commit transaction
    await client.query('COMMIT');

    return invoiceId;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createInvoice };
