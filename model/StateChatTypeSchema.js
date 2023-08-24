const mongoose = require('mongoose');
const StateChatTypeSchema = new mongoose.Schema({

    stateHandlerId: {
        type: String
    },
    
})


const StateChatType = mongoose.model('StateChatType', StateChatTypeSchema);
module.exports = StateChatType