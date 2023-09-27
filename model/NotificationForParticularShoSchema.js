const mongoose = require('mongoose');

const notificationForParticularShoSchema = new mongoose.Schema({

    stateHandlerId:{
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

const notificationForParticularSho = mongoose.model('notificationForParticularSho',notificationForParticularShoSchema);
module.exports = notificationForParticularSho