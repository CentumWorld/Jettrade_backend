const mongoose = require('mongoose');
const chatTypeSchema = new mongoose.Schema({

    userid: {
        type: String
    },
    
})


const ChatType = mongoose.model('ChatType', chatTypeSchema);
module.exports = ChatType