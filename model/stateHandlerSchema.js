const mongoose = require("mongoose");

const stateHandlerSchema = new mongoose.Schema({
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
  selectedState: {
    type: [String],
    required: true,
  },
  gender:{
    type: String,
    required: true

  },
  adharCard: {
    type: String,
  },
  panCard: {
    type: String,
  },
  stateHandlerWallet: {
    type: Number,
    default: 0,
  },
  stateHandlerId: {
    type: String, 
    required: true
  },
  referralId: {
    type: String,
    required: true
  }, 
  isBlocked: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },

}, {timestamps: true});

const stateHandler = mongoose.model("StateHandler", stateHandlerSchema);

module.exports = stateHandler;
