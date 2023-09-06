const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const VideoCreaterSchema = new mongoose.Schema({
    userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
//   referralId:{
//     type: String
//   },
//   adminWallet: {
//     type: Number,
//   }
});

VideoCreaterSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    // await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const VideoCreater = mongoose.model("VideoCreater", VideoCreaterSchema);
module.exports = VideoCreater;
