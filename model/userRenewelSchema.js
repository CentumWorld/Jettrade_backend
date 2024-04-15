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
    },
    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true

    },
    phoneNumber: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: String, 
        required: true

    }

})

const userRenewal = mongoose.model('userRenewal',userRenewalSchema);
module.exports = userRenewal