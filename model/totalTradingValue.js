const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const totalTradingValueSchema = new Schema({
  userId: {
    type: String,

    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  liquidity: {
    type: Number,
    required: true,
  },
  totalTradingValue: {
    type: Number,
    required: true,
  },

}, {timestamps: true});

const TotaltradingValue = mongoose.model(
  "TotaltradingValue",
  totalTradingValueSchema
);

module.exports = TotaltradingValue;
