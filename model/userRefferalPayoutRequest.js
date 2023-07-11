const mongoose = require('mongoose');

const userRefferalPayoutRequestSchema = new mongoose.Schema({

    userid:{
        type:String
    },
    walletAmount:{
        type:Number,
        default:0
    },
    requestDate:{
        type:Date
    }

})

const userRefferalPayoutRequest = mongoose.model('userRefferalPayoutRequest',userRefferalPayoutRequestSchema);
module.exports = userRefferalPayoutRequest