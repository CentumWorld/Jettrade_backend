const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
        required: true
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
        type: String
    },
    
    pan: {
        type: String
    },

    Id_No:{
        type:String
    },
   
    userid: {
        type: String
    },
    password: {
        type: String
    },
    otp: {
        type: Number,
        default:0
    },
    refferal_id:{
        type:String
    },
    reffered_id:{
        type:String
    },
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
    paymentStatus:{
        type:Boolean,
        default:false
    },
    paymentCount:{
        type:Number,
        default:0
    },
    doj:{
        type:Date
    },
    wallet:{
        type:Number,
        default:0
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Number,
        default:0
    },
    userType:{
        type:String,
    },
    tradingWallet:{
        type:Number,
        default:0
    }
    
})

// Hash your password using bcrypt

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);

    }
})

// add documnet

// userSchema.methods.add_document = async function (doc_type, front_side, back_side) {

//     try {
//         this.document = this.document.concat({ doc_type, front_side, back_side });
//         await this.save();
//         return this.document;
//     } catch (error) {
//         console.log(error);
//     }
// }


//Upload Profile Photo
userSchema.methods.add_profile_photo = async function (photo) {

    try {
        this.profilePhoto = this.profilePhoto.concat({photo});
        await this.save();
        return this.profilePhoto;
    } catch (error) {
        console.log(error);
    }
}



// generate token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY,
            { expiresIn: '28800000' });
        //this.tokens = this.tokens.concat({token:token})
        // await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}



const User = mongoose.model('User', userSchema);
module.exports = User