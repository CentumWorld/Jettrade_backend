const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const StateHandler = require("../model/stateHandlerSchema");
const FrachiseHandler = require("../model/frenchiseSchema");
const MemberHandler = require("../model/memberSchema");
const TraderHandler =  require("../model/userSchema")
const { isValidPassword } = require("../validation/validation");

exports.allPasswordChange = async (req, res) => {
  const { oldpassword, newpassword, usertype, id } = req.body;
  console.log(oldpassword, newpassword, usertype, id);
  if (usertype === "BMM") {
    try {
      if (!oldpassword || !newpassword) {
        res.status(422).json({
          message: "Please fill your password",
        });
      }
      if (!isValidPassword(newpassword)) {
        return res.status(400).json({
          message:
            "New password must at least one digit, one lowercase letter, one uppercase letter, and be 8 to 15 characters long.",
        });
      }
      const existdetails = await StateHandler.findOne({ stateHandlerId: id });
      console.log(existdetails);
      const isPasswordMatch = await bcrypt.compare(
        oldpassword,
        existdetails.password
      );

      if (!isPasswordMatch) {
        return res.status(422).json({
          message: "Old password does not match",
        });
      }

      const hashedNewPassword = await bcrypt.hash(newpassword, 10);
      existdetails.password = hashedNewPassword;
      await existdetails.save();

      res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  } else if (usertype === "FRANCHISE") {
    try {
      if (!oldpassword || !newpassword) {
        res.status(422).json({
          message: "Please fill your password",
        });
      }
      if (!isValidPassword(newpassword)) {
        return res.status(400).json({
          message:
            "New password must at least one digit, one lowercase letter, one uppercase letter, and be 8 to 15 characters long.",
        });
      }
      const existdetails = await FrachiseHandler.findOne({ frenchiseId: id });
      console.log(existdetails);
      const isPasswordMatch = await bcrypt.compare(
        oldpassword,
        existdetails.password
      );

      if (!isPasswordMatch) {
        return res.status(422).json({
          message: "Old password does not match",
        });
      }

      const hashedNewPassword = await bcrypt.hash(newpassword, 10);
      existdetails.password = hashedNewPassword;
      await existdetails.save();

      res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  } else if (usertype === "REFERRAL") {
    try {
      console.log('Before finding member');
      if (!oldpassword || !newpassword) {
        return res.status(422).json({
          message: "Please fill in your password",
        });
      }

      if (!isValidPassword(newpassword)) {
        return res.status(400).json({
          message:
            "New password must have at least one digit, one lowercase letter, one uppercase letter, and be 8 to 15 characters long.",
        });
      }

      const existdetails = await MemberHandler.findOne({ memberid: id });
      console.log('After finding member:', existdetails);
      if (!existdetails) {
        return res.status(404).json({
          message: "Member not found",
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        oldpassword,
        existdetails.password
      );

      if (!isPasswordMatch) {
        return res.status(404).json({
          message: "Old password does not match",
        });
      }

      existdetails.password = newpassword;
      await existdetails.save();

      res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error",
      });
    }
  } else if (usertype === "TRADER") {
    try {
      if (!oldpassword || !newpassword) {
        return res.status(422).json({
          message: "Please fill in your password",
        });
      }

      if (!isValidPassword(newpassword)) {
        return res.status(400).json({
          message:
            "New password must have at least one digit, one lowercase letter, one uppercase letter, and be 8 to 15 characters long.",
        });
      }

      const existdetails = await TraderHandler.findOne({ userid: id });
      if (!existdetails) {
        return res.status(404).json({
          message: "Member not found",
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        oldpassword,
        existdetails.password
      );

      if (!isPasswordMatch) {
        return res.status(404).json({
          message: "Old password does not match",
        });
      }

      existdetails.password = newpassword;
      await existdetails.save();

      res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error",
      });
    }
  }
};
