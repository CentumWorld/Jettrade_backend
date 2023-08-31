const mongoose = require("mongoose");

const statePaymentApproveSchema = new mongoose.Schema({
  stateHandlerId: {
    type: String,
    required: true,
  },

  amount: {
    type: String,
  },

  requestDate: {
    type: Date,
    default: Date.now(),
  },
  approveDate: {
    type: Date,
    default: Date.now(),
  },
});

const statePaymentApprove = mongoose.model(
  "statePaymentApprove",
  statePaymentApproveSchema
);

module.exports = statePaymentApprove;
