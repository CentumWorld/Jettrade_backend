const mongoose = require('mongoose');

const BankAccountHolderSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
}, {timestamps:true});

const BankAccountHolder = mongoose.model('BankAccountHolder', BankAccountHolderSchema);

module.exports = BankAccountHolder;
