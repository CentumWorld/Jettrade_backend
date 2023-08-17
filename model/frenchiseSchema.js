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
    adharCard: {
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
      required: true,
      unique: true,
    },
    frenchiseWallet:{
      type:Number,
      default:0
    },
    franchiseCity:{
      type :[String],
      required:true
    },
    franchiseState:{
      type:String ,
      required:true
    },

  },
  { timestamps: true }
);

const frenchise = mongoose.model("Frenchise", frenchiseSchema);

module.exports = frenchise;
