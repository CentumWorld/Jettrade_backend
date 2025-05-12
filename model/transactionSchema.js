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
  isAdded: {
    type: Boolean,
    default: false,
  },
});

const WalletTransaction = mongoose.model('WalletTransaction', transactionSchema);
module.exports = WalletTransaction;
