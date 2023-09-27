const mongoose = require('mongoose');

const notificationForParticularBusinessDevSchema = new mongoose.Schema({

    businessDeveloperId:{
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

const notificationForParticularBusinessDev = mongoose.model('notificationForParticularBusinessDev',notificationForParticularBusinessDevSchema);
module.exports = notificationForParticularBusinessDev