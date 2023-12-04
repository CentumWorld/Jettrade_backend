const mongoose = require('mongoose')

const statePaymentRequestSchema = new mongoose.Schema({
    stateHandlerId: {
      type: String,
      required: true,
      trim: true,
    },
    
    amount: {
      type: String,
      required: true
    },

    requestDate: {
      type: Date,
      default: Date.now()
    },
    
    paymentBy: {
      type: String,
      required: true
    }
    
});

const statePaymentRequest = mongoose.model("statePaymentRequest", statePaymentRequestSchema);

module.exports = statePaymentRequest;
