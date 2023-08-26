const mongoose = require("mongoose");

const adminCreditWalletTransactionSchema = new mongoose.Schema({
    admin_id: {
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

const adminCreditWalletTransaction = mongoose.model("AdminCreditWalletTransactionS", adminCreditWalletTransactionSchema);

module.exports = adminCreditWalletTransaction;
