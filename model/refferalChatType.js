const mongoose = require('mongoose');
const refferalChatTypeSchema = new mongoose.Schema({

    memberid: {
        type: String
    },
    
})


const RefferalChatType = mongoose.model('RefferalChatType', refferalChatTypeSchema);
module.exports = RefferalChatType