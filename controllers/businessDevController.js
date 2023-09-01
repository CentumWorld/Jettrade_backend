const Member = require("../model/memberSchema");
const User = require("../model/userSchema");
const BusinessDeveloperChatType = require("../model/BusinessDeveloperChatTypeSchema");
const BusinessDeveloperChatMessage = require("../model/BusinessDeveloperChatMessageSchema");
const Admin = require("../model/adminSchema");
const BusinessDeveloper = require("../model/businessDeveloperSchema");
const FrenchChatTypeWithBD = require("../model/FrenchChatTypeWithBDSchema");
const FrenchiseChatMessageWithBD = require("../model/FrenchiseChatMessageWithBDSchema");
const Frenchise = require("../model/frenchiseSchema");
const {
  isValidImage,
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidPassword,
} = require("../validation/validation");
const BusinessDeveloperCreditWalletTransactionSchema = require("../model/businessDeveloperCreditWalletTransaction");
const myReferral = require("../model/myReferralSchema");
const BusinessDeveloperPaymentRequest = require("../model/businessDeveloperPaymentRequestSchema");
const BankAccountHolder = require("../model/BankAccountHolderSchema");
const UpiHolder = require("../model/UpiHolderSchema");
const MemberCreditWalletTransaction = require('../model/memberCreditWalletTransaction')

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

    const users = await User.find({ reffered_id: { $in: membersReferralId } });
    res.status(200).json({ message: "Fetched succssfully all users", users });
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

// fetchChatDetailsBusiness
exports.fetchChatDetailsBusiness = async (req, res) => {
  const { businessDeveloperId } = req.body;
  let businessChatDetails = await BusinessDeveloperChatType.find({
    businessDeveloperId: businessDeveloperId,
  });
  if (businessChatDetails) {
    return res.status(200).json({
      message: "Business chat details fetched",
      businessChatDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchChatMessageBusiness
exports.fetchChatMessageBusiness = async (req, res) => {
  const { room } = req.body;
  let businessChatMessage = await BusinessDeveloperChatMessage.find({
    room: room,
  });
  if (businessChatMessage) {
    return res.status(200).json({
      message: " Business chat message fetched",
      businessChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// adminOnlineOrNotBusiness
exports.adminOnlineOrNotBusiness = async (req, res) => {
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
};

//=========================================================================

exports.updateOwnBusinessDeveloperDetails = async (req, res) => {
  try {
    const { fname, lname, email, phone, gender } = req.body;
    const id = req.businessDeveloperId;

    if (!fname || !lname || !email || !phone || !gender) {
      return res.status(422).json({ message: "All fields are required." });
    }

    if (!isValidName(fname)) {
      return res.status(422).json({ message: "Invalid first name format." });
    }
    if (!isValidName(lname)) {
      return res.status(422).json({ message: "Invalid last name format." });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(422).json({ message: "Invalid email format." });
    }

    // Validate phone number format
    if (!isValidPhone(phone)) {
      return res.status(422).json({ message: "Invalid phone number format." });
    }

    const updatedBD = await BusinessDeveloper.findOneAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        phone,
        gender,
      },
      { new: true }
    );

    if (!updatedBD) {
      return res.status(404).json({ message: "Business Developer not found" });
    }

    res.status(200).json({
      message: "Business developer details updated successfully",
      state: updatedBD,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//==================================================================
exports.getOwnBusinessDeveloperDetails = async (req, res) => {
  try {
    const id = req.businessDeveloperId;
    const businessDeveloper = await BusinessDeveloper.findById(id);

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business Developer not found" });
    }

    return res.status(200).json({
      messgae: "Fetched Business Developer details successfully",
      data: businessDeveloper,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// businessDFetchChatDetailsWithFrench
exports.businessDFetchChatDetailsWithFrench = async (req, res) => {
  const { businessDeveloperId } = req.body;
  let businessChatDetails = await FrenchChatTypeWithBD.find({
    businessDeveloperId: businessDeveloperId,
  });
  if (businessChatDetails) {
    return res.status(200).json({
      message: "Business chat details fetched",
      businessChatDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// businessDFetchChatMessageWithFrench
exports.businessDFetchChatMessageWithFrench = async (req, res) => {
  const { room } = req.body;
  let businessChatMessageWithFrench = await FrenchiseChatMessageWithBD.find({
    room: room,
  });
  if (businessChatMessageWithFrench) {
    return res.status(200).json({
      message: " Business chat message with french fetched",
      businessChatMessageWithFrench,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// frenchiseOnlineOrNotForBusiness
exports.frenchiseOnlineOrNotForBusiness = async (req, res) => {
  const { businessDeveloperId } = req.body;
  const findLoginBusinessD = await BusinessDeveloper.findOne({
    businessDeveloperId: businessDeveloperId,
  });

  if (findLoginBusinessD) {
    let LoginBusinessRefferedId = findLoginBusinessD.referredId;
    console.log(LoginBusinessRefferedId, "300");
    const findFrenchisefromBusinessD = await Frenchise.findOne({
      referralId: LoginBusinessRefferedId,
    });
    // console.log(findFrenchisefromBusinessD,'302')
    if (findFrenchisefromBusinessD) {
      const frenchiseId = findFrenchisefromBusinessD.frenchiseId;
      const isFrenchiseOnline = findFrenchisefromBusinessD.isOnline;

      return res.status(200).json({
        message: "Frenchise isOnline status fetched",
        frenchiseId,
        isFrenchiseOnline,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong1",
      });
    }
  } else {
    return res.status(400).json({
      message: "No Data Found",
    });
  }
};

//===================================================================

exports.getOwnBusinessDeveloperWalletTransactionDetails = async (req, res) => {
  try {
    const { businessDeveloperId } = req.body;

    const data = await BusinessDeveloperCreditWalletTransactionSchema.find({
      businessDeveloperId: businessDeveloperId,
    });

    if (!data) {
      return res.status(404).json({
        message: "Business developer Credit Wallet Transaction not found",
      });
    }

    return res.status(200).json({
      message: "fetched Business Developer Credit Wallet Transaction details",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//==================================================================
exports.getOwnMembersInsideBusinessDeveloperCreditWalletTransactionDetails =
  async (req, res) => {
    try {
      const { businessDeveloperId } = req.body;

      // Fetch member IDs referred by the Business Developer
      const businessDeveloper = await BusinessDeveloper.findOne({
        businessDeveloperId: businessDeveloperId,
      });

      // Fetch members based on the referred member IDs
      const referredMembers = await Member.find({
        referredId: businessDeveloper.referralId,
      });

      const referredMemberIds = referredMembers.map(
        (member) => member.memberid
      );

      const memberTransactions = await MemberCreditWalletTransaction.find({
        userid: { $in: referredMemberIds },
      });

      return res.status(200).json({
        message:
          "Fetched Members credit wallet transaction details by Business Developer",
        memberTransactions,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

//=====================================================================

exports.getOwnTradersInsideBusinessDeveloperCreditWalletTransactionDetails =
  async (req, res) => {
    try {
      const { businessDeveloperId } = req.body;

      // Validate businessDeveloperId
      if (!businessDeveloperId) {
        return res
          .status(400)
          .json({ message: "Business Developer ID is required" });
      }

      // Fetch business developer based on the given ID
      const businessDeveloper = await BusinessDeveloper.findOne({
        businessDeveloperId: businessDeveloperId,
      });

      // Check if the business developer exists
      if (!businessDeveloper) {
        return res
          .status(404)
          .json({ message: "Business Developer not found" });
      }

      // Fetch members based on the referred member IDs
      const referredMembers = await Member.find({
        referredId: businessDeveloper.referralId,
      });

      // Check if any members were referred by this business developer
      if (referredMembers.length === 0) {
        return res
          .status(404)
          .json({ message: "No members referred by this Business Developer" });
      }

      const userReferredIds = referredMembers.map(
        (member) => member.refferal_id
      );

      // Fetch traders based on the referred member IDs
      const traders = await User.find({
        reffered_id: { $in: userReferredIds },
      });

      // Check if any traders were referred by the members of this Business Developer
      if (traders.length === 0) {
        return res.status(404).json({
          message:
            "No traders referred by the Members of this Business Developer",
        });
      }

      const referredTraderIds = traders.map((trader) => trader.userid);

      // Fetch trader credit wallet transactions based on trader IDs
      const traderTransactions = await myReferral.find({
        userid: { $in: referredTraderIds },
      });

      return res.status(200).json({
        message:
          "Fetched Traders credit wallet transaction details by Business Developer",
        traderTransactions,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

exports.createBusinessDeveloperPaymentRequest = async (req, res) => {
  try {
    const { businessDeveloperId, amount } = req.body;

    if (!businessDeveloperId || !amount) {
      return res
        .status(400)
        .json({ error: "Business developer ID and amount are required." });
    }

    const businessDeveloper = await BusinessDeveloper.findOne({
      businessDeveloperId: businessDeveloperId,
    });

    console.log(businessDeveloper, "business developer detai;s");

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }
    if (amount < 500) {
      return res
        .status(400)
        .json({ message: "Minimum request amount should be 500" });
    }

    if (businessDeveloper.businessDeveloperWallet < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    await BusinessDeveloper.updateOne(
      {
        businessDeveloperId: businessDeveloper.businessDeveloperId,
      },
      {
        $inc: {
          businessDeveloperWallet: -amount,
        },
      }
    );

    const newData = {
      businessDeveloperId,
      amount,
    };

    const savedPaymentRequest = await BusinessDeveloperPaymentRequest.create(
      newData
    );

    res.status(201).json({
      message: "Business developer payment request created successfully.",
      savedPaymentRequest,
    });
  } catch (error) {
    console.error(
      "Error creating business developer payment request:",
      error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createBusinessDeveloperBankAccountHolder = async (req, res) => {
  try {
    const {
      userId,
      accountHolderName,
      accountNumber,
      bankName,
      branchName,
      ifscCode,
    } = req.body;
    if (
      !accountHolderName ||
      !accountNumber ||
      !bankName ||
      !branchName ||
      !ifscCode
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const businessDeveloper = await BusinessDeveloper.findOne({ businessDeveloperId: userId });

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    const newAccountHolder = new BankAccountHolder({
      accountHolderName,
      accountNumber,
      bankName,
      branchName,
      ifscCode,
      userId,
    });
    const savedAccountHolder = await newAccountHolder.save();

    res.status(201).json({
      message: "Business developer account holder created successfully",
      accountHolder: savedAccountHolder,
    });
  } catch (error) {
    console.error("Error creating account holder:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=================================================================

exports.createBusinessDeveloperUpiHolder = async (req, res) => {
  try {
    const { upiId, userId } = req.body;
    if (!upiId ) {
      return res
        .status(400)
        .json({ message: "UpiId is required" });
    }
    const businessDeveloper = await BusinessDeveloper.findOne({ businessDeveloperId: userId });

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    const newUpi = new UpiHolder({
      upiId,
      userId,
    });

    const savedUpi = await newUpi.save();
    res
      .status(201)
      .json({ message: "Business developer upi created successfully", savedUpi });
  } catch (error) {
    console.error("Error creating UPI ID:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
