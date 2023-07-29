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
    }
})


const allNewPaidUser = mongoose.model('allNewPaidUser', allNewPaidUserSchema);
module.exports = allNewPaidUser