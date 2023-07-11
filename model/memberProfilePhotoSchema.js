const mongoose = require('mongoose');
const memberProfilePhotoSchema = new mongoose.Schema({

    memberid:String,
    imageUrl:String
})

const MemberProfilePhoto = mongoose.model('MemberProfilePhoto', memberProfilePhotoSchema);
module.exports = MemberProfilePhoto