
const mongoose = require('mongoose')

const statePaymentRequestSchema = new mongoose.Schema({
    userid: {
      type: String,
      required: true,
      trim: true,
    },
    
    amount: {
      type: String,
    },

    isVideoCreator: {
      type: Boolean,
      default: false
    }
    
  });

  const statePaymentRequest = mongoose.model("statePaymentRequest", statePaymentRequestSchema);

module.exports = statePaymentRequest;
  
