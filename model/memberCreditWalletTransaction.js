const mongoose = require("mongoose");

const memberCreditWalletTransactionSchema = new mongoose.Schema({
  memberId: {
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

const memberCreditWalletTransaction = mongoose.model("memberCreditWalletTransaction", memberCreditWalletTransactionSchema);

module.exports = memberCreditWalletTransaction;
