const mongoose = require('mongoose');
const BusinessDeveloperChatTypeSchema = new mongoose.Schema({

    businessDeveloperId: {
        type: String
    },
    
})


const BusinessDeveloperChatType = mongoose.model('BusinessDeveloperChatType', BusinessDeveloperChatTypeSchema);
module.exports = BusinessDeveloperChatType