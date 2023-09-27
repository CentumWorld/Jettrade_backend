const mongoose = require('mongoose');

const notificationForParticularFranchiseSchema = new mongoose.Schema({

    frenchiseId:{
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

const notificationForParticularFranchise = mongoose.model('notificationForParticularFranchise',notificationForParticularFranchiseSchema);
module.exports = notificationForParticularFranchise