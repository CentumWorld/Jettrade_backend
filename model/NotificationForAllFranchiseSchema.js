const mongoose = require('mongoose');

const notificationForAllFranchiseSchema = new mongoose.Schema({

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

const notificationForAllFranchise = mongoose.model('notificationForAllFranchise',notificationForAllFranchiseSchema);
module.exports = notificationForAllFranchise