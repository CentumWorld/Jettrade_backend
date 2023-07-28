const mongoose = require('mongoose');

const userRenewalSchema = new mongoose.Schema({

    userid:{
        type:String
    },
    renewalAmount:{
        type:Number,
        default:0
    },
    renewalDate:{
        type:Date,
        default:Date.now
    }

})

const userRenewal = mongoose.model('userRenewal',userRenewalSchema);
module.exports = userRenewal