const Frenchise = require("../model/frenchiseSchema");
const BusinessDeveloper = require("../model/businessDeveloperSchema");
const Member = require("../model/memberSchema");
const User = require("../model/userSchema");
const Admin = require("../model/adminSchema");
const StateChatMessage = require("../model/StateChatMessageSchema");
const StateChatType = require("../model/StateChatTypeSchema");
const FrenchChatTypeWithSHO = require("../model/FrenchiseChatTypeWithSHOSchema");
const StateChatMessageWithFrench = require("../model/FrenchiseChatMessageWithSHOSchema");
const {
  isValidImage,
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidPassword,
} = require("../validation/validation");
const stateHandler = require("../model/stateHandlerSchema");
const StateHandlerCreditWalletTransactionScema = require("../model/stateHandlerCreditWalletTransactionScema");
const FranchiseCreditWalletTransactionSchema = require("../model/frenchiseCreditWalletTransactionSchema");
const BusinessDeveloperCreditWalletTransactionSchema = require("../model/businessDeveloperCreditWalletTransaction");
const MemberCreditWalletTransaction = require("../model/memberCreditWalletTransaction");
const myReferral = require("../model/myReferralSchema");
const StatePaymentRequest = require("../model/statePaymentRequestSchema");
const BankAccountHolder = require("../model/BankAccountHolderSchema");
const UpiHolder = require("../model/UpiHolderSchema");
const UserCreditWalletTransaction = require("../model/userCreditWalletTransaction");
const ProfilePhoto = require("../model/profilePhotoSchema");
const notificationForAll = require("../model/notificationForAllSchema");
const notificationForAllSho = require("../model/NotificationForAllShoSchema");
const notificationForParticularSho = require("../model/NotificationForParticularShoSchema");
const StateHandler = require("../model/stateHandlerSchema");
const Note = require("../model/NoteModel");

//===============================================================================
//fetch all franchise list
exports.getFranchisesByReferralId = async (req, res) => {
  try {
    const stateReferralId = req.body.stateReferralId;
    const frenchises = await Frenchise.find({
      referredId: stateReferralId,
      isDeleted: false,
    });

    if (frenchises.length === 0) {
      return res
        .status(404)
        .json({ message: "No franchises found for the given referral ID" });
    }

    res.status(200).json({
      message: "Fetched successfully all frenchise list",
      data: frenchises,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

//============================================================================

// Fetch all business developers inside a state based on the state's referral ID
exports.getBusinessDevelopersInState = async (req, res) => {
  try {
    const stateReferralId = req.body.stateReferralId;

    // First, find all franchises in the specified state
    const franchisesInState = await Frenchise.find({
      referredId: stateReferralId,
      isDeleted: false,
    });

    // If no franchises are found, return a response indicating no data
    if (franchisesInState.length === 0) {
      return res
        .status(404)
        .json({ message: "No franchises found in the given state" });
    }

    const franchiseReferralIds = franchisesInState.map(
      (franchise) => franchise.referralId
    );

    const businessDevelopers = await BusinessDeveloper.find({
      referredId: { $in: franchiseReferralIds },
      isDeleted: false,
    });

    if (businessDevelopers.length === 0) {
      return res
        .status(404)
        .json({ message: "No business developers found in the given state" });
    }

    res.status(200).json({
      message: "Fetched successfully all Business Developers in the state",
      data: businessDevelopers,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//==============================================================================

exports.getAllMembersInState = async (req, res) => {
  try {
    const stateReferralId = req.body.stateReferralId;
    const franchisesInState = await Frenchise.find({
      referredId: stateReferralId,
      isDeleted: false,
    });
    if (franchisesInState.length === 0) {
      return res
        .status(404)
        .json({ message: "No franchises found in the given state" });
    }

    const franchiseReferralIds = franchisesInState.map(
      (franchise) => franchise.referralId
    );

    const members = await Member.find({
      reffered_id: { $in: franchiseReferralIds },
    });

    if (members.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found in the given state" });
    }

    res.status(200).json({
      message: "Fetched successfully all Members in the state",
      data: members,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: "Internal server error" });
  }
};

//===============================================================================
// Fetch all member inside a state based on the state's referral ID

exports.getAllUsersInState = async (req, res) => {
  try {
    const stateReferralId = req.body.stateReferralId;

    const franchisesInState = await Frenchise.find({
      referredId: stateReferralId,
    });

    if (franchisesInState.length === 0) {
      return res.status(404).json({
        message: "No franchises found in the given state",
      });
    }

    const franchiseReferralIds = franchisesInState.map(
      (franchise) => franchise.referralId
    );

    const members = await Member.find({
      reffered_id: { $in: franchiseReferralIds },
    });

    if (members.length === 0) {
      return res.status(404).json({
        message: "No members found in the given state",
      });
    }

    const memberReferralIds = members.map((member) => member.refferal_id);


    const traders = await User.find({
      reffered_id: {
        $in: [stateReferralId, ...franchiseReferralIds, ...memberReferralIds],
      },
    });

    if (traders.length === 0) {
      return res.status(404).json({
        message: "No traders found in the given state",
      });
    }

    res.status(200).json({
      message: "Fetched successfully all Users in the state",
      data: traders,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//==============================================================================
// Get a specific franchise
exports.getFranchiseForState = async (req, res) => {
  try {
    const id = req.body.id;
    const franchise = await Frenchise.findOne({ _id: id, isDeleted: false });

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    res
      .status(200)
      .json({ message: "Fetched franchise successfully", data: franchise });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//==============================================================================

// Block a specific franchise
exports.blockFranchiseForState = async (req, res) => {
  try {
    const id = req.params.id;
    const franchise = await Frenchise.findOne({
      _id: id,
      isDeleted: false,
      isBlocked: false,
    });

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    franchise.isBlocked = true;
    await franchise.save();

    res.status(200).json({ message: "Franchise blocked successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//==============================================================================
// Delete a specific franchise
exports.deleteFranchiseForState = async (req, res) => {
  try {
    const id = req.params.id;
    const franchise = await Frenchise.findOne({ _id: id, isDeleted: false });

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    franchise.isDeleted = true;
    await franchise.save();

    res.status(204).send();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//================================================================================

//==============================================================================
// Get a specific Business Developer
exports.getBusinessDeveloperForState = async (req, res) => {
  try {
    const id = req.body.id;
    const businessDeveloper = await BusinessDeveloper.findOne({
      _id: id,
      isDeleted: false, // Include this condition to ensure isDeleted is false
    });

    console.log(businessDeveloper, "/////");

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    res.status(200).json({
      message: "Fetched busines developer successfully",
      data: businessDeveloper,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// adminOnlineOrNot
exports.adminOnlineOrNot = async (req, res) => {
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
exports.fetchChatMessageState = async (req, res) => {
  const { room } = req.body;
  let stateChatMessage = await StateChatMessage.find({ room: room });
  if (stateChatMessage) {
    return res.status(200).json({
      message: " State chat message fetched",
      stateChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchChatDetailsState
exports.fetchChatDetailsState = async (req, res) => {
  const { stateHandlerId } = req.body;
  let stateChatDetails = await StateChatType.find({
    stateHandlerId: stateHandlerId,
  });
  if (stateChatDetails) {
    return res.status(200).json({
      message: " State chat details fetched",
      stateChatDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
//======================================================================

// update own state detais

exports.updateStateDetails = async (req, res) => {
  try {
    const { fname, lname, email, phone, gender } = req.body;
    const id = req.stateHandlerId;

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

    const updatedState = await stateHandler.findOneAndUpdate(
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

    if (!updatedState) {
      return res.status(404).json({ message: "State not found" });
    }

    res.status(200).json({
      message: "State details updated successfully",
      state: updatedState,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//==================================================================
exports.getOwnStateDetails = async (req, res) => {
  try {
    const id = req.stateHandlerId;
    const state = await stateHandler.findById(id);

    if (!state) {
      return res.status(404).json({ messgae: "State not found" });
    }

    return res
      .status(200)
      .json({ messgae: "Fetched state details successfully", data: state });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetchFrenchiseChatCountWithState
exports.fetchFrenchiseChatCountWithState = async (req, res) => {
  try {
    const { refferedId } = req.body;
    const frenchChatCount = await FrenchChatTypeWithSHO.find({ refferedId });
    console.log(frenchChatCount, "429");
    if (frenchChatCount) {
      return res.status(200).json({
        message: "French chat count with SHO fetched",
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

// stateFetchFrenchChatMessage
exports.stateFetchFrenchChatMessage = async (req, res) => {
  const { room } = req.body;
  let stateChatMessageWithFrench = await StateChatMessageWithFrench.find({
    room: room,
  });
  if (stateChatMessageWithFrench) {
    return res.status(200).json({
      message: " State chat with frenchise message fetched",
      stateChatMessageWithFrench,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// stateFrenchiseOnlineOrNot
exports.stateFrenchiseOnlineOrNot = async (req, res) => {
  const { frenchiseId } = req.body;
  let frenchiseOnlineOrNot = await Frenchise.findOne({
    frenchiseId: frenchiseId,
  });
  if (frenchiseOnlineOrNot) {
    const isOnline = frenchiseOnlineOrNot.isOnline;
    return res.status(200).json({
      message: "Frenchise Online status fetched",
      isOnline,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//==================================================================

exports.getOwnStateCreditWalletTransactionDetails = async (req, res) => {
  try {
    const { stateHandlerId } = req.body;

    const data = await StateHandlerCreditWalletTransactionScema.find({
      stateHandlerId: stateHandlerId,
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

exports.getOwnFranchiseInsideStateCreditWalletTransactionDetails = async (
  req,
  res
) => {
  try {
    // get-own-franchise-inside-state-credit-wallet-transaction-details
    const { stateHandlerId } = req.body;

    const state = await stateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const sho_reffralid = state.referralId;
    const franchise = await Frenchise.find({ referredId: sho_reffralid });

    const franchisesId = franchise.map((franchise) => franchise.frenchiseId);

    const data = await FranchiseCreditWalletTransactionSchema.find({
      frenchiseId: franchisesId,
    });

    console.log(data.length);

    if (!data) {
      return res
        .status(404)
        .json({ message: "Franchise Credit Wallet Transaction not found" });
    }

    return res.status(200).json({
      message: "Fetched Franchise Credit Wallet Transaction details",
      data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//====================================================================

exports.getOwnBusinessDeveloperInsideStateCreditWalletTransactionDetails =
  async (req, res) => {
    try {
      // get-own-franchise-inside-state-credit-wallet-transaction-details
      const { stateHandlerId } = req.body;

      const state = await stateHandler.findOne({
        stateHandlerId: stateHandlerId,
      });

      if (!state) {
        return res.status(404).json({ message: "State not found" });
      }

      const franchise = await Frenchise.find({ referredId: state.referralId });

      console.log(franchise, "lllllllll");

      const franchiseReferralIds = franchise.map(
        (franchise) => franchise.referralId
      );

      console.log(franchiseReferralIds, "pppppppp");

      const businessDevelopers = await BusinessDeveloper.find({
        referredId: { $in: franchiseReferralIds },
      });

      console.log(businessDevelopers, "kkkkkkkkk");

      const busisnessDeveloperIds = businessDevelopers.map(
        (businessDeveloper) => businessDeveloper.businessDeveloperId
      );

      const businessDeveloperCreditWalletTransactions =
        await BusinessDeveloperCreditWalletTransactionSchema.find({
          businessDeveloperId: busisnessDeveloperIds,
        });

      if (!businessDeveloperCreditWalletTransactions) {
        return res.status(404).json({
          message: "Business developer Credit Wallet Transaction not found",
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

//=================================================================
exports.getOwnMemberInsideStateCreditWalletTransactionDetails = async (
  req,
  res
) => {
  try {
    // get-own-franchise-inside-state-credit-wallet-transaction-details
    const { stateHandlerId } = req.body;

    const state = await stateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    if (!state) {
      return res.status(404).json({ message: "BMM not found" });
    }

    const sho_reffralid = state.referralId;

    const franchise = await Frenchise.find({ referredId: sho_reffralid });

    const franchiseReferralIds = franchise.map(
      (franchise) => franchise.referralId
    );
    const members = await Member.find({
      reffered_id: { $in: franchiseReferralIds },
    });

    const memberIds = members.map((member) => member.memberid);

    const memberCreditWalletTransactions =
      await MemberCreditWalletTransaction.find({
        memberId: memberIds,
      });

    return res.status(200).json({
      message: "Fetched Member Credit Wallet Transaction details",
      memberCreditWalletTransactions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//====================================================================
exports.getOwnTraderInsideStateCreditWalletTransactionDetails = async (
  req,
  res
) => {
  try {
    // get-own-franchise-inside-state-credit-wallet-transaction-details
    const { stateHandlerId } = req.body;

    const state = await stateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    console.log(state, ";;;");

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const sho_reffralid = state.referralId;
    const franchise = await Frenchise.find({ referredId: sho_reffralid });

    const franchiseReferralIds = franchise.map(
      (franchise) => franchise.referralId
    );

    const members = await Member.find({
      reffered_id: { $in: franchiseReferralIds },
    });

    const traderReferralIds = members.map((trader) => trader.refferal_id);

    const traders = await User.find({ reffered_id: traderReferralIds });

    const traderIds = traders.map((trader) => trader.userid);

    const traderCreditWalletTransactions =
      await UserCreditWalletTransaction.find({
        userid: traderIds,
      });

    return res.status(200).json({
      message: "Fetched Trader Credit Wallet Transaction details",
      traderCreditWalletTransactions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to create a new state payment request

exports.createStatePaymentRequest = async (req, res) => {
  try {
    const { stateHandlerId, amount, paymentBy } = req.body;

    if (!stateHandlerId || !amount || !paymentBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const state = await stateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    if (!state) {
      return res.status(404).json({ message: "State handler not found" });
    }

    if (amount < 1) {
      return res
        .status(400)
        .json({ message: "Minimum request amount should be 1" });
    }

    if (state.stateHandlerWallet < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newPaymentRequest = new StatePaymentRequest({
      stateHandlerId,
      amount,
      paymentBy,
    });

    // Deduct the amount from the state handler's wallet
    await stateHandler.updateOne(
      { stateHandlerId: stateHandlerId },
      {
        $inc: { stateHandlerWallet: -amount, paymentRequestCount: 1 },
        $set: { firstPayment: false, verifyDate: Date.now() },
      }
    );

    const savedPaymentRequest = await newPaymentRequest.save();
    res.status(201).json({
      message: "Payment requested successfullly",
      savedPaymentRequest,
    });
  } catch (error) {
    console.error("Error creating state payment request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//================================================================

exports.createStateBankAccountHolder = async (req, res) => {
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

    // Check if the state handler exists
    const state = await stateHandler.findOne({ stateHandlerId: userId });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const existingAccount = await BankAccountHolder.findOne({ userId });
    if (existingAccount) {
      return res
        .status(400)
        .json({ message: "You already have a bank account." });
    }

    const newAccountHolder = new BankAccountHolder({
      userId,
      accountHolderName,
      accountNumber,
      bankName,
      branchName,
      ifscCode,
    });

    const savedAccountHolder = await newAccountHolder.save();

    return res.status(201).json({
      message: "State Account holder created successfully",
      accountHolder: savedAccountHolder,
    });
  } catch (error) {
    console.error("Error creating account holder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=================================================================

exports.createStateUpiHolder = async (req, res) => {
  try {
    const { upiId, userId } = req.body;

    if (!upiId) {
      return res.status(400).json({ message: "UpiId is required" });
    }
    const state = await stateHandler.findOne({ stateHandlerId: userId });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const existingUpiId = await UpiHolder.findOne({ userId });
    if (existingUpiId) {
      return res.status(400).json({ message: "You already have an UPI ID" });
    }

    const newUpi = new UpiHolder({
      upiId,
      userId,
    });

    const savedUpi = await newUpi.save();
    return res
      .status(201)
      .json({ message: "State upi created successfully", savedUpi });
  } catch (error) {
    console.error("Error creating UPI ID:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//======================================================================

exports.getStateOwnBankDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    const stateBankDetails = await BankAccountHolder.find({ userId: userId });

    if (!stateBankDetails) {
      return res
        .status(404)
        .json({ message: "Bank details not found for the provided state" });
    }

    return res.status(200).json({
      message: "bank details of state fetched successfully",
      stateBankDetails,
    });
  } catch (error) {
    console.error("Error fetching state bank details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getStateOwnUpi = async (req, res) => {
  try {
    const { userId } = req.body;

    const stateUpiId = await UpiHolder.find({ userId: userId });

    if (!stateUpiId) {
      return res
        .status(404)
        .json({ message: "upi id not found for the provided state" });
    }

    return res
      .status(200)
      .json({ message: "Upi of state fetched successfully", stateUpiId });
  } catch (error) {
    console.error("Error fetching state upi:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.eligibleStateForWithdrawal = async (req, res) => {
  try {
    const { stateHandlerId } = req.body;

    const state = await stateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const updatedState = await stateHandler.findOneAndUpdate(
      { stateHandlerId: stateHandlerId },
      { firstPayment: true },
      { new: true }
    );

    if (!updatedState) {
      return res.status(500).json({ message: "Failed to update state" });
    }

    return res
      .status(200)
      .json({ message: "State updated successfully", updatedState });
  } catch (error) {
    console.error("Error fetching state :", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.uploadSHOProfilePhoto = async (req, res) => {
  try {
    const profilePhoto = req.files["profilePhoto"]
      ? req.files["profilePhoto"][0]?.location
      : null;

    if (!profilePhoto) {
      return res
        .status(400)
        .json({ message: "Please upload the profile photo" });
    }

    const userid = req.body.userid;

    if (!userid) {
      return res.status(400).json({ message: "User Id is required" });
    }

    const existingProfilePhoto = await ProfilePhoto.findOne({ userid });

    if (existingProfilePhoto) {
      existingProfilePhoto.imageUrl = profilePhoto;
      await existingProfilePhoto.save();
      return res.status(200).json({
        message: "Profile photo updated successfully.",
        data: existingProfilePhoto,
      });
    } else {
      const newProfilePhoto = new ProfilePhoto({
        userid: userid,
        imageUrl: profilePhoto,
      });
      await newProfilePhoto.save();
      return res.status(200).json({
        message: "Profile photo uploaded successfully.",
        data: newProfilePhoto,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSHOProfilePhoto = async (req, res) => {
  try {
    let userid = req.body.userid;
    const photo = await ProfilePhoto.findOne({ userid });
    if (!photo) {
      return res.status(404).json({ message: "Profile photo not found" });
    }

    return res
      .status(200)
      .json({ message: "profile photo fetched successfully", data: photo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// stateVerifyLoginOtp
exports.stateVerifyLoginOtp = async (req, res) => {
  const { loginOtp, stateHandlerId } = req.body;

  const findOneSHO = await stateHandler.findOne({
    stateHandlerId: stateHandlerId,
  });

  if (findOneSHO) {
    const verificationOtp = findOneSHO.loginOtp;
    if (verificationOtp === loginOtp) {
      return res.status(200).json({
        message: "Otp Verified",
      });
    } else {
      return res.status(404).json({
        message: "Invalid PIN ",
      });
    }
  } else {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// fetchStateNotification
exports.fetchStateNotification = async (req, res) => {
  try {
    const { stateHandlerId } = req.body;
    const allNotitfication = await notificationForAll.find();
    //console.log(allNotitfication);
    if (allNotitfication) {
      const allShoNotification = await notificationForAllSho.find();
      if (allShoNotification) {
        const particularState = await notificationForParticularSho.find({
          stateHandlerId: stateHandlerId,
        });
        if (particularState) {
          res.status(200).json({
            message: "SHO notification fetched",
            allNotitfication,
            allShoNotification,
            particularState,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// setNotificationToFalse
exports.setNotificationToFalse = async (req, res) => {
  try {
    const { stateHandlerId } = req.body;

    let setNotificationStatus = await StateHandler.updateOne(
      { stateHandlerId: stateHandlerId },
      {
        $set: { notification: 0 },
      }
    );
    if (setNotificationStatus) {
      return res.status(201).json({ message: "Notification set to zero " });
    } else {
      return res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// countTraderReferralFranchise

exports.countTraderReferralFranchise = async (req, res) => {
  try {
    const { referralId } = req.body;

    const franchise = await Frenchise.find({ referredId: referralId });

    const franchiseReferralIds = franchise.map(
      (franchise) => franchise.referralId
    );

    const member = await Member.find({
      reffered_id: { $in: franchiseReferralIds },
    });

    const memberReferralIds = member.map((member) => member.refferal_id);

    const traders = await User.find({
      $or: [
        {
          reffered_id: {
            $in: [referralId, ...franchiseReferralIds, ...memberReferralIds],
          },
        },
      ],
    });

    const franchiseCount = franchise.length;
    const memberCount = member.length;
    const traderCount = traders.length;

    return res.status(200).json({
      franchiseCount,
      memberCount,
      traderCount,
    });
  } catch (error) {
    console.error("Error in counting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// totalReferralPayoutAmountBMM
exports.totalReferralPayoutAmountBMM = async (req, res) => {
  try {
    const { stateHandlerId } = req.body;
    const result = await StateHandlerCreditWalletTransactionScema.aggregate([
      {
        $match: { stateHandlerId: stateHandlerId },
      },
      {
        $group: {
          _id: null, // Grouping without a specific field to sum for all documents
          totalPayout: { $sum: "$creditAmount" }, // Assuming the field for amount is named 'amount'
        },
      },
    ]);

    // result is an array of grouped results. In this case, it should have only one element.
    const totalPayout = result.length > 0 ? result[0].totalPayout : 0;

    return res.status(200).json({
      totalPayout,
    });
  } catch (error) {
    console.error("Error fetching Total payout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// stateUpdateBankDetails
exports.stateUpdateBankDetails = async (req, res) => {
  try {
    const {
      accountHolderName,
      bankName,
      branchName,
      accountNumber,
      ifscCode,
      userId,
    } = req.body;

    if (
      !accountHolderName ||
      !bankName ||
      !branchName ||
      !accountNumber ||
      !ifscCode
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const updateToMember = await BankAccountHolder.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          accountHolderName: accountHolderName,
          bankName: bankName,
          branchName: branchName,
          accountNumber: accountNumber,
          accountNumber: accountNumber,
          ifscCode: ifscCode,
          isAuthorised: false,
        },
      },
      { new: true }
    );

    if (updateToMember) {
      return res
        .status(200)
        .json({ message: "Your Bank Details Updated", data: updateToMember });
    } else {
      return res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// stateUpdateUpiDetails
exports.stateUpdateUpiDetails = async (req, res) => {
  try {
    const { upiId, userId } = req.body;
    if (!upiId) {
      return res.status(400).json({ message: "Please fill all the fields 1" });
    }

    const updateToMember = await UpiHolder.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          upiId: upiId,
          isAuthorised: false,
        },
      },
      { new: true }
    );

    if (updateToMember) {
      return res
        .status(200)
        .json({ message: "Your UPI Details Updated", data: updateToMember });
    } else {
      return res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.countTraderReferralFranchiseForGraph = async (req, res) => {
  try {
    const { referralId } = req.body;

    console.log(referralId, "referralid");

    // Get franchise members associated with the referralId
    const franchise = await Frenchise.find({ referredId: referralId });
    const franchiseReferralIds = franchise.map(
      (franchise) => franchise.referralId
    );

    // Get members associated with the franchise referralIds
    const member = await Member.find({
      reffered_id: { $in: franchiseReferralIds },
    });
    const memberReferralIds = member.map((member) => member.refferal_id);

    // Get traders associated with the referralId, franchise referralIds, and member referralIds
    const traders = await User.find({
      reffered_id: {
        $in: [referralId, ...franchiseReferralIds, ...memberReferralIds],
      },
    });

    // Aggregate counts based on year and month
    const counts = {
      traderCounts: [],
      franchiseCounts: [],
      referralCounts: [],
    };

    // Function to add counts to the 'counts' object
    const addCount = (year, month, type) => {
      const monthAbbreviations = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthAbbreviation = monthAbbreviations[month - 1]; // Months are zero-indexed, so subtract 1
      const monthYearKey = `${year}-${monthAbbreviation}`;

      // Check if the month-year combination already exists in the counts object
      if (
        counts[`${type}Counts`].some(
          (item) => item.year === year && item.month === monthAbbreviation
        )
      ) {
        // If it exists, find the index of the existing item and increment its count
        const index = counts[`${type}Counts`].findIndex(
          (item) => item.year === year && item.month === monthAbbreviation
        );
        counts[`${type}Counts`][index].count++;
      } else {
        // If it doesn't exist, add a new count object
        const countObj = { count: 1, year, month: monthAbbreviation };
        counts[`${type}Counts`].push(countObj);
      }
    };

    // Add counts for franchise members
    franchise.forEach((franchise) => {
      const { year, month } = extractYearMonth(franchise.createdAt);
      addCount(year, month, "franchise");
    });

    // Add counts for members
    member.forEach((member) => {
      const { year, month } = extractYearMonth(member.createdAt);
      addCount(year, month, "referral");
    });

    // Add counts for traders
    traders.forEach((trader) => {
      const { year, month } = extractYearMonth(trader.createdAt);
      addCount(year, month, "trader");
    });

    // Destructure counts object and directly return traderCounts, franchiseCounts, and referralCounts
    const { traderCounts, franchiseCounts, referralCounts } = counts;

    return res
      .status(200)
      .json({ traderCounts, franchiseCounts, referralCounts });
  } catch (error) {
    console.error("Error in counting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to extract year and month from a date
const extractYearMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  return { year, month };
};


exports.updateDocuments = async (req, res) => {
  try {
    const adharFront = req.files["adhar_front_side"]
      ? req.files["adhar_front_side"][0]?.location
      : null;

    const adharBack = req.files["adhar_back_side"]
      ? req.files["adhar_back_side"][0]?.location
      : null;

    const panCard = req.files["panCard"]
      ? req.files["panCard"][0]?.location
      : null;

    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }

    let updateFields = {};

    if (adharFront) {
      updateFields.adhar_front_side = adharFront;
    }

    if (adharBack) {
      updateFields.adhar_back_side = adharBack;
    }

    if (panCard) {
      updateFields.panCard = panCard;
    }

    let userDocuments;

    // Update documents in StateHandler collection
    userDocuments = await StateHandler.findOneAndUpdate(
      { stateHandlerId: userId },
      { $set: updateFields },
      { new: true }
    );
    if (!userDocuments) {
      userDocuments = await Frenchise.findOneAndUpdate(
        { frenchiseId: userId },
        { $set: updateFields },
        { new: true }
      );
    }

    if (!userDocuments) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json({
      message: "All documents uploaded successfully.",
      data: userDocuments,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchBmmNote = async (req, res) => {
  try {
    // Find the latest note intended for traders or all users
    const latestNote = await Note.find({
      sendingTo: { $in: ["bmm", "all"] },
    })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(5); // Limit the query to return only one document

    res
      .status(200)
      .json({
        status: true,
        message: "Note fetched successfully",
        data: latestNote,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: true, message: "Internal server error" });
  }
};

