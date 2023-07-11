const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const memberSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,

    },
    phone: {
        type: Number,
        required: true,
    
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    aadhar: {
        type: String,
    },
    pan: {
        type: String,
    },
    Id_No:{
        type:String
    },
    memberid: {
        type: String
    },
    password: {
        type: String
    },
    otp: {
        type: Number
    },
    refferal_id:{
        type:String
    },
    // reffered_id:{
    //     type:String
    // },
    status:{
        type:Boolean,
        default:false
    },
    aadhar_front_side: {
        type: String
    },
    aadhar_back_side: {
        type: String
    },
    pan_card: {
        type: String
    },
    ID_Card:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    wallet:{
        type:Number,
        default:0
    },
    notification:{
        type:Number,
        default:0
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    userType:{
        type:String,
    }



})

// Hash your password using bcrypt

memberSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);

    }
})

// add documnet

// memberSchema.methods.add_document = async function (doc_type, front_side, back_side) {

//     try {
//         this.document = this.document.concat({ doc_type, front_side, back_side });
//         await this.save();
//         return this.document;
//     } catch (error) {
//         console.log(error);
//     }
// }


//Upload Profile Photo
// memberSchema.methods.add_profile_photo = async function (photo) {

//     try {
//         this.profilePhoto = this.profilePhoto.concat({photo});
//         await this.save();
//         return this.profilePhoto;
//     } catch (error) {
//         console.log(error);
//     }
// }



// generate token
memberSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        //this.tokens = this.tokens.concat({token:token})
        // await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}



const Member = mongoose.model('Member', memberSchema);
module.exports = Member