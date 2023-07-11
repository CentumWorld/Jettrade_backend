const mongoose = require('mongoose');

const userRefferalPayoutApproveWithdrawalSchema = new mongoose.Schema({

    userid:{
        type:String
    },
    walletAmount:{
        type:Number,
        default:0
    },
    requestDate:{
        type:Date
    },
    approveDate:{
        type:Date
    }

})

const userRefferalPayoutApproveWithdrawal = mongoose.model('userRefferalPayoutApproveWithdrawal',userRefferalPayoutApproveWithdrawalSchema);
module.exports = userRefferalPayoutApproveWithdrawal