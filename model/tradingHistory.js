const mongoose = require("mongoose");

const tradinhHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  percentage: {
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

const TradingHistory = mongoose.model("TradingHistory", tradinhHistorySchema);
module.exports = TradingHistory;