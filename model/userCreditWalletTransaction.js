const mongoose = require("mongoose");

const userCreditWalletTransactionSchema = new mongoose.Schema({
  userId: {
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

const userCreditWalletTransaction = mongoose.model("userCreditWalletTransaction", userCreditWalletTransactionSchema);

module.exports = userCreditWalletTransaction;
