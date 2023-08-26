const mongoose = require('mongoose');
const FrenchChatTypeWithBDSchema = new mongoose.Schema({

    businessDeveloperId: {
        type: String
    },
    refferedId:{
        type:String
    }
    
})


const FrenchChatTypeWithBD = mongoose.model('FrenchChatTypeWithBD', FrenchChatTypeWithBDSchema);
module.exports = FrenchChatTypeWithBD