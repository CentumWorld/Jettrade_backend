const mongoose = require('mongoose')

const franchisePaymentRequestSchema = new mongoose.Schema({
    franchiseId: {
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

const franchisePaymentRequest = mongoose.model("franchisePaymentRequest", franchisePaymentRequestSchema);

module.exports = franchisePaymentRequest;
