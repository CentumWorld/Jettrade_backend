const mongoose = require('mongoose');

// Define the schema for the Invoice model
const invoiceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  invoice: {
    type: String, // Assuming the invoice is stored as a file path or URL
    required: true
  },
  type: {
    type: String ,
    enum : ["New", "Renewal"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
});

// Create the Invoice model
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
