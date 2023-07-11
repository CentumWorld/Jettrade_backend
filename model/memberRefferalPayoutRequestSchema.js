const mongoose = require('mongoose');

const memberRefferalPayoutRequestSchema = new mongoose.Schema({

    memberid:{
        type:String
    },
    walletAmount:{
        type:Number,
        default:0
    },
    requestDate:{
        type: Date,
    },
    

})

const memberRefferalPayoutRequest = mongoose.model('memberRefferalPayoutRequest',memberRefferalPayoutRequestSchema);
module.exports = memberRefferalPayoutRequest