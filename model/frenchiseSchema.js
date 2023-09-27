const { DataExchange } = require("aws-sdk");
const mongoose = require("mongoose");

const frenchiseSchema = new mongoose.Schema(
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
    frenchiseId: {
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
    },
    frenchiseWallet: {
      type: Number,
      default: 0,
    },
    franchiseCity: {
      type: [String],
      required: true,
    },
    franchiseState: {
      type: String,
    },

    adharCard: {
      type: String,
    },
    panCard: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean, 
      default: false,
    },  
    isOnline: {
      type: Boolean,
      default: false,
    },
    paymentRequestCount: {
      type: Number,
      default:0
    },
    isVerify: {
      type: Boolean, 
      default: false
    },

    firstPayment: {
      type: Boolean,
      default: false
    }, 
    verifyDate: {
      type: Date
    },
    loginOtp:{
      type:Number
    },
    notification: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const frenchise = mongoose.model("Frenchise", frenchiseSchema);

module.exports = frenchise;
