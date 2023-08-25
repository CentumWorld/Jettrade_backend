const BusinessDeveloper = require("../model/businessDeveloperSchema");
const Member = require("../model/memberSchema");
const User = require("../model/userSchema");
const Admin = require('../model/adminSchema');
const FrenchChatMessage = require('../model/FrenchChatMessageSchema');
const FrenchChatType = require('../model/FrenchChatTypeSchema');
const FrenchChatTypeWithSHO = require('../model/FrenchiseChatTypeWithSHOSchema');
const FrenchChatMessageWithSHO = require('../model/FrenchiseChatMessageWithSHOSchema');
const StateHandler = require('../model/stateHandlerSchema');
const Frenchise = require('../model/frenchiseSchema');
const Franchise = require("../model/frenchiseSchema")
const {
  isValidImage,
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidPassword,
} = require("../validation/validation");

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
      reffered_id: { $in: businessDeveloperReferralIds },
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
      reffered_id: { $in: businessDeveloperReferralIds },
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
      reffered_id: { $in: memberReferralIds },
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
exports.adminOnlineOrNotFrench = async (req, res) => {
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
exports.fetchChatMessage = async (req, res) => {
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
exports.fetchChatDetailsFrenchisee = async (req, res) => {
  const { frenchiseId } = req.body;
  let frenchChatDetails = await FrenchChatType.find({ frenchiseId: frenchiseId });
  if (frenchChatDetails) {
    return res.status(200).json({
      message: " French chat details fetched",
      frenchChatDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// fetchChatDetailsFrenchiseWithSHO
exports.fetchChatDetailsFrenchiseWithSHO = async (req, res) => {
  const { frenchiseId } = req.body;
  let frenchChatDetailsWithSHO = await FrenchChatTypeWithSHO.find({ frenchiseId: frenchiseId });
  if (frenchChatDetailsWithSHO) {
    return res.status(200).json({
      message: " French chat with SHO details fetched",
      frenchChatDetailsWithSHO,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// fetchChatWithSHOMessage
exports.fetchChatWithSHOMessage = async (req, res) => {
  const { room } = req.body;
  let frenchChatMessageWithSHO = await FrenchChatMessageWithSHO.find({ room: room });
  if (frenchChatMessageWithSHO) {
    return res.status(200).json({
      message: " French chat with SHO message fetched",
      frenchChatMessageWithSHO,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
}


exports.getOwnFranchiseDetails = async (req, res) => {
  try {
    const id = req.franchiseId;
    const franchise = await Franchise.findById(id);
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    res.status(200).json({ message: "Fetched franchise successfully", data: franchise });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//============================================================================

//==========================================================================

// SHOonlineOrNotFrench
exports.SHOonlineOrNotFrench = async (req, res) => {
  const { frenchiseId } = req.body;
  const findLoginFrenchise = await Frenchise.findOne({ frenchiseId: frenchiseId })


  if (findLoginFrenchise) {
    let LoginFrenchiseRefferedId = findLoginFrenchise.referredId
    console.log(LoginFrenchiseRefferedId)
    const findSHOfromFrenchise = await StateHandler.findOne({ referralId: LoginFrenchiseRefferedId })
    if (findSHOfromFrenchise) {
      const stateHandlerId = findSHOfromFrenchise.stateHandlerId
      const isSHOonline = findSHOfromFrenchise.isOnline

      return res.status(200).json({
        message: "SHO isOnline status fetched",
        stateHandlerId,
        isSHOonline
      })
    }
    else {
      return res.status(400).json({
        message: "Something went wrong"

      })
    }
  }
  else {
    return res.status(400).json({
      message: "No Data Found"
    })
  }
}

exports.updateOwnFranchiseDetails = async (req, res) => {
  try {
    const { fname, lname, email, phone, gender } = req.body;
    const franchiseId = req.franchiseId;
    // Validate input fields
    if (!fname || !lname || !email || !phone || !gender) {
      return res.status(422).json({ message: "All fields are required." });
    }
    if (fname  &&!isValidName(fname)) {
      return res.status(422).json({ message: "Invalid first name format." });
    }
    if (lname  &&!isValidName(lname)) {
      return res.status(422).json({ message: "Invalid last name format." });
    }
    // Validate email format
    if (email&&!isValidEmail(email)) {
      return res.status(422).json({ message: "Invalid email format." });
    }
    // Validate phone number format
    if (phone&&!isValidPhone(phone)) {
      return res.status(422).json({ message: "Invalid phone number format." });
    }
    const updatedFranchise = await Franchise.findOneAndUpdate(
      { _id: franchiseId },
      {
        fname,
        lname,
        email,
        phone,
        gender,
      },
      { new: true }
    );
    if (!updatedFranchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    res.status(200).json({
      message: "Franchise details updated successfully",
      franchise: updatedFranchise,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


