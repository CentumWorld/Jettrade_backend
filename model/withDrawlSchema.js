const mongoose = require('mongoose')

const moneyWithdrawalTransactionSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    amountWithdrawn: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MoneyWithdrawalTransaction', moneyWithdrawalTransactionSchema);
