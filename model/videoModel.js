const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoOne: { type: String, required: true },
  thumbnail: { type: String, required: true },

  
});

module.exports = mongoose.model('video', videoSchema)

