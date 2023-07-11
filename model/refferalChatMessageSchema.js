const mongoose = require('mongoose');
const refferalChatMessageSchema = new mongoose.Schema({

    room: String,
    author: String,
    message: String,
    time: String
})


const refferalChatMessage = mongoose.model('refferalChatMessage', refferalChatMessageSchema);
module.exports = refferalChatMessage