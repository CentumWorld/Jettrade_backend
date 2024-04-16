const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    text: {
        type: String
    },
    audio: {
        type: String
    },
    sendingTo: {
        type: String,
        enum: ["traders", "referrals", "franchises", "bmm", "all"]
    }

}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
