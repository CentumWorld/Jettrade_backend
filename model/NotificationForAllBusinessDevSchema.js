const mongoose = require('mongoose');

const notificationForAllBusinessDevSchema = new mongoose.Schema({

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

const notificationForAllBusinessDev = mongoose.model('notificationForAllBusinessDev',notificationForAllBusinessDevSchema);
module.exports = notificationForAllBusinessDev