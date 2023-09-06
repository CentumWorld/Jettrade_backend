const SubAdmin = require("../model/subadminSchema");
const VideoCreater = require('../model/VideoCreaterSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.videoCreatorLogin = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { password, userId } = req.body;

    // Find the video creator by email
    const videoCreator = await VideoCreater.findOne({ subAdminId: userId });

    if (!videoCreator) {
      return res.status(404).json({ message: "Video creator not found" });
    }

    if (!videoCreator.isVideoCreator) {
      return res.status(403).json({ message: "Access denied" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      videoCreator.password
    );

    // If the password is not valid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { subAdminId: videoCreator._id, email: videoCreator.email },
      process.env.SECRET_KEY
    );

    res.status(200).json({ token: token, data: videoCreator });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
