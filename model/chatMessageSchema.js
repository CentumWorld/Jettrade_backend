const mongoose = require('mongoose');
const chatMessageSchema = new mongoose.Schema({

    room: String,
    author: String,
    message: String,
    time: String
})


const chatMessage = mongoose.model('chatMessage', chatMessageSchema);
module.exports = chatMessage