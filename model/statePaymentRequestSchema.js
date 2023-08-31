const mongoose = require('mongoose')

const statePaymentRequestSchema = new mongoose.Schema({
    stateHandlerId: {
      type: String,
      required: true,
      trim: true,
    },
    
    amount: {
      type: String,
    },

    requestDate: {
      type: Date,
      default: Date.now()
    }
    
});

const statePaymentRequest = mongoose.model("statePaymentRequest", statePaymentRequestSchema);

module.exports = statePaymentRequest;
