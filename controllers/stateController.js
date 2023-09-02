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

    const businessDevelopers = await BusinessDeveloper.find({
      referredId: { $in: franchiseReferralIds },
      isDeleted: false,
    });
    if (businessDevelopers.length === 0) {
      return res
        .status(404)
        .json({ message: "No business developers found in the given state" });
    }

    const businessDeveloperReferralIds = businessDevelopers.map(
      (businessDeveloper) => businessDeveloper.referralId
    );

    const members = await Member.find({
      reffered_id: { $in: businessDeveloperReferralIds },
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

    console.log(franchisesInState, "ffffffffff");

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

    console.log(businessDevelopers, "bbbbbbbbbb");

    if (businessDevelopers.length === 0) {
      return res
        .status(404)
        .json({ message: "No business developers found in the given state" });
    }

    const businessDeveloperReferralIds = businessDevelopers.map(
      (businessDeveloper) => businessDeveloper.referralId
    );
    const members = await Member.find({
      reffered_id: { $in: businessDeveloperReferralIds },
    });

    console.log(members, "mmmmmmm");

    if (members.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found in the given state" });
    }

    const memberReferralIds = members.map((member) => member.refferal_id);

    const users = await User.find({ reffered_id: { $in: memberReferralIds } });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found in the given state" });
    }
    res.status(200).json({
      message: "Fetched successfully all Users in the state",
      data: users,
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

      const sho_reffralid = state.referralId;
      const franchise = await Frenchise.find({ referredId: sho_reffralid });

      const franchisesId = franchise.map((franchise) => franchise.frenchiseId);

      const FranchiseCreditWalletTransactions =
        await FranchiseCreditWalletTransactionSchema.find({
          frenchiseId: franchisesId,
        });

      const busisnessDeveloperReferralIds = franchise.map(
        (businessDeveloper) => businessDeveloper.referredId
      );

      const businessDevelopers = await BusinessDeveloper.find({
        referredId: { $in: busisnessDeveloperReferralIds },
      });

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
      return res.status(404).json({ message: "State not found" });
    }

    const sho_reffralid = state.referralId;
    const franchise = await Frenchise.find({ referredId: sho_reffralid });

    const busisnessDeveloperReferralIds = franchise.map(
      (businessDeveloper) => businessDeveloper.referralId
    );

    const businessDevelopers = await BusinessDeveloper.find({
      referredId: { $in: busisnessDeveloperReferralIds },
    });

    const memberReferralIds = businessDevelopers.map(
      (member) => member.referralId
    );

    const members = await Member.find({
      reffered_id: { $in: memberReferralIds },
    });

    const memberIds = members.map((member) => member.memberid);

    const memberCreditWalletTransactions =
      await MemberCreditWalletTransaction.find({
        userid: memberIds,
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

    console.log(franchise, ";;;;");

    const franchiseReferralIds = franchise.map(
      (franchise) => franchise.referralId
    );

    console.log(franchiseReferralIds, "br");

    const businessDevelopers = await BusinessDeveloper.find({
      referredId: { $in: franchiseReferralIds },
    });

    console.log(businessDevelopers, "703");

    const memberReferralIds = businessDevelopers.map(
      (member) => member.referralId
    );

    const members = await Member.find({
      reffered_id: { $in: memberReferralIds },
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

    if (amount < 500) {
      return res
        .status(400)
        .json({ message: "Minimum request amount should be 500" });
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
        $inc: { stateHandlerWallet: -amount ,paymentRequestCount: 1 },
  
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
