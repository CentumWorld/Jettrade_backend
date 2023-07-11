// const mongoose = require('mongoose');

// module.exports = mongoose.model('profilePhoto',{
//     userid:String,
//     imageUrl:String
// });


const mongoose = require('mongoose');
const profilePhotoSchema = new mongoose.Schema({

    userid:String,
    imageUrl:String
})

const ProfilePhoto = mongoose.model('ProfilePhoto', profilePhotoSchema);
module.exports = ProfilePhoto