const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const subadminSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  aadhar: {
    type: String,
  },

  pan: {
    type: String,
  },

  subAdminId: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  otp: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
  aadhar_front_side: {
    type: String,
  },
  aadhar_back_side: {
    type: String,
  },
  pan_card: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },

  doj: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Number,
    default: 0,
  },
  isSubAdmin: {
    type: Boolean,
    default: true,
  },
  isVideoCreator: {
    type: Boolean,
    default: false,
  },
});

// Hash your password using bcrypt

subadminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

//Upload Profile Photo
subadminSchema.methods.add_profile_photo = async function (photo) {
  try {
    this.profilePhoto = this.profilePhoto.concat({ photo });
    await this.save();
    return this.profilePhoto;
  } catch (error) {
    console.log(error);
  }
};

// generate token
subadminSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: "28800000",
    });
    //this.tokens = this.tokens.concat({token:token})
    // await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const subAdmin = mongoose.model("subAdmin", subadminSchema);
module.exports = subAdmin;
