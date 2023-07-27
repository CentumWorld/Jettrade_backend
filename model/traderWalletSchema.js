const mongoose = require('mongoose');
const traderWalletSchema = new mongoose.Schema({

    userid: {
        type: String
    },
    walletAmount:{
        type:Number,
        default:0
    },
    amountAddingDate:{
        type : Date,
        default: Date.now
    }
    
})


const TraderWallet = mongoose.model('TraderWallet', traderWalletSchema);
module.exports = TraderWallet