const mongoose = require('mongoose');

const notificationForParticularRefferalSchema = new mongoose.Schema({

    memberid:{
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

const notificationForParticularRefferal = mongoose.model('notificationForParticularRefferal',notificationForParticularRefferalSchema);
module.exports = notificationForParticularRefferal