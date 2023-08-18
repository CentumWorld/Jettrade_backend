const mongoose = require("mongoose");

const frenchiseCreditWalletTransactionSchema = new mongoose.Schema({
  frenchiseId: {
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

const frenchiseCreditWalletTransaction = mongoose.model("frenchiseCreditWalletTransaction", frenchiseCreditWalletTransactionSchema);

module.exports = frenchiseCreditWalletTransaction;
