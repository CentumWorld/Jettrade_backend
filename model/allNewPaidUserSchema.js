const mongoose = require('mongoose');
const allNewPaidUserSchema = new mongoose.Schema({

    userid:{
        type:String
    },
    activationAmount:{
        type:Number,
        default:0
    },
    activationDate:{
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

    },
    paymentCount: {
        type: Number,
        required: true
    }
})


const allNewPaidUser = mongoose.model('allNewPaidUser', allNewPaidUserSchema);
module.exports = allNewPaidUser