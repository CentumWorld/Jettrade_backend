const Frenchise = require("../model/frenchiseSchema");

exports.getFranchisesByReferralId = async (req, res) => {
  try {
    const stateReferralId = req.body.stateReferralId; // Accessing the property directly
    const frenchises = await Frenchise.find({ referredId: stateReferralId });

    if (!frenchises) {
      res.status(402).json({ message: "invalid id" });
    }
    
    res.status(200).json({ message: "find successfully frenchise", data: frenchises });
  } catch (error) {
    res.status(500).json({ message: "an error occurred", error: error.message });
  }
};
