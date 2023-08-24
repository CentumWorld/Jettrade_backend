const mongoose = require('mongoose');
const BusinessDeveloperChatMessageSchema = new mongoose.Schema({

    room: String,
    author: String,
    message: String,
    time: String
})


const BusinessDeveloperChatMessage = mongoose.model('BusinessDeveloperChatMessage', BusinessDeveloperChatMessageSchema);
module.exports = BusinessDeveloperChatMessage