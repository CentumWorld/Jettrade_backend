const mongoose = require('mongoose');
const FrenchChatTypeWithSHOSchema = new mongoose.Schema({

    frenchiseId: {
        type: String
    },
    refferedId:{
        type:String
    }
    
})


const FrenchChatTypeWithSHO = mongoose.model('FrenchChatTypeWithSHO', FrenchChatTypeWithSHOSchema);
module.exports = FrenchChatTypeWithSHO