const mongoose = require('mongoose');

const UpiHolderSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  upiId: {
    type: String,
    required: true,
  },
});

const UpiHolder = mongoose.model('UpiHolder', UpiHolderSchema);

module.exports = UpiHolder;
