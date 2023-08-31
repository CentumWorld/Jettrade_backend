const mongoose = require('mongoose');

const StateUpiHolderSchema = new mongoose.Schema({
  upiId: {
    type: String,
    required: true,
  },
});

const StateUpiHolder = mongoose.model('StateUpiHolder', StateUpiHolderSchema);

module.exports = StateUpiHolder;
