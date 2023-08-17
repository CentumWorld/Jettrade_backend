const mongoose = require("mongoose");

const businessDeveloperCreditWalletTransactionSchema = new mongoose.Schema({
  businessDeveloperId: {
    type: String,
    required: true,
  },
  creditAmount: {
    type:Number,
    default:0
  },
  Type:{
    type:String
  },
  refferUserId:{
    type:String
  },
  Date:{
    type :Date ,
    default:Date.now
  }
})

const businessDeveloperCreditWalletTransaction = mongoose.model("businessDeveloperCreditWalletTransaction", businessDeveloperCreditWalletTransactionSchema);

module.exports = businessDeveloperCreditWalletTransaction;
