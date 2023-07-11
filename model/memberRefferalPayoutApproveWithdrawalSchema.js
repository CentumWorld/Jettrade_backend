const mongoose = require('mongoose');

const memberRefferalPayoutApproveWithdrawalSchema = new mongoose.Schema({

    memberid:{
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

const memberRefferalPayoutApproveWithdrawal = mongoose.model('memberRefferalPayoutApproveWithdrawal',memberRefferalPayoutApproveWithdrawalSchema);
module.exports = memberRefferalPayoutApproveWithdrawal