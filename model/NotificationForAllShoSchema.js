const mongoose = require('mongoose');

const notificationForAllShoSchema = new mongoose.Schema({

    investerType:{
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

const notificationForAllSho = mongoose.model('notificationForAllSho',notificationForAllShoSchema);
module.exports = notificationForAllSho