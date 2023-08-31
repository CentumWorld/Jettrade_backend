const mongoose = require('mongoose');

const StateBankAccountHolderSchema = new mongoose.Schema({
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
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

const StateBankAccountHolder = mongoose.model('StateBankAccountHolder', StateBankAccountHolderSchema);

module.exports = StateBankAccountHolder;
