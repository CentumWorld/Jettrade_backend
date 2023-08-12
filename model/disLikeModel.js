const mongoose = require('mongoose');

const disLikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  disLikeType:{
    type:Boolean,
    default:false,
  }
});

const Disike = mongoose.model('Dislike', disLikeSchema);
module.exports = Disike
