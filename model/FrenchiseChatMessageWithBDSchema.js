const mongoose = require('mongoose');
const FrenchiseChatMessageWithBDSchema = new mongoose.Schema({

    room: String,
    author: String,
    message: String,
    time: String,
})


const FrenchiseChatMessageWithBD = mongoose.model('FrenchiseChatMessageWithBD', FrenchiseChatMessageWithBDSchema);
module.exports = FrenchiseChatMessageWithBD