const BusinessDeveloper = require("../model/businessDeveloperSchema");
const Member = require("../model/memberSchema");
const User = require("../model/userSchema");
const Admin = require("../model/adminSchema");
const FrenchChatMessage = require("../model/FrenchChatMessageSchema");
const FrenchChatType = require("../model/FrenchChatTypeSchema");
const FrenchChatTypeWithSHO = require("../model/FrenchiseChatTypeWithSHOSchema");
const FrenchChatMessageWithSHO = require("../model/FrenchiseChatMessageWithSHOSchema");
const StateHandler = require("../model/stateHandlerSchema");
const Frenchise = require("../model/frenchiseSchema");
const Franchise = require("../model/frenchiseSchema");
const FranchiseCreditWalletTransactionSchema = require("../model/frenchiseCreditWalletTransactionSchema");
const BusinessDeveloperCreditWalletTransactionSchema = require("../model/businessDeveloperCreditWalletTransaction");
const MyReferral = require("../model/myReferralSchema");

const FrenchChatTypeWithBD = require("../model/FrenchChatTypeWithBDSchema");
const FrenchiseChatMessageWithBD = require("../model/FrenchiseChatMessageWithBDSchema");
const {
  isValidImage,
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidPassword,
} = require("../validation/validation");
const FranchisePaymentRequest = require("../model/franchisePaymentRequestSchema");
const BankAccountHolder = require("../model/BankAccountHolderSchema");
const UpiHolder = require("../model/UpiHolderSchema");
const MemberCreditWalletTransaction = require("../model/memberCreditWalletTransaction");
const UserCreditWalletTransaction = require("../model/userCreditWalletTransaction");
const ProfilePhoto = require("../model/profilePhotoSchema");

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
    const memberReferralIds = members.map((member) => member.refferal_id);
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
};

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
};

// fetchChatDetailsState
exports.fetchChatDetailsFrenchisee = async (req, res) => {
  const { frenchiseId } = req.body;
  let frenchChatDetails = await FrenchChatType.find({
    frenchiseId: frenchiseId,
  });
  if (frenchChatDetails) {
    return res.status(200).json({
      message: " French chat details fetched",
      frenchChatDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchChatDetailsFrenchiseWithSHO
exports.fetchChatDetailsFrenchiseWithSHO = async (req, res) => {
  const { frenchiseId } = req.body;
  let frenchChatDetailsWithSHO = await FrenchChatTypeWithSHO.find({
    frenchiseId: frenchiseId,
  });
  if (frenchChatDetailsWithSHO) {
    return res.status(200).json({
      message: " French chat with SHO details fetched",
      frenchChatDetailsWithSHO,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchChatWithSHOMessage
exports.fetchChatWithSHOMessage = async (req, res) => {
  const { room } = req.body;
  let frenchChatMessageWithSHO = await FrenchChatMessageWithSHO.find({
    room: room,
  });
  if (frenchChatMessageWithSHO) {
    return res.status(200).json({
      message: " French chat with SHO message fetched",
      frenchChatMessageWithSHO,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getOwnFranchiseDetails = async (req, res) => {
  try {
    const id = req.franchiseId;
    const franchise = await Franchise.findById(id);
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    res
      .status(200)
      .json({ message: "Fetched franchise successfully", data: franchise });
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
  const findLoginFrenchise = await Frenchise.findOne({
    frenchiseId: frenchiseId,
  });

  if (findLoginFrenchise) {
    let LoginFrenchiseRefferedId = findLoginFrenchise.referredId;
    console.log(LoginFrenchiseRefferedId);
    const findSHOfromFrenchise = await StateHandler.findOne({
      referralId: LoginFrenchiseRefferedId,
    });
    if (findSHOfromFrenchise) {
      const stateHandlerId = findSHOfromFrenchise.stateHandlerId;
      const isSHOonline = findSHOfromFrenchise.isOnline;

      return res.status(200).json({
        message: "SHO isOnline status fetched",
        stateHandlerId,
        isSHOonline,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  } else {
    return res.status(400).json({
      message: "No Data Found",
    });
  }
};

exports.updateOwnFranchiseDetails = async (req, res) => {
  try {
    const { fname, lname, email, phone, gender } = req.body;
    const franchiseId = req.franchiseId;
    // Validate input fields
    if (!fname || !lname || !email || !phone || !gender) {
      return res.status(422).json({ message: "All fields are required." });
    }
    if (fname && !isValidName(fname)) {
      return res.status(422).json({ message: "Invalid first name format." });
    }
    if (lname && !isValidName(lname)) {
      return res.status(422).json({ message: "Invalid last name format." });
    }
    // Validate email format
    if (email && !isValidEmail(email)) {
      return res.status(422).json({ message: "Invalid email format." });
    }
    // Validate phone number format
    if (phone && !isValidPhone(phone)) {
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

//==================================================================

exports.getOwnFranchiseCreditWalletTransactionDetails = async (req, res) => {
  try {
    const { franchiseId } = req.body;

    const data = await FranchiseCreditWalletTransactionSchema.find({
      frenchiseId: franchiseId,
    });

    if (!data) {
      return res.status(404).json({
        message: "State Handler  Credit Wallet Transaction not found",
      });
    }

    return res.status(200).json({
      message: "fetched State Handler  Credit Wallet Transaction details",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//================================================================
exports.getOwnBusinessDeveloperInsideFranchiseCreditWalletTransactionDetails =
  async (req, res) => {
    try {
      const { franchiseId } = req.body;

      // Find the franchise based on the given franchiseId
      const franchise = await Frenchise.findOne({ frenchiseId: franchiseId });

      if (!franchise) {
        return res.status(404).json({ message: "Franchise not found" });
      }

      const businessDevelopers = await BusinessDeveloper.find({
        referredId: franchise.referralId,
      });

      const businessDeveloperIds = businessDevelopers.map(
        (businessDeveloper) => businessDeveloper.businessDeveloperId
      );

      const businessDeveloperCreditWalletTransactions =
        await BusinessDeveloperCreditWalletTransactionSchema.find({
          businessDeveloperId: { $in: businessDeveloperIds },
        });

      if (
        !businessDeveloperCreditWalletTransactions ||
        businessDeveloperCreditWalletTransactions.length === 0
      ) {
        return res.status(404).json({
          message: "Business Developer Credit Wallet Transaction not found",
        });
      }

      return res.status(200).json({
        message: "Fetched Business Developer Credit Wallet Transaction details",
        businessDeveloperCreditWalletTransactions,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

//===================================================================

exports.getOwnMembersInsideFranchiseCreditWalletTransactionDetails = async (
  req,
  res
) => {
  const { franchiseId } = req.body;

  // Find the franchise based on the given franchiseId
  const franchise = await Frenchise.findOne({ frenchiseId: franchiseId });

  if (!franchise) {
    return res.status(404).json({ message: "Franchise not found" });
  }

  // const busisnessDeveloperReferredIds = franchise.map(franchise=> franchise.referralId);

  // Fetch business developers based on the referralIds from franchises
  const businessDevelopers = await BusinessDeveloper.find({
    referredId: franchise.referralId,
  });

  const memberReferredIds = businessDevelopers.map((bd) => bd.referralId);

  // Fetch members based on the referralIds from business developers
  const members = await Member.find({
    reffered_id: { $in: memberReferredIds },
  });

  const memberIds = members.map((member) => member.memberid);

  // Fetch member credit wallet transactions based on memberIds
  const memberCreditWalletTransactions =
    await MemberCreditWalletTransaction.find({
      userid: { $in: memberIds },
    });
  return res.status(200).json({
    message: "Fetched Member Credit Wallet Transaction details",
    memberCreditWalletTransactions,
  });
};

//========================

exports.getOwnTradersInsideFranchiseCreditWalletTransactionDetails = async (
  req,
  res
) => {
  const { franchiseId } = req.body;

  try {
    // Find the franchise based on the given franchiseId
    const franchise = await Franchise.findOne({ frenchiseId: franchiseId });

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    // Fetch business developers based on the referralIds from franchises
    const businessDevelopers = await BusinessDeveloper.find({
      referredId: franchise.referralId,
    });

    const memberReferredIds = businessDevelopers.map((bd) => bd.referralId);

    // Fetch members based on the referralIds from business developers
    const members = await Member.find({
      reffered_id: { $in: memberReferredIds },
    });

    const traderReferredIds = members.map((member) => member.refferal_id);

    // Fetch traders based on the referralIds from members
    const traders = await User.find({
      reffered_id: { $in: traderReferredIds },
    });

    // Fetch trader credit wallet transactions based on traderIds
    const traderIds = traders.map((trader) => trader.userid);

    const traderCreditWalletTransactions =
      await UserCreditWalletTransaction.find({
        userid: { $in: traderIds },
      });

    return res.status(200).json({
      message: "Fetched Trader Credit Wallet Transaction details",
      traderCreditWalletTransactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// frenchise/fetch-business-chat-count-with-frenchise
exports.getBusinessChatCountWithFrenchise = async (req, res) => {
  try {
    const { refferedId } = req.body;
    const frenchChatCount = await FrenchChatTypeWithBD.find({ refferedId });
    console.log(frenchChatCount, "287");
    if (frenchChatCount) {
      return res.status(200).json({
        message: "French chat count with BD fetched",
        frenchChatCount,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// frenchiseFetchBusinessChatMessage
exports.frenchiseFetchBusinessChatMessage = async (req, res) => {
  try {
    const { room } = req.body;
    let frenchChatMessageWithBusiness = await FrenchiseChatMessageWithBD.find({
      room: room,
    });
    if (frenchChatMessageWithBusiness) {
      return res.status(200).json({
        message: "Frenchise chat with businessD message fetched",
        frenchChatMessageWithBusiness,
      });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// frenchiseBusinessOnlineOrNot
exports.frenchiseBusinessOnlineOrNot = async (req, res) => {
  const { businessDeveloperId } = req.body;
  let businessDOnlineOrNot = await BusinessDeveloper.findOne({
    businessDeveloperId: businessDeveloperId,
  });
  if (businessDOnlineOrNot) {
    const isOnline = businessDOnlineOrNot.isOnline;
    return res.status(200).json({
      message: "Business Online status fetched",
      isOnline,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//==========================================================================

exports.createFranchisePaymentRequest = async (req, res) => {
  try {
    const { franchiseId, amount, paymentBy } = req.body;

    if (!franchiseId || !amount) {
      return res
        .status(400)
        .json({ error: "Franchise ID and amount are required." });
    }

    const franchise = await Franchise.findOne({
      frenchiseId: franchiseId,
    });

    console.log(franchise, "[[[[");
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    if (amount < 1) {
      return res
        .status(400)
        .json({ message: "Minimum request amount should be 1" });
    }

    if (franchise.frenchiseWallet < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newPaymentRequest = new FranchisePaymentRequest({
      franchiseId: franchise.frenchiseId,
      amount,
      paymentBy,
    });

    await Franchise.updateOne(
      {
        frenchiseId: franchise.frenchiseId,
      },
      {
        $inc: {
          frenchiseWallet: -amount,
          paymentRequestCount: 1,
        },
        $set: { firstPayment: false, verifyDate: Date.now() },
      }
    );

    const savedPaymentRequest = await newPaymentRequest.save();

    res.status(201).json({
      message: "Franchise payment request created successfully.",
      savedPaymentRequest,
    });
  } catch (error) {
    console.error("Error creating franchise payment request:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createFranchiseBankAccountHolder = async (req, res) => {
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

    const franchise = await Franchise.findOne({ frenchiseId: userId });

    if (!franchise) {
      return res.status(400).json({ message: "Franchise not found" });
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
      message: "Franchise account holder created successfully",
      accountHolder: savedAccountHolder,
    });
  } catch (error) {
    console.error("Error creating account holder:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=================================================================

exports.createFranchiseUpiHolder = async (req, res) => {
  try {
    const { upiId, userId } = req.body;
    if (!upiId) {
      return res.status(400).json({ message: "UpiId is required" });
    }
    const franchise = await Franchise.findOne({ frenchiseId: userId });

    if (!franchise) {
      return res.status(400).json({ message: "Franchise not found" });
    }

    const newUpi = new UpiHolder({
      upiId,
      userId,
    });

    const savedUpi = await newUpi.save();
    res
      .status(201)
      .json({ message: "Franchise upi created successfully", savedUpi });
  } catch (error) {
    console.error("Error creating UPI ID:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//=====================================================================
exports.getFranchiseOwnBankDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    const franchiseBankDetails = await BankAccountHolder.find({
      userId: userId,
    });

    if (!franchiseBankDetails) {
      return res
        .status(404)
        .json({ message: "Bank details not found for the provided franchise" });
    }

    return res.status(200).json({
      message: "bank details of franchise fetched successfully",
      franchiseBankDetails,
    });
  } catch (error) {
    console.error("Error fetching franchise bank details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFranchiseOwnUpi = async (req, res) => {
  try {
    const { userId } = req.body;

    const franchiseUpiId = await UpiHolder.find({ userId: userId });

    if (!franchiseUpiId) {
      return res
        .status(404)
        .json({ message: "upi id not found for the provided franchise" });
    }

    return res.status(200).json({
      message: "Upi of franchise fetched successfully",
      franchiseUpiId,
    });
  } catch (error) {
    console.error("Error fetching franchise upi:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.eligibleFranchiseForWithdrawal = async (req, res) => {
  try {
    const { franchiseId } = req.body;

    const franchise = await Franchise.findOne({ frenchiseId: franchiseId });
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    const updatedFranchise = await Franchise.findOneAndUpdate(
      { frenchiseId: franchiseId },
      { firstPayment: true },
      { new: true }
    );

    if (!updatedFranchise) {
      return res.status(500).json({ message: "Failed to update Franchise" });
    }

    return res
      .status(200)
      .json({ message: "Franchise updated successfully", updatedFranchise });
  } catch (error) {
    console.error("Error fetching Franchise :", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//=====================upload franchise profile photo ========================

exports.uploadFranchiseProfilePhoto = async (req, res) => {
  try {
    const profilePhoto = req.files["profilePhoto"][0]?.location;
    const userid = req.body.userid;
    if (!profilePhoto) {
      return res.status(404).json({ message: "Profile photo not found" });
    }

    let existingProfilePhoto = await ProfilePhoto.findOne({ userid });
    if (existingProfilePhoto) {
      existingProfilePhoto.imageUrl = profilePhoto;
      await existingProfilePhoto.save();
    } else {
      existingProfilePhoto = new ProfilePhoto({
        userid: userid,
        imageUrl: profilePhoto,
      });
      await existingProfilePhoto.save();
    }
    return res
      .status(200)
      .json({
        message: "Profile photo uploaded successfully",
        data: existingProfilePhoto,
      });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Internal server error" });
  }
};

//==================================get franchise profile photo=============
exports.getFranchiseProfilePhoto = async(req, res) => {
  try {

    let userid = req.body.userid
    const photo = await ProfilePhoto.findOne({userid})
    if(!photo){
      return res.status(404).json({message: "Profile photo not found"})
    }

    return res.status(200).json({message: "profile photo fetched successfully", data:photo})
    
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Internal server error" });
  }
}
