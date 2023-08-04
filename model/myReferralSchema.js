const mongoose = require("mongoose");
const myReferralSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  refferal_id: {
    type: String
  },
  userType: {
    type: String
  },
  referralAmount: {
    type: Number,
    default: 0,
  },
  joininigDate: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String
  },
  refferUserID: {
    type: String
  }
});

const myReferral = mongoose.model("myReferral", myReferralSchema);
module.exports = myReferral;
