const mongoose = require("mongoose")
const portfolioVideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoOne: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },{timestamps: true});
  
  module.exports = mongoose.model('PortfolioVideo', portfolioVideoSchema);