const BusinessDeveloper = require("../model/businessDeveloperSchema");
const Member = require("../model/memberSchema");
const User = require("../model/userSchema");
const Admin = require('../model/adminSchema');
const FrenchChatMessage = require('../model/FrenchChatMessageSchema');
const FrenchChatType = require('../model/FrenchChatTypeSchema');

exports.getBusinessDevelopersInFranchise = async (req, res) => {
  try {
    const { franchiseReferralId } = req.body;
    const businessDevelopers = await BusinessDeveloper.find({
      referredId: franchiseReferralId,
    });
    if (businessDevelopers.length === 0) {
      return res.status(404).json({
        message: "No business developer found in the given franchise",
      });
    }
    res.status(200).json({
      message: "Fetched successfully all Business Developers in the franchise",
      data: businessDevelopers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMembersInFranchise = async (req, res) => {
  try {
    const { franchiseReferralId } = req.body;
    const businessDevelopers = await BusinessDeveloper.find({
      referredId: franchiseReferralId,
    });
    if (businessDevelopers.length === 0) {
      return res.status(404).json({
        message: "No business developer found in the given franchise",
      });
    }
    const businessDeveloperReferralIds = businessDevelopers.map(
        (businessDeveloper) => businessDeveloper.referralId
      );
    const members = await Member.find({
        reffered_id: {$in:businessDeveloperReferralIds},
    });
    res.status(200).json({
      message: "Fetched successfully all members in the franchise",
      data: members,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//======================================================================

exports.getUsersInFranchise = async (req, res) => {
  try {
    const { franchiseReferralId } = req.body;
    const businessDevelopers = await BusinessDeveloper.find({
      referredId: franchiseReferralId,
    });
    if (businessDevelopers.length === 0) {
      return res.status(404).json({
        message: "No business developer found in the given franchise",
      });
    }
    const businessDeveloperReferralIds = businessDevelopers.map(
        (businessDeveloper) => businessDeveloper.referralId
      );
    const members = await Member.find({
        reffered_id: {$in: businessDeveloperReferralIds},
    });
    if (members.length === 0) {
      return res.status(404).json({
        message: "No member found in the given franchise",
      });
    }
    const memberReferralIds = members.map(
      (member) => member.refferal_id
    );
    const users = await User.find({
      reffered_id: {$in: memberReferralIds},
  });
 if (users.length === 0) {
    return res.status(404).json({
      message: "No user found in the given franchise",
    });
  }
    res.status(200).json({
      message: "Fetched successfully all users in the franchise",
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// adminOnlineOrNot
exports.adminOnlineOrNotFrench = async (req,res) => {
  let adminOnline = await Admin.find();
  // console.log(adminOnline[0].isOnline,'964');
  if (adminOnline) {
    const isOnline = adminOnline[0].isOnline;
    return res.status(200).json({
      message: "Admin Online status fetched",
      isOnline,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// fetchChatMessageState
exports.fetchChatMessage = async (req,res) => {
  const { room } = req.body;
  let frenchChatMessage = await FrenchChatMessage.find({ room: room });
  if (frenchChatMessage) {
    return res.status(200).json({
      message: " French chat message fetched",
      frenchChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// fetchChatDetailsState
exports.fetchChatDetailsFrenchisee = async (req,res) => {
  const {frenchiseId} = req.body;
  let frenchChatDetails = await FrenchChatType.find({ frenchiseId: frenchiseId});
  if (frenchChatDetails) {
    return res.status(200).json({
      message: " French chat details fetched",
      frenchChatDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
}


