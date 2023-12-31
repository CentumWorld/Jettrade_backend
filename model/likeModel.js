const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  likeType:{
    type:Boolean,
    default:false,
  }
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like
