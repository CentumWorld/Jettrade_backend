const BusinessDeveloper = require("../model/businessDeveloperSchema");
const Member = require("../model/memberSchema");
const User = require("../model/userSchema")

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
//============================================================================

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