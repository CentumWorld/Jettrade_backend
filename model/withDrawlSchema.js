const mongoose = require('mongoose')

const moneyWithdrawalTransactionSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    amountWithdrawn: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paymentBy: {
        type: String
    }
});

module.exports = mongoose.model('MoneyWithdrawalTransaction', moneyWithdrawalTransactionSchema);
