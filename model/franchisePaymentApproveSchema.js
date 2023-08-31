const mongoose = require("mongoose");

const franchisePaymentApproveSchema = new mongoose.Schema({
  franchiseId: {
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

const franchisePaymentApprove = mongoose.model(
  "franchisePaymentApprove",
  franchisePaymentApproveSchema
);

module.exports = franchisePaymentApprove;
