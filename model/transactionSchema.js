const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  amountAdded: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const WalletTransaction = mongoose.model('WalletTransaction', transactionSchema);
module.exports = WalletTransaction;
