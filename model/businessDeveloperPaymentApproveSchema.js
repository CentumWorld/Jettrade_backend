const mongoose = require("mongoose");

const businessDeveloperPaymentApproveSchema = new mongoose.Schema({
  businessDeveloperId: {
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

const businessDeveloperPaymentApprove = mongoose.model(
  "businessDeveloperPaymentApprove",
  businessDeveloperPaymentApproveSchema
);

module.exports = businessDeveloperPaymentApprove;
