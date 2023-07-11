const mongoose = require('mongoose');

const notificationForParticularTraderSchema = new mongoose.Schema({

    userid:{
        type:String
    },
    message:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const notificationForParticularTrader = mongoose.model('notificationForParticularTrader',notificationForParticularTraderSchema);
module.exports = notificationForParticularTrader