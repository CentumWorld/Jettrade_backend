const mongoose = require("mongoose");

const cryptoTransferHistory = new mongoose.Schema({
  userId: {
    type: String,
    required:true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CryptoTransferHistory = mongoose.model(
  "CryptoTransferHistory",
  cryptoTransferHistory
);
module.exports = CryptoTransferHistory;