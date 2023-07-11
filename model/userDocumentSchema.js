const mongoose = require('mongoose');
const userDocumentSchema = new mongoose.Schema({

    userid: {
        type: String
    },
    aadhar_front_side: {
        type: String
    },
    aadhar_back_side: {
        type: String
    },
    pan_card: {
        type: String
    }
})


const Userdocument = mongoose.model('Userdocument', userDocumentSchema);
module.exports = Userdocument