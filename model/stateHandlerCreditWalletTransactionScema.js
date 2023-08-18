const mongoose = require("mongoose");

const statehandlerCreditWalletTransactionSchema = new mongoose.Schema({
  stateHandlerId: {
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

const stateHandlerCreditWalletTransaction = mongoose.model("stateHandlerCreditWalletTransaction", statehandlerCreditWalletTransactionSchema);

module.exports = stateHandlerCreditWalletTransaction;
