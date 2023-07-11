const mongoose = require('mongoose');

const notificationForAllSchema = new mongoose.Schema({

    message:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const notificationForAll = mongoose.model('notificationForAll',notificationForAllSchema);
module.exports = notificationForAll