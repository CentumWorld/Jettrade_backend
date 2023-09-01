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
    ,
    paymentBy: {
      type: String,
      required: true
    }
});

const franchisePaymentRequest = mongoose.model("franchisePaymentRequest", franchisePaymentRequestSchema);

module.exports = franchisePaymentRequest;
