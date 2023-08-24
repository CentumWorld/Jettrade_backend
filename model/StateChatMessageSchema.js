const mongoose = require('mongoose');
const stateChatMessageSchema = new mongoose.Schema({

    room: String,
    author: String,
    message: String,
    time: String
})


const stateChatMessage = mongoose.model('stateChatMessage', stateChatMessageSchema);
module.exports = stateChatMessage