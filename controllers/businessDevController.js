const Member = require("../model/memberSchema");
const User = require("../model/userSchema");

//============================================================================
//all members fetch by business developer's referral id
exports.getAllMembersInBusinessDeveloper = async (req, res) => {
  try {
    const { businessDevRefferalId } = req.body;
    const members = await Member.find({ reffered_id: businessDevRefferalId });

    if (members.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found for the given referral ID" });
    }
    res
      .status(200)
      .json({ message: "Fetched succssfully all members", members });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//============================================================================
//all users fetch by business developer's referral id
exports.getAllUsersInBusinessDeveloper = async (req, res) => {
  try {
    const { businessDevRefferalId } = req.body;
    const members = await Member.find({ reffered_id: businessDevRefferalId });

    if (members.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found for the given referral ID" });
    }

    const membersReferralId = members.map((user) => user.refferal_id);

    const users = await User.find({ reffered_id:{ $in:membersReferralId }});
    res
      .status(200)
      .json({ message: "Fetched succssfully all members", users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//============================================================================

//block member

exports.blockMemberByBusinessDeveloper = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findById(id);

    if (!member) {
      return res
        .status(404)
        .json({ message: "Member not found for the given ID" });
    }

    if (member.isBlocked) {
      return res.status(400).json({ message: "Member is already blocked" });
    }

    const blockedMember = await Member.findByIdAndUpdate(
      { _id: id },
      { $set: { isBlocked: true } }
    );

    return res.status(200).json({ message: "Member blocked successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get one member by id
exports.getOneMemberByIdByBusinessDeveloper = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!member) {
      return res
        .status(404)
        .json({ message: "Member not found for the given ID" });
    }

    return res
      .status(200)
      .json({ message: "Fetched member successfully", data: member });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteMemberByBusinessDeveloper = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findById(id);

    if (!member) {
      return res
        .status(404)
        .json({ message: "Member not found for the given ID" });
    }

    if (member.isDeleted) {
      return res.status(400).json({ message: "Member is already deleted" });
    }

    const deletedMember = await Member.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } }
    );

    return res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
