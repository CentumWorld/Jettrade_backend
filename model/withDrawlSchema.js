const mongoose = require('mongoose')

const moneyWithdrawalTransactionSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    amountWithdrawn: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paymentBy: {
        type: String
    }, 
    isApproved: {
        type: Boolean, 
        default: false
    },
});

module.exports = mongoose.model('MoneyWithdrawalTransaction', moneyWithdrawalTransactionSchema);
