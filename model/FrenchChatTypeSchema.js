const mongoose = require('mongoose');
const FrenchChatTypeSchema = new mongoose.Schema({

    frenchiseId: {
        type: String
    },
    
})


const FrenchChatType = mongoose.model('FrenchChatType', FrenchChatTypeSchema);
module.exports = FrenchChatType