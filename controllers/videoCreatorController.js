const SubAdmin = require("../model/subadminSchema");
const VideoCreater = require('../model/VideoCreaterSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.videoCreatorLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res
        .status(422)
        .json({ message: "Please fill credentials to login" });
    }
    const videoCreaterLogin = await VideoCreater.findOne({ userId: userId });

    //console.log(adminLogin);
    if (!videoCreaterLogin) {
      res.status(404).json({ message: "Invalid Credentials" });
    } else {
      if (password === videoCreaterLogin.password) {
        const token = jwt.sign(
          { userId: videoCreaterLogin._id },
          process.env.SECRET_KEY,
          { expiresIn: "8h" }
        );
        const userId = videoCreaterLogin.userId;
        res.status(201).json({
          message: "Admin Login Successfully",
          token: token,
          userId,
          expires: new Date().getTime() + 60000,
        });
      } else {
        return res.status(404).json({ error: "Invalid Credentials" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
