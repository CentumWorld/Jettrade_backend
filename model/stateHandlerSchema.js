const mongoose = require("mongoose");

const stateHandlerSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    selectedState: {
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

    stateHandlerId: {
      type: String,
      required: true,
      unique: true,
    },
    referralId: {
      type: String,
      required: true,
      unique: true,
    },
    stateHandlerWallet: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const stateHandler = mongoose.model("StateHandler", stateHandlerSchema);

module.exports = stateHandler;
