const Franchise = require("../model/frenchiseSchema");
const StateHandler = require("../model/stateHandlerSchema");


exports.getAllStates = async (req, res) => {
  try {
    const states = await StateHandler.find();
    if (!states) {
      return res.status(404).json({ message: "S.H.O not found" });
    }

    return res.status(200).json({ message: "Fetched all S.H.O", data: states });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//==============================================================
exports.getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();
    if (!franchises) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    return res
      .status(200)
      .json({ message: "Fetched all franchise", data: franchises });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
