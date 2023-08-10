const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  replies: [replySchema],
});

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoOne: { type: String, required: true },
  thumbnail: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
  views: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Video', videoSchema);
