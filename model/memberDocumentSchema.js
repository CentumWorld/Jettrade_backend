const mongoose = require('mongoose');
const memberDocumentSchema = new mongoose.Schema({

    memberid: {
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


const Memberdocument = mongoose.model('Memberdocument', memberDocumentSchema);
module.exports = Memberdocument