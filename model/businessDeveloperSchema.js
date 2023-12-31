const mongoose = require("mongoose");

const businessDeveloperSchema = new mongoose.Schema(
  {
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
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    adhar_front_side: {
      type: String,
      required: true,
    },
    adhar_back_side: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      required: true,
    },
    businessDeveloperId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    referredId: {
      type: String,
      required: true,
      trim: true,
    },
    referralId: {
      type: String,
      required: true,
      unique: true,
    },
    buisnessCity: {
      type: String,
      required: true,
    },
    businessDeveloperWallet: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    paymentRequestCount: {
      type: Number,
      default: 0,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    verifyDate: {
      type: Date,
    },
    firstPayment: {
      type: Boolean,
      default: false
    }, 
    notification: {
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

const businessDeveloper = mongoose.model(
  "BusinessDeveloper",
  businessDeveloperSchema
);

module.exports = businessDeveloper;
