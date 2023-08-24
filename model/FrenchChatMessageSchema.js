const mongoose = require('mongoose');
const frenchChatMessageSchema = new mongoose.Schema({

    room: String,
    author: String,
    message: String,
    time: String
})


const frenchChatMessage = mongoose.model('frenchChatMessage', frenchChatMessageSchema);
module.exports = frenchChatMessage