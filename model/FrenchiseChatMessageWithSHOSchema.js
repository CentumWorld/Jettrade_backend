const mongoose = require('mongoose');
const FrenchiseChatMessageWithSHOSchema = new mongoose.Schema({

    room: String,
    author: String,
    message: String,
    time: String,
    referredId:String
})


const FrenchiseChatMessageWithSHO = mongoose.model('FrenchiseChatMessageWithSHO', FrenchiseChatMessageWithSHOSchema);
module.exports = FrenchiseChatMessageWithSHO