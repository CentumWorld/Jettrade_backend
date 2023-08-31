const mongoose = require('mongoose')

const businessDeveloperPaymentRequestSchema = new mongoose.Schema({
    businessDeveloperId: {
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

const businessDeveloperPaymentRequest = mongoose.model("businessDeveloperPaymentRequest", businessDeveloperPaymentRequestSchema);

module.exports = businessDeveloperPaymentRequest;
