
const mongoose = require('mongoose');
const profilePhotoSchema = new mongoose.Schema({

    userid:String,
    imageUrl:String
})

const ProfilePhoto = mongoose.model('ProfilePhoto', profilePhotoSchema);
module.exports = ProfilePhoto