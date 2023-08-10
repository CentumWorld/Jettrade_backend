
const mongoose = require("mongoose");

const guestChatMessageSchema = new mongoose.Schema({
  author: {
    type: String,
    default: "Guest",
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const guestChatMessage = mongoose.model("GuestChatMessage", guestChatMessageSchema);
module.exports = guestChatMessage
