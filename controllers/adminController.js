const Admin = require("../model/adminSchema");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Userdocument = require("../model/userDocumentSchema");
const Member = require("../model/memberSchema");
const Memberdocument = require("../model/memberDocumentSchema");
const notificationForAll = require("../model/notificationForAllSchema");
const notificationForAllTrader = require("../model/notificationForAllTraderSchema");
const notificationForAllRefferal = require("../model/notificationForAllRefferalSchema");
const notificationForParticularTrader = require("../model/notificationForParticularTraderSchema");
const notificationForParticularRefferal = require("../model/notificationForParticularRefferalSchema");
const userRefferalPayoutRequest = require("../model/userRefferalPayoutRequest");
const userRefferalPayoutApproveWithdrawal = require("../model/userRefferalPayoutApproveWithdrawalSchema");
const memberRefferalPayoutRequest = require("../model/memberRefferalPayoutRequestSchema");
const memberRefferalPayoutApproveWithdrawal = require("../model/memberRefferalPayoutApproveWithdrawalSchema");
const ChatType = require("../model/chatType");
const chatMessage = require("../model/chatMessageSchema");
const RefferalChatType = require("../model/refferalChatType");
const RefferalChatMessage = require("../model/refferalChatMessageSchema");
const Video = require("../model/videoModel");
const WalletTransaction = require("../model/transactionSchema");
const MoneyWithdrawlTransaction = require("../model/withDrawlSchema");
const UserRenewal = require("../model/userRenewelSchema");
const AllNewPaidUser = require("../model/allNewPaidUserSchema");
const MyReferral = require("../model/myReferralSchema");
const subAdmin = require("../model/subadminSchema");
const validator = require("validator");
const StateHandler = require("../model/stateHandlerSchema");
const Frenchise = require("../model/frenchiseSchema");
const BusinessDeveloper = require("../model/businessDeveloperSchema");
const Like = require("../model/likeModel");
const DisLike = require("../model/disLikeModel");

const BusinessDeveloperCreditWalletTransaction = require("../model/businessDeveloperCreditWalletTransaction");
const Franchise = require("../model/frenchiseSchema");
const FranchiseCreditWalletTransaction = require("../model/frenchiseCreditWalletTransactionSchema");
const StateHandlerCreditWalletTransaction = require("../model/stateHandlerCreditWalletTransactionScema");
const StateChatMessage = require("../model/StateChatMessageSchema");
const StateChatType = require("../model/StateChatTypeSchema");
const FrenchChatType = require("../model/FrenchChatTypeSchema");
const FrenchChatMessage = require("../model/FrenchChatMessageSchema");
const BusinessDeveloperChatType = require("../model/BusinessDeveloperChatTypeSchema");
const BusinessDeveloperChatMessage = require("../model/BusinessDeveloperChatMessageSchema");
const AdminCreditWalletTransaction = require("../model/adminCreditWalletTransaction");
const StatePaymentRequest = require("../model/statePaymentRequestSchema");
const StatePaymentApprove = require("../model/statePaymentApproveSchema");
const {
  isValidPassword,
  isValidName,
  isValidImage,
  isValidPhone,
  isValidEmail,
  isValidUserId,
} = require("../validation/validation");
const FranchisePaymentRequest = require("../model/franchisePaymentRequestSchema");
const FranchisePaymentApprove = require("../model/franchisePaymentApproveSchema");
const BussinessDeveloperPaymentRequest = require("../model/businessDeveloperPaymentRequestSchema");
const BussinessDeveloperPaymentApprove = require("../model/businessDeveloperPaymentApproveSchema");
const MemberCreditWalletTransaction = require("../model/memberCreditWalletTransaction");
const UserCreditWalletTransaction = require("../model/userCreditWalletTransaction");
const UpiHolder = require("../model/UpiHolderSchema");
const BankAccountHolder = require("../model/BankAccountHolderSchema");
// const memberCreditWalletTransaction = require("../model/memberCreditWalletTransaction");
const NotificationForAllSho = require("../model/NotificationForAllShoSchema");
const NotificationsForAllFranchise = require("../model/NotificationForAllFranchiseSchema");
const NotificationForAllBusinessDev = require("../model/NotificationForAllBusinessDevSchema");
const NotificationForParticularSho = require("../model/NotificationForParticularShoSchema");
const NotificationForParticularFranchise = require("../model/notification-for-particular-franchise");
const NotificationForParticularBusinessDev = require("../model/NotificationForParticularBusinessDev");
const VideoCreater = require("../model/VideoCreaterSchema");
const TotaltradingValue = require("../model/totalTradingValue");
const Invoice = require("../model/Invoice");
const Note = require("../model/NoteModel");
const TradingHistory = require("../model/tradingHistory");
const CryptoTransferHistory = require("../model/cryptoTransferHistory");

// admin Login

exports.adminLogin = async (req, res) => {
  try {
    const { admin_id, password } = req.body;
    if (!admin_id || !password) {
      return res
        .status(422)
        .json({ message: "Please fill credentials to login" });
    }
    const adminLogin = await Admin.findOne({ admin_id: admin_id });

    //console.log(adminLogin);
    if (!adminLogin) {
      res.status(404).json({ message: "Invalid Credentials" });
    } else {
      if (password === adminLogin.password) {
        const token = jwt.sign(
          { userId: adminLogin._id },
          process.env.SECRET_KEY,
          { expiresIn: "8h" }
        );
        const admin_id = adminLogin.admin_id;
        const referralId = adminLogin.referralId;
        res.status(201).json({
          message: "Admin Login Successfully",
          token: token,
          admin_id,
          referralId,
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

// admin logout
exports.adminLogout = (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).json({ message: "Logged out" });
};

// fetchUserDetails
exports.fetchUserDetails = (req, res) => {
  User.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ result });
    }
  });
};

// fetchParticularUserDetails
exports.fetchParticularUserDetails = (req, res) => {
  const _id = req.body;
  User.findById(_id)
    .then((result) => {
      res.status(200).json({
        message: "Details Fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// verifyUser

exports.verifyUser = async (req, res) => {
  const { status, id } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { status: status, verifyDate: Date.now() } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found or already verified",
      });
    }

    return res.status(200).json({
      message: "Verified Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Something Went wrong",
    });
  }
};

// fetchUserDocumentAdmin
exports.fetchUserDocumentAdmin = async (req, res) => {
  const { userid } = req.body;
  await User.find({ userid })
    .then((result) => {
      res.status(200).json({
        message: "Details Fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// fetchMemberDetails
exports.fetchMemberDetails = async (req, res) => {
  Member.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ result });
    }
  });
};

// fetchParticularMemberDetails
exports.fetchParticularMemberDetails = async (req, res) => {
  const _id = req.body;
  Member.findById(_id)
    .then((result) => {
      res.status(200).json({
        message: "Member details Fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// verifyMember
exports.verifyMember = async (req, res) => {
  const { status, id } = req.body;
  let result = await Member.updateOne(
    { _id: id },
    {
      $set: { status: status, verifyDate: Date.now() },
    }
  );
  if (result.modifiedCount > 0) {
    return res.status(200).json({
      message: "Verified Successfully",
    });
  } else {
    return res.status(404).json({
      message: "Something Went wrong",
    });
  }
};

// fetchMemberDocumentAdminside
exports.fetchMemberDocumentAdminside = async (req, res) => {
  const { memberid } = req.body;
  await Memberdocument.find({ memberid })
    .then((result) => {
      res.status(200).json({
        message: " Member Documents Fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// userDetailsEditAdmin

exports.userDetailsEditAdmin = async (req, res) => {
  const {
    userWhat,
    fname,
    lname,
    phone,
    address,
    gender,
    aadhar,
    pan,
    id,
    Id_No,
  } = req.body;

  try {
    let updatedUser;
    if (userWhat === "indian") {
      if (
        !fname ||
        !lname ||
        !phone ||
        !address ||
        !gender ||
        !aadhar ||
        !pan
      ) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            fname: fname,
            lname: lname,
            address: address,
            gender: gender,
            phone: phone,
            aadhar: aadhar,
            pan: pan,
          },
        },
        { new: true } // Return the updated document
      );
    } else if (userWhat === "otherCountry") {
      if (!fname || !lname || !phone || !address || !gender || !Id_No) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            fname: fname,
            lname: lname,
            address: address,
            gender: gender,
            phone: phone,
            Id_No: Id_No,
          },
        },
        { new: true } // Return the updated document
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(201)
      .json({ message: "User Details Updated", data: updatedUser });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// memberDetailsEditAdmin
exports.memberDetailsEditAdmin = async (req, res) => {
  const {
    userWhat,
    fname,
    lname,
    phone,
    address,
    gender,
    aadhar,
    pan,
    id,
    Id_No,
  } = req.body;

  if (userWhat === "indian") {
    if (!fname || !lname || !phone || !address || !gender || !aadhar || !pan) {
      return res.status(422).json({ message: "Please fill all the fields" });
    }

    Member.updateOne(
      { _id: id },
      {
        $set: {
          fname: fname,
          lname: lname,
          address: address,
          gender: gender,
          phone: phone,

          aadhar: aadhar,
          pan: pan,
        },
      }
    ).then(() => {
      return res.status(200).json({ message: "User Details Updated" });
    });
  }
  if (userWhat === "otherCountry") {
    if (!fname || !lname || !phone || !address || !gender || !Id_No) {
      return res.status(422).json({ message: "Please fill all the fields" });
    }

    Member.updateOne(
      { _id: id },
      {
        $set: {
          fname: fname,
          lname: lname,
          address: address,
          gender: gender,
          phone: phone,

          Id_No: Id_No,
        },
      }
    ).then(() => {
      return res.status(201).json({ message: "User Details Updated" });
    });
  }
};

// deleteUserAdmin
exports.deleteUserAdmin = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const success = User.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      console.log("hiii");
    } else {
      return res.status(201).json({ message: "User Deleted" });
    }
  });
  // console.log(success);
  // if(success){
  //     return res.status(200).json({
  //         message:"User Deleted Successfully"
  //     })
  // }else{
  //     return res.status(400).json({
  //         message:"User Not Deleted"
  //     })
  // }
};
// blockMember
exports.blockMember = async (req, res) => {
  const { block, id } = req.body;
  console.log(block);
  let result = await Member.updateOne(
    { _id: id },
    {
      $set: { isBlocked: block },
    }
  );
  if (result.modifiedCount > 0) {
    if (block) {
      return res.status(200).json({
        message: "Member Blocked",
      });
    } else {
      return res.status(200).json({
        message: "Member Unblocked",
      });
    }
  } else {
    return res.status(404).json({
      message: "Something Went wrong",
    });
  }
};

// userRegistrationByAdmin
exports.userRegistrationByAdmin = async (req, res) => {
  if (
    !req.files ||
    !req.files["aadhar_front_side"] ||
    !req.files["aadhar_back_side"] ||
    !req.files["pan_card"]
  ) {
    return res.status(422).json({ message: "Please Fill all Details!" });
  }

  const aadhar_front_side = req.files.aadhar_front_side[0].location;
  const aadhar_back_side = req.files.aadhar_back_side[0].location;
  const pan_card = req.files.pan_card[0].location;
  //console.log(aadhar_back, aadhar_front, pan_card,'140');

  if (!aadhar_front_side || !aadhar_back_side || !pan_card) {
    return res.status(422).json({ message: "All field required" });
  }

  const {
    fname,
    lname,
    email,
    phone,
    address,
    gender,
    dob,
    aadhar,
    pan,
    reffered_id,
    userid,
    password,
  } = req.body;

  let isValidRefferedIdUser = await User.findOne({ refferal_id: reffered_id });
  let isValidRefferedIdMember = await Member.findOne({
    refferal_id: reffered_id,
  });
  let isValidRefferedIdAdmin = await Admin.findOne({ referralId: reffered_id });

  if (
    !isValidRefferedIdUser &&
    !isValidRefferedIdMember &&
    !isValidRefferedIdAdmin
  ) {
    return res
      .status(400)
      .json({ message: "You are providing a wrong referral id" });
  }

  const aadhar_length = aadhar;
  const pan_length = pan;
  //console.log(aadhar_length.length,'35');
  if (aadhar_length.length < 12 || aadhar_length.length > 12) {
    return res.status(422).json({
      message: "Inavlid Aadhar !",
    });
  }

  if (pan_length.length < 10 || pan_length.length > 10) {
    return res.status(422).json({
      message: "Invalid Pan !",
    });
  }
  if (userid === "" && password === "") {
    if (
      !fname ||
      !lname ||
      !phone ||
      !address ||
      !gender ||
      !dob ||
      !aadhar ||
      !pan ||
      !reffered_id
    ) {
      return res.status(422).json({ message: "Please Fill all Details!" });
    } else {
      try {
        const userid = fname + Math.floor(Math.random() * 100000 + 1);
        const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);
        console.log(refferal_id);
        console.log(userid, "59");
        function makepassword(length) {
          let result = "";
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%&@#";
          const charactersLength = characters.length;
          let counter = 0;
          while (counter < length) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
            counter += 1;
          }
          return result;
        }

        const password = makepassword(8);
        //const userid = userid;
        // const pass = password;

        const userExist = await User.findOne({ userid: userid });
        if (userExist) {
          return res
            .status(400)
            .json({ message: "Something went wrong try again!" });
        }

        const user = new User({
          fname,
          lname,
          email,
          phone,
          address,
          gender,
          dob,
          aadhar,
          pan,
          refferal_id,
          reffered_id,
          aadhar_front_side,
          aadhar_back_side,
          pan_card,
          userid,
          password,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    if (
      !fname ||
      !lname ||
      !phone ||
      !address ||
      !gender ||
      !dob ||
      !aadhar ||
      !pan ||
      !reffered_id ||
      !userid ||
      !password
    ) {
      return res.status(422).json({ message: "Please Fill all Details!" });
    } else {
      try {
        const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);
        // const userid = userid;
        // const password = password;

        const userExist = await User.findOne({ userid: userid });
        if (userExist) {
          return res
            .status(400)
            .json({ message: "Something went wrong try again!" });
        }

        const user = new User({
          fname,
          lname,
          email,
          phone,
          address,
          gender,
          dob,
          aadhar,
          pan,
          refferal_id,
          reffered_id,
          aadhar_front_side,
          aadhar_back_side,
          pan_card,
          userid,
          password,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};

// blockUser

exports.blockUser = async (req, res) => {
  try {
    const { block, id } = req.body;
    let findUserData = await User.findOne({ _id: id });
    console.log(findUserData, 639);
    if (findUserData.paymentCount < 1 && !findUserData.paymentStatus) {
      let result = await User.updateOne(
        { _id: id },
        {
          $set: { isBlocked: block, doj : new Date() },
        }
      );
      if (result.modifiedCount > 0) {
        if (block) {
          return res.status(200).json({
            message: "User Blocked",
          });
        } else {
          return res.status(200).json({
            message: "User Unblocked",
          });
        }
      } else {
        return res.status(404).json({
          message: "Something Went wrong",
        });
      }
    } else {
      let result = await User.updateOne(
        { _id: id },
        {
          $set: { isBlocked: block },
        }
      );
      if (result.modifiedCount > 0) {
        if (block) {
          return res.status(200).json({
            message: "User Blocked",
          });
        } else {
          return res.status(200).json({
            message: "User Unblocked",
          });
        }
      } else {
        return res.status(404).json({
          message: "Something Went wrong",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};

// notificationForAll
exports.notificationForAll = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({
      message: "Please provide message",
    });
  }
  const notification = new notificationForAll({ message: message });
  await notification.save();
  console.log(notification, "431");
  if (notification) {
    User.updateMany({}, { notification: 1 })
      .then(() => {
        Member.updateMany({}, { notification: 1 })
          .then(() => {
            return res
              .status(201)
              .json({ message: "Notification pushed successfully" });
          })
          .catch((error) => {
            console.error("Error updating notification for member", error);
          });
      })
      .catch((error) => {
        console.error("Error Updating notification", error);
      });
  }
};

// notificationForAllTraders
exports.notificationForAllTraders = async (req, res) => {
  const { investerType, message } = req.body;
  if (!investerType || !message) {
    return res.status(400).json({
      message: "Please provide type and message",
    });
  }
  const notification = new notificationForAllTrader({
    investerType: investerType,
    message: message,
  });
  await notification.save();
  if (notification) {
    User.updateMany({}, { $inc: { notification: 1 } })
      .then(() => {
        return res
          .status(200)
          .json({ message: "Notification pushed successfully" });
      })
      .catch((error) => {
        console.error("Error Updating notification", error);
      });
  }
  // const users = await User.find({},'notification')
  // const notificationValues =  users.map((user) => user.notification);
  // console.log('notification values:',notificationValues);
};

// notificationForAllRefferal
exports.notificationForAllRefferal = async (req, res) => {
  const { investerType, message } = req.body;
  if (!investerType || !message) {
    return res.status(400).json({
      message: "Please provide type and message",
    });
  }
  const notification = new notificationForAllRefferal({
    investerType: investerType,
    message: message,
  });
  await notification.save();
  if (notification) {
    Member.updateMany({}, { $inc: { notification: 1 } })
      .then(() => {
        return res
          .status(201)
          .json({ message: "Notification pushed successfully" });
      })
      .catch((error) => {
        console.error("Error updating notification for member", error);
      });
  }
};

// notificationForParticularTrader
exports.notificationForParticularTrader = async (req, res) => {
  const { userid, message } = req.body;
  if (!userid || !message) {
    return res.status(400).json({
      message: "Please provide user ID and message",
    });
  }
  const userExist = await User.findOne({ userid: userid });
  if (!userExist) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  const notification = new notificationForParticularTrader({
    userid: userid,
    message: message,
  });
  await notification.save();
  if (notification) {
    User.updateOne({ userid: userid }, { $inc: { notification: 1 } })
      .then(() => {
        return res
          .status(201)
          .json({ message: "Notification pushed successfully" });
      })
      .catch((error) => {
        console.error("Error updating notification for member", error);
      });
  }
};

// notificationForParticularRefferal
exports.notificationForParticularRefferal = async (req, res) => {
  const { memberid, message } = req.body;
  if (!memberid || !message) {
    return res.status(400).json({
      message: "Please provide member ID and message",
    });
  }
  const memberExist = await Member.findOne({ memberid: memberid });
  if (!memberExist) {
    return res.status(400).json({ message: "Invalid Member ID" });
  }
  const notification = new notificationForParticularRefferal({
    memberid: memberid,
    message: message,
  });
  await notification.save();
  if (notification) {
    Member.updateOne({ memberid: memberid }, { $inc: { notification: 1 } })
      .then(() => {
        return res
          .status(201)
          .json({ message: "Notification pushed successfully" });
      })
      .catch((error) => {
        console.error("Error updating notification for member", error);
      });
  }
};

// fetchRefferalPayoutUser
exports.fetchRefferalPayoutUser = async (req, res) => {
  User.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res.status(200).json({ result });
    }
  });
};

// fetchRefferalPayoutMember
exports.fetchRefferalPayoutMember = async (req, res) => {
  Member.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res.status(200).json({ result });
    }
  });
};

// fetchRefferalPayoutWithdrawalRequest
exports.fetchRefferalPayoutWithdrawalRequest = async (req, res) => {
  const { memberid } = req.body;
  const memberWithdrawalRequest = await memberRefferalPayoutRequest.find({
    memberid: memberid,
  });
  if (memberWithdrawalRequest.length > 0) {
    return res.status(200).json({
      message: "Withdrawal Request fetched",
      memberWithdrawalRequest,
    });
  } else {
    return res.status(400).json({ message: "something went wrong" });
  }
};

// approveUserRefferalPayout
exports.approveUserRefferalPayout = async (req, res) => {
  const { id } = req.body;
  const user = await userRefferalPayoutRequest.findOne({ _id: id });
  if (!user) {
    return res.status(400).json({
      message: "User not Found",
    });
  } else {
    // console.log(user.userid);
    let userid = user.userid;
    let walletAmount = user.walletAmount;
    let requestDate = user.requestDate;
    console.log(userid, walletAmount, requestDate, "548");
    const approveRequestAmount = new userRefferalPayoutApproveWithdrawal({
      userid: userid,
      walletAmount: walletAmount,
      requestDate: requestDate,
      approveDate: new Date(),
    });
    approveRequestAmount.save();
    const deleteRequestUserRefferalPayout =
      await userRefferalPayoutRequest.deleteOne({ _id: id });
    if (deleteRequestUserRefferalPayout) {
      return res.status(200).json({
        message: "Request Approved",
      });
    } else {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

// fetchUserRefferalPayoutApproveWithdrawal
exports.fetchUserRefferalPayoutApproveWithdrawal = async (req, res) => {
  userRefferalPayoutApproveWithdrawal.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "Withdrawal Request fetched", result });
    }
  });
};

// adminFetchMemberRefferalPayoutRequest
exports.adminFetchMemberRefferalPayoutRequest = async (req, res) => {
  memberRefferalPayoutRequest.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "Withdrawal Request fetched", result });
    }
  });
};

// approveMemberRefferalPayout
exports.approveMemberRefferalPayout = async (req, res) => {
  const { id } = req.body;
  const member = await memberRefferalPayoutRequest.findOne({ _id: id });
  if (!member) {
    return res.status(400).json({
      message: "Member not Found",
    });
  } else {
    // console.log(user.userid);
    let memberid = member.memberid;
    let walletAmount = member.walletAmount;
    let requestDate = member.requestDate;
    let paymentBy = member.paymentBy;
    console.log(memberid, walletAmount, requestDate, "548");
    const approveRequestAmount = new memberRefferalPayoutApproveWithdrawal({
      memberid: memberid,
      walletAmount: walletAmount,
      requestDate: requestDate,
      paymentBy: paymentBy,
      approveDate: new Date(),
    });
    approveRequestAmount.save();
    const deleteRequestMemberRefferalPayout =
      await memberRefferalPayoutRequest.deleteOne({ _id: id });
    if (deleteRequestMemberRefferalPayout) {
      return res.status(200).json({
        message: "Request Approved",
      });
    } else {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

// fetchMemberRefferalPayoutApproveWithdrawal
exports.fetchMemberRefferalPayoutApproveWithdrawal = async (req, res) => {
  const { memberid } = req.body;
  const memberApproveWithdrawal =
    await memberRefferalPayoutApproveWithdrawal.find({ memberid });
  if (memberApproveWithdrawal) {
    return res.status(200).json({
      message: "Member approve withdrawal fetched",
      memberApproveWithdrawal,
    });
  } else {
    return res.status(400).json({ message: "Something went to wrong" });
  }
};

// fetchUserChatCount
exports.fetchUserChatCount = async (req, res) => {
  ChatType.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "Use Chat details fetched", result });
    }
  });
};

// fetchChatMessageAdmin
exports.fetchChatMessageAdmin = async (req, res) => {
  const { room } = req.body;
  let adminChatMessage = await chatMessage.find({ room: room });
  if (adminChatMessage) {
    return res.status(200).json({
      message: "Chat message fetched",
      adminChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// UserOnlineOrNot
exports.UserOnlineOrNot = async (req, res) => {
  const { userid } = req.body;
  console.log(userid, "933");
  let userOnlineOrNot = await User.findOne({ userid });
  console.log(userOnlineOrNot, "935");
  if (userOnlineOrNot) {
    const isOnline = userOnlineOrNot.isOnline;
    return res.status(200).json({
      message: "User Online status fetched",
      isOnline,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchRefferalChatCount
exports.fetchRefferalChatCount = async (req, res) => {
  RefferalChatType.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "Refferal Chat details fetched", result });
    }
  });
};

// refferalOnlineOrNot
exports.refferalOnlineOrNot = async (req, res) => {
  const { memberid } = req.body;
  let refferalOnlineOrNot = await Member.findOne({ memberid: memberid });
  if (refferalOnlineOrNot) {
    const isOnline = refferalOnlineOrNot.isOnline;
    return res.status(200).json({
      message: "Member Online status fetched",
      isOnline,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchRefferalChatMessageAdmin
exports.fetchRefferalChatMessageAdmin = async (req, res) => {
  const { room } = req.body;
  let adminChatMessage = await RefferalChatMessage.find({ room: room });
  if (adminChatMessage) {
    return res.status(200).json({
      message: "Chat message fetched",
      adminChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a new video
exports.createVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const videoLocation = req.files["videoOne"]?.[0]?.location || null;
    const thumbnailLocation = req.files["thumbnail"]?.[0]?.location || null;

    if (!title) {
      return res.status(400).json({ message: "Please provide title." });
    }
    if (!videoLocation) {
      return res.status(400).json({ message: "Please upload Video." });
    }
    if (!thumbnailLocation) {
      return res.status(400).json({ message: "Please upload Thumbnail file." });
    }

    const MAX_VIDEO_SIZE_BYTES = 1024 * 1024 * 1024; // 1024MB

    const videoFile = req.files["videoOne"][0];
    if (videoFile.size > MAX_VIDEO_SIZE_BYTES) {
      return res
        .status(400)
        .json({ message: "Video file size exceeds the maximum allowed size" });
    }

    const video = new Video({
      title,
      videoOne: videoLocation,
      thumbnail: thumbnailLocation,
    });

    const savedVideo = await video.save();

    res
      .status(201)
      .json({ message: "Video created successfully", video: savedVideo });
  } catch (error) {
    console.error("Failed to create video:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchParticularUserDetailsFromAdminUsingUserid = async (req, res) => {
  const { userid } = req.body;
  User.findOne({ userid })
    .then((result) => {
      res.status(200).json({
        message: `${userid}` + " details fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

//filter for add money
exports.filterTransactionsWithYearMonthWeek = async (req, res) => {
  try {
    const { userid, year, month } = req.body;

    if (!year && !month) {
      const allData = await WalletTransaction.find({ userid });
      return res
        .status(200)
        .json({ message: "All transactions fetched", allData });
    }

    // Validate that the provided year is a valid number
    if (year && isNaN(year)) {
      return res
        .status(400)
        .json({ error: "Invalid input. Year must be a number." });
    }

    // If month is provided, validate that it is a valid number
    if (month && isNaN(month)) {
      return res
        .status(400)
        .json({ error: "Invalid input. Month must be a number." });
    }

    let startDate, endDate;
    let filteredTransactions;

    if (year && month) {
      // Construct the date range based on the provided year and month
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);

      filteredTransactions = await WalletTransaction.find({
        userid,
        date: { $gte: startDate, $lte: endDate },
      }).exec();
    } else if (year) {
      // If only year is provided, fetch transactions for that year
      startDate = new Date(`${year}-01-01`);
      endDate = new Date(`${year}-12-31`);

      filteredTransactions = await WalletTransaction.find({
        userid,
        date: { $gte: startDate, $lte: endDate },
      }).exec();
    } else {
      // Handle the case where neither year nor month is provided
      return res
        .status(400)
        .json({ error: "Invalid input. Year or month is required." });
    }

    res.json({ transactions: filteredTransactions });
  } catch (error) {
    console.error("Error filtering transactions:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// adminFetchAllRenewalUser
exports.adminFetchAllRenewalUser = async (req, res) => {
  const getAllRenewalUser = await UserRenewal.find();

  if (getAllRenewalUser) {
    return res.status(200).json({
      message: "All renewal user fetched",
      data: getAllRenewalUser,
    });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetchAllNewPaidUser
exports.fetchAllNewPaidUser = async (req, res) => {
  const getAllPaidUser = await AllNewPaidUser.find();

  if (getAllPaidUser) {
    return res.status(200).json({
      message: "All paid user fetched",
      data: getAllPaidUser,
    });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// adminSumOfAllNewRenewalUserAmount
exports.adminSumOfAllNewRenewalUserAmount = async (req, res) => {
  try {
    // Calculate the sum of activationAmount from AllNewPaidUser collection
    const activationResult = await AllNewPaidUser.aggregate([
      {
        $group: {
          _id: null,
          activationAmountSum: { $sum: "$activationAmount" },
        },
      },
    ]);

    // Calculate the sum of renewalAmount from UserRenewal collection
    const renewalResult = await UserRenewal.aggregate([
      {
        $group: {
          _id: null,
          renewalAmountSum: { $sum: "$renewalAmount" },
        },
      },
    ]);

    // Get the sum of activationAmount and renewalAmount
    const sumOfActivationAmount =
      activationResult.length > 0 ? activationResult[0].activationAmountSum : 0;
    const sumOfRenewalAmount =
      renewalResult.length > 0 ? renewalResult[0].renewalAmountSum : 0;

    const totalSubscriptionAmount = sumOfActivationAmount + sumOfRenewalAmount;
    return res.status(200).json({
      message: "Sum of subscription amount for users",
      totalSubscriptionAmount,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//filter for withdrawl
exports.filterTransactionsForWithdrawlWithYearMonth = async (req, res) => {
  try {
    const { userid, year, month } = req.body;

    if (!year && !month) {
      const allData = await MoneyWithdrawlTransaction.find({ userid });
      return res
        .status(200)
        .json({ message: "All Withdrawl fetched", allData });
    }

    // Validate that the provided year is a valid number
    if (year && isNaN(year)) {
      return res
        .status(400)
        .json({ error: "Invalid input. Year must be a number." });
    }

    // If month is provided, validate that it is a valid number
    if (month && isNaN(month)) {
      return res
        .status(400)
        .json({ error: "Invalid input. Month must be a number." });
    }

    let startDate, endDate;
    let filteredTransactions;

    if (year && month) {
      // Construct the date range based on the provided year and month
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);

      filteredTransactions = await MoneyWithdrawlTransaction.find({
        userid,
        date: { $gte: startDate, $lte: endDate },
      }).exec();
    } else if (year) {
      // If only year is provided, fetch transactions for that year
      startDate = new Date(`${year}-01-01`);
      endDate = new Date(`${year}-12-31`);

      filteredTransactions = await MoneyWithdrawlTransaction.find({
        userid,
        date: { $gte: startDate, $lte: endDate },
      }).exec();
    } else {
      // Handle the case where neither year nor month is provided
      return res
        .status(400)
        .json({ error: "Invalid input. Year or month is required." });
    }

    res.json({ transactions: filteredTransactions });
  } catch (error) {
    console.error("Error filtering transactions:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.totalWithdrawalMoney = async (req, res) => {
  try {
    const { userid } = req.body;

    const user = await User.findOne({ userid: userid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalWithdrawnAmount = await MoneyWithdrawlTransaction.aggregate([
      { $match: { userid: userid } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amountWithdrawn" },
        },
      },
    ]);

    const result = totalWithdrawnAmount[0]?.totalAmount || 0;

    res.status(200).json({ totalWithdrawnAmount: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete-api/deleteController.js
exports.deleteVideo = async (req, res) => {
  const id = req.params.id; // Corrected order and accessing id property
  console.log(id, "???//");

  //

  try {
    const deleteVideo = await Video.findByIdAndDelete({ _id: id }); // Pass id as argument
    console.log(deleteVideo);

    if (!deleteVideo) {
      return res.status(404).json("Video not found");
    }

    return res.status(200).json("Video deleted successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// fetchRefferalPayoutOnRoleBasis
exports.fetchRefferalPayoutOnRoleBasis = async (req, res) => {
  try {
    const { role } = req.body;
    const refferalUserOnRole = await MyReferral.find({ role: role });
    if (refferalUserOnRole) {
      return res.status(200).json({
        message: "Refferal Fetched on role basis",
        data: refferalUserOnRole,
      });
    } else {
      return res.status(400).json({
        message: "No user Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

// searchRefferalPayoutByRefferUserid
exports.searchRefferalPayoutByRefferUserid = async (req, res) => {
  try {
    const { role, refferUserID } = req.body;
    const users = await MyReferral.find(
      { role: role },
      { refferUserID: refferUserID }
    );
    console.log(users);
    if (users.length === 0) {
      return res.status(404).json({
        message: "No data found",
      });
    }
    const filterData = await MyReferral.find({
      refferUserID: users[0].refferUserID,
    });
    if (filterData.length === 0) {
      return res.status(404).json({
        message: "No filter data found",
      });
    }
    return res.status(200).json({ message: "All data fetched", filterData });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

exports.totalCountOfPaymentStatusOfUser = async (req, res) => {
  try {
    const totalUsers = await User.find();
    let totalCount = totalUsers.length;

    let runningCount = 0;
    let expiredCount = 0;
    let inactiveCount = 0;

    totalUsers.forEach((user) => {
      if (user.isBlocked === true) {
        totalCount--;
      } else if (
        user.paymentCount === 0 &&
        user.paymentStatus === false &&
        user.isBlocked === false
      ) {
        inactiveCount++;
      } else if (
        user.paymentCount > 0 &&
        user.paymentStatus === true &&
        user.isBlocked === false
      ) {
        runningCount++;
      } else if (
        user.paymentCount > 0 &&
        user.paymentStatus === false &&
        user.isBlocked === false
      ) {
        expiredCount++;
      }
    });

    const runningPercentage = ((runningCount / totalCount) * 100).toFixed(2);
    const expiredPercentage = ((expiredCount / totalCount) * 100).toFixed(2);
    const inactivePercentage = ((inactiveCount / totalCount) * 100).toFixed(2);

    return res.status(200).json({
      totalCount,
      runningCount,
      runningPercentage,
      expiredCount,
      expiredPercentage,
      inactiveCount,
      inactivePercentage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// searchNewUsers
exports.searchNewUsers = async (req, res) => {
  try {
    const { userid } = req.body;

    const newSearchUser = await AllNewPaidUser.find({ userid: userid });
    if (newSearchUser.length > 0) {
      return res.status(200).json({
        message: " Details fetched",
        newSearchUser,
      });
    } else {
      return res.status(400).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// searchRenewalUsers
exports.searchRenewalUsers = async (req, res) => {
  try {
    const { userid } = req.body;

    const renewalSearchUser = await UserRenewal.find({ userid: userid });
    if (renewalSearchUser.length > 0) {
      return res.status(200).json({
        message: " Renewal Details fetched",
        renewalSearchUser,
      });
    } else {
      return res.status(400).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//find the users on the basis of payment status
exports.findUsersOnTheBasisOfPaymentStatus = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found in the database" });
    }

    const filteredInactiveUsers = users.filter(
      (user) =>
        user.paymentCount === 0 &&
        user.paymentStatus === false &&
        user.isBlocked === false
    );

    const filteredRunningUsers = users.filter(
      (user) =>
        user.paymentCount > 0 &&
        user.paymentStatus === true &&
        user.isBlocked === false
    );

    const filteredExpiredUsers = users.filter(
      (user) =>
        user.paymentCount > 0 &&
        user.paymentStatus === false &&
        user.isBlocked === false
    );

    // if (filteredInactiveUsers.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No users found with inactive payment statuses" });
    // }
    // if (filteredRunningUsers.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No users found with Running payment statuses" });
    // }
    // if (filteredExpiredUsers.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No users found with expired payment statuses" });
    // }

    return res.status(200).json({
      message:
        "Successfully fetched all users with different payment statuses.",
      inactiveUsers: filteredInactiveUsers,
      runningUsers: filteredRunningUsers,
      expiredUsers: filteredExpiredUsers,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//fetch particular user payment status

exports.fetchParticularUserPaymentStatus = async (req, res) => {
  try {
    const userid = req.body.userid;
    if (!userid) {
      return res.status(422).json({ message: "Userid is required" });
    }

    const user = await User.findOne({ userid: userid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let paymentStatus;
    if (user.paymentCount === 0 && user.paymentStatus === false) {
      paymentStatus = "Inactive";
    } else if (user.paymentCount > 0 && user.paymentStatus === false) {
      paymentStatus = "Expired";
    } else {
      paymentStatus = "Running";
    }

    return res.status(200).json({
      message: "particular user and their payment status fetched",
      user,
      paymentStatus,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.manageSubAdminRole = async (req, res) => {
  try {
    const { userId, isSubAdmin } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Please provide a userid" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedSubAdmin;
    let message;

    if (isSubAdmin === true) {
      updatedSubAdmin = await User.findOneAndUpdate(
        { _id: user._id },
        { isSubAdmin: true },
        { new: true }
      );
      message = "Now you are an SubAdmin";
    } else if (isSubAdmin === false) {
      updatedSubAdmin = await User.findOneAndUpdate(
        { _id: user._id },
        { isSubAdmin: false },
        { new: true }
      );
      message = "You are removed from SubAdmin role";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    return res.status(200).json({ message, updatedSubAdmin });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get all video
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
  } catch (error) {
    console.error("Failed to fetch video:", error);
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

exports.subAdminLogin = async (req, res) => {
  try {
    const { subAdminId, password } = req.body;

    if (!subAdminId || !password) {
      return res
        .status(400)
        .json({ message: "Please provide User Id and password" });
    }

    const subadmin = await subAdmin.findOne({ subAdminId: subAdminId });

    if (!subadmin) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (subadmin.isBlocked) {
      return res.status(401).json({ message: "You are Blocked" });
    }

    const passwordMatch = await bcrypt.compare(password, subadmin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect userId and password" });
    }

    const token = jwt.sign(
      { subAdminId: subadmin._id, role: "subAdmin" },
      process.env.SECRET_KEY,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      message: "Sub admin login successful",
      subadmin: subadmin,
      subAdmintoken: token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// createSubAdminInsideAdmin
exports.createSubAdminInsideAdmin = async (req, res) => {
  if (
    !req.files ||
    !req.files["aadhar_front_side"] ||
    !req.files["aadhar_back_side"] ||
    !req.files["pan_card"]
  ) {
    return res.status(422).json({
      message:
        "Please upload all required files (aadhar_front_side, aadhar_back_side, pan_card)",
    });
  }

  // const userType = "indian";
  const aadhar_front_side = req.files.aadhar_front_side[0].location;
  const aadhar_back_side = req.files.aadhar_back_side[0].location;
  const pan_card = req.files.pan_card[0].location;
  //console.log(aadhar_back, aadhar_front, pan_card,'140');

  const requiredFields = [
    "fname",
    "lname",
    "email",
    "phone",
    "gender",
    "dob",
    "aadhar",
    "pan",
    "password",
    "subAdminId",
  ];

  const {
    fname,
    lname,
    email,
    phone,
    gender,
    dob,
    aadhar,
    pan,
    subAdminId,
    password,
  } = req.body;

  // Check if any required field is missing
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(422).json({
      message: `Please fill all details: ${missingFields.join(", ")}`,
    });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid email address" });
  }

  const aadhar_length = aadhar;
  const pan_length = pan;
  //console.log(aadhar_length.length,'35');
  if (aadhar_length.length < 12 || aadhar_length.length > 12) {
    return res.status(422).json({
      message: "Inavlid Aadhar !",
    });
  }

  if (pan_length.length < 10 || pan_length.length > 10) {
    return res.status(422).json({
      message: "Invalid Pan !",
    });
  }
  try {
    const subAdminExist = await subAdmin.findOne({ subAdminId: subAdminId });
    if (subAdminExist) {
      return res
        .status(400)
        .json({ message: "this SubAdminId is already taken" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be minimum length of 8 charector!",
      });
    }

    const subadmin = new subAdmin({
      fname,
      lname,
      email,
      phone,
      gender,
      dob,
      aadhar,
      pan,
      aadhar_front_side,
      aadhar_back_side,
      pan_card,
      subAdminId,
      password,
    });
    await subadmin.save();
    const phone2 = "+" + subadmin.phone;
    // SuccessfullRegistrationSms(phone2, { "userid": user.userid, "password": password })

    const token = jwt.sign(
      { subAdminId: subadmin._id },
      process.env.SECRET_KEY,
      { expiresIn: 6000 } // Set the token to expire in 1 hour
    );
    res.status(201).json({
      message: "Sub-admin registered successfully",
      _id: subadmin._id,
      fname,
      subAdminId,
      token,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};
//===================================================================
exports.fetchAllSubAdminDetails = async (req, res) => {
  try {
    let subAdmins = await subAdmin.find();
    if (subAdmins.length == 0) {
      return res.status(404).json({ message: "No sub admin found" });
    }
    return res
      .status(200)
      .json({ message: "Fetched all sub admins", subAdmins });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//===================================================================
// register statte handler

exports.createStateHandler = async (req, res) => {
  try {
    const {
      fname,
      lname,
      phone,
      email,
      gender,
      password,
      stateHandlerId,
      selectedState,
      referredId,
      paymentRequestCount,
    } = req.body;

    if (!req.files["adhar_front_side"]) {
      return res
        .status(400)
        .json({ message: "Adhar card front side file is missing." });
    }

    if (!req.files["adhar_back_side"]) {
      return res
        .status(400)
        .json({ message: "Adhar card back side file is missing." });
    }

    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Pan card file is missing." });
    }

    const adharCardFrontFile = req.files["adhar_front_side"][0];
    const adharCardBackFile = req.files["adhar_back_side"][0];

    const panCardFile = req.files["panCard"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFrontFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adhar Card front side image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    if (!isValidImage(adharCardBackFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adhar Card back side image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardFrontLocation = adharCardFrontFile.location;
    const adharCardBackLocation = adharCardBackFile.location;

    const panCardLocation = panCardFile.location;

    const existingstateHandler = await StateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    if (existingstateHandler) {
      return res.status(422).json({
        message: "BMM iD already exists. Please choose a unique ID.",
      });
    }

    const requiredFields = [
      "fname",
      "lname",
      "email",
      "phone",
      "password",
      "gender",
      "stateHandlerId",
      "selectedState",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(422).json({
        message: `Please fill all details: ${missingFields.join(", ")}`,
      });
    }

    // Validate stateHandlerId uniqueness

    if (!isValidPhone(phone)) {
      return res.status(422).json({
        message:
          "Invalid phone number format. Use 10 digits or include country code.",
      });
    }

    if (!isValidName(fname) || !isValidName(lname)) {
      return res.status(422).json({
        message: "Invalid name format.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(422).json({
        message: "Invalid email format.",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(422).json({
        message:
          "Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
      });
    }

    if (!isValidUserId(stateHandlerId)) {
      return res.status(422).json({
        message:
          "User Id Should have at least 1 letter and 1 digit, minimum length 6.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //const referralId = `${fname.toLowerCase()}${randomDigits}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    const firstThreeDigits = `${fname.substring(0, 3).toUpperCase()}`;
    const referralId = "BMM" + "-" + firstThreeDigits + randomDigits;

    const frenchiseWallet = 0;
    // ------------------------

    const inputString = selectedState;
    const resultArray = inputString.split(",");

    // console.log(resultArray);
    const loginOtp = Math.floor(100000 + Math.random() * 900000);

    // -----------------------
    const newStateHandler = new StateHandler({
      fname,
      lname,
      phone,
      email,
      password: hashedPassword,
      gender,
      stateHandlerId,
      frenchiseWallet,
      referralId,
      referredId,
      selectedState: resultArray,
      paymentRequestCount,
      adhar_front_side: adharCardFrontLocation,
      adhar_back_side: adharCardBackLocation,
      panCard: panCardLocation,
      loginOtp,
    });

    const savedData = await newStateHandler.save();

    const token = jwt.sign(
      { stateHandlerId: savedData._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res.status(201).json({
      message: "BMM registed successfully.",
      token,
      stateHandlerDetails: savedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// fetchAllSubAdminDetails
exports.fetchAllSubAdminDetails = async (req, res) => {
  // if (!req.files["panCard"] || req.files["panCard"].length === 0) {
  //   return res.status(400).json({ message: "Pan card file is missing." });
  // }

  try {
    const getAllSubAdmin = await subAdmin.find();
    if (getAllSubAdmin) {
      return res.status(200).json({
        message: "All Subadmin  fetched",
        data: getAllSubAdmin,
      });
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//=================================================================
//create Frenchise
exports.createFrenchise = async (req, res) => {
  try {
    const {
      fname,
      lname,
      phone,
      email,
      gender,
      referredId,
      password,
      franchiseCity,
      frenchiseId,
      franchiseState,
      paymentRequestCount,
    } = req.body;

    if (!req.files["adhar_front_side"]) {
      return res
        .status(400)
        .json({ message: "Adhar card front side file is missing." });
    }

    if (!req.files["adhar_back_side"]) {
      return res
        .status(400)
        .json({ message: "Adhar card back side file is missing." });
    }

    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Pan card file is missing." });
    }

    const adharFrontSideFile = req.files["adhar_front_side"][0];
    const adharBackSideFile = req.files["adhar_back_side"][0];

    const panCardFile = req.files["panCard"][0];

    if (!isValidImage(adharFrontSideFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid aadhar Card front side image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    if (!isValidImage(adharBackSideFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adhar Card back side image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid pan Card image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    // const adharCardLocation = adharCardFile.location;

    const adharFrontSideLocation = adharFrontSideFile.location;
    const adharbackSideLocation = adharBackSideFile.location;

    const panCardLocation = panCardFile.location;

    const requiredFields = [
      "fname",
      "lname",
      "email",
      "phone",
      "password",
      "gender",
      "referredId",
      "franchiseCity",
      "frenchiseId",
      "franchiseState",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(422).json({
        message: `Please fill all details: ${missingFields.join(", ")}`,
      });
    }

    // Validate stateHandlerId uniqueness
    const existingFrenchise = await Frenchise.findOne({
      frenchiseId: frenchiseId,
    });

    if (existingFrenchise) {
      return res.status(422).json({
        message: "User ID already exists. Please choose a unique ID.",
      });
    }

    // Is referred id exist in Frenchise collection

    const existReferredId = await StateHandler.findOne({
      referralId: referredId,
    });

    if (!existReferredId) {
      return res.status(400).json({ message: "invalid reffered Id" });
    }

    if (!isValidPhone(phone)) {
      return res.status(422).json({
        message:
          "Invalid phone number format. Use 10 digits or include country code.",
      });
    }

    if (!isValidName(fname) || !isValidName(lname)) {
      return res.status(422).json({
        message: "Invalid name format.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(422).json({
        message: "Invalid email format.",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(422).json({
        message:
          "Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
      });
    }

    if (!isValidUserId(frenchiseId)) {
      return res.status(422).json({
        message:
          "User Id Should have at least 1 letter and 1 digit, minimum length 6.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //const referralId = `${fname.toLowerCase()}${randomDigits}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    const firstThreeDigits = `${fname.substring(0, 3).toUpperCase()}`;
    const referralId = "FC" + "-" + firstThreeDigits + randomDigits;
    console.log(referralId, "1886");

    const frenchiseWallet = 0;

    const inputString = franchiseCity;
    const resultArray = inputString.split(",");

    console.log(resultArray);

    const newFranchise = new Frenchise({
      fname,
      lname,
      phone,
      email,
      password: hashedPassword,
      gender,
      franchiseCity: resultArray,
      frenchiseId,
      referredId,
      frenchiseWallet,
      referralId,
      franchiseState,
      paymentRequestCount,
      adhar_front_side: adharFrontSideLocation,
      adhar_back_side: adharbackSideLocation,
      panCard: panCardLocation,
    });

    const savedFranchise = await newFranchise.save();

    const token = jwt.sign(
      { franchiseId: savedFranchise._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res.status(201).json({
      message: "Franchise registed successfully",
      token,
      frenchiseDetails: savedFranchise,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//======================================================================
//cretae Business Developer
exports.createBusinnesDeveloper = async (req, res) => {
  try {
    const {
      fname,
      lname,
      phone,
      email,
      gender,
      password,
      businessDeveloperId,
      referredId,
      buisnessCity,
      paymentRequestCount,
    } = req.body;

    if (!req.files["adhar_back_side"]) {
      return res
        .status(400)
        .json({ message: "Adhar card  back side file is missing." });
    }

    if (!req.files["adhar_front_side"]) {
      return res
        .status(400)
        .json({ message: "Adhar card front side file is missing." });
    }

    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Pan card file is missing." });
    }

    const adharCardBackFile = req.files["adhar_back_side"][0];
    const adharCardFrontFile = req.files["adhar_front_side"][0];
    const panCardFile = req.files["panCard"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardBackFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adhar Card back side image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    if (!isValidImage(adharCardFrontFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adhar Card front side image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharBackLocation = adharCardBackFile.location;
    const adharFrontLocation = adharCardFrontFile.location;
    const panCardLocation = panCardFile.location;

    const requiredFields = [
      "fname",
      "lname",
      "email",
      "phone",
      "password",
      "businessDeveloperId",
      "referredId",
      "buisnessCity",
      "gender",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(422).json({
        message: `Please fill all details: ${missingFields.join(", ")}`,
      });
    }

    // Validate stateHandlerId uniqueness
    const existingBusinessDeveloperId = await BusinessDeveloper.findOne({
      businessDeveloperId: businessDeveloperId,
    });
    if (existingBusinessDeveloperId) {
      return res.status(422).json({
        message:
          "This Business Developer ID already exists. Please choose a unique ID.",
      });
    }

    // Is referred id exist in Frenchise collection

    const existReferredId = await Frenchise.findOne({ referralId: referredId });

    if (!existReferredId) {
      return res.status(400).json({ message: "invalid reffered Id" });
    }

    if (!isValidPhone(phone)) {
      return res.status(422).json({
        message:
          "Invalid phone number format. Use 10 digits or include country code.",
      });
    }

    if (!isValidName(fname) || !isValidName(lname)) {
      return res.status(422).json({
        message: "Invalid name format.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(422).json({
        message: "Invalid email format.",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(422).json({
        message:
          "Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
      });
    }

    if (!isValidUserId(businessDeveloperId)) {
      return res.status(422).json({
        message:
          "Business Developer Id Should have at least 1 letter and 1 digit, minimum length 6.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const shortFname = fname.substring(0, 3).toUpperCase();

    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    const firstThreeDigits = `${fname.substring(0, 3).toUpperCase()}`;
    const referralId = "BD" + "-" + firstThreeDigits + randomDigits;
    console.log(referralId);

    const businessDeveloperWallet = 0;
    const newBusinessDeveloper = new BusinessDeveloper({
      fname,
      lname,
      phone,
      email,
      password: hashedPassword,
      gender,
      businessDeveloperId,
      adhar_back_side: adharBackLocation,
      adhar_front_side: adharFrontLocation,

      panCard: panCardLocation,
      referralId,
      referredId,
      businessDeveloperWallet,
      buisnessCity,
      paymentRequestCount,
    });

    const savedBusinessDeveloper = await newBusinessDeveloper.save();

    return res.status(201).json({
      message: "Business Developer created successfully",

      savedBusinessDeveloper,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//===========================================================================
//state handler login

exports.stateHandlerLogin = async (req, res) => {
  try {
    const { stateHandlerId, password } = req.body;

    if (!stateHandlerId || !password) {
      return res
        .status(400)
        .json({ message: "Please provide BMM id and Password" });
    }

    const existingStateHandler = await StateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    if (!existingStateHandler) {
      return res.status(400).json({ message: "Invalid Credential." });
    }

    if (existingStateHandler.isDeleted) {
      return res.status(400).json({ message: "State not found" });
    }
    if (existingStateHandler.isBlocked) {
      return res.status(400).json({ message: "Your account has been blocked" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingStateHandler.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credential." });
    }

    const token = jwt.sign(
      { stateHandlerId: existingStateHandler._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      message: "BMM login successful",
      statehandlerToken: token,
      stateHandlerDetails: existingStateHandler,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//============================================================================
//frenchise login
exports.frenchiseLogin = async (req, res) => {
  try {
    const { frenchiseId, password } = req.body;

    if (!frenchiseId || !password) {
      return res
        .status(400)
        .json({ message: "Please provide  User Id and password" });
    }

    const existingFrenchiseId = await Frenchise.findOne({
      frenchiseId: frenchiseId,
    });

    if (!existingFrenchiseId) {
      return res.status(400).json({ message: "Invalid Credential." });
    }

    if (existingFrenchiseId.isDeleted) {
      return res.status(400).json({ message: "Franchise not found" });
    }
    if (existingFrenchiseId.isBlocked) {
      return res.status(400).json({ message: "Your account has been blocked" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingFrenchiseId.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credential." });
    }
    const token = jwt.sign(
      { franchiseId: existingFrenchiseId._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      message: "Frenchise login successful",
      frenchiseToken: token,
      frenchiseDetails: existingFrenchiseId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//============================================================================
// business developer login
exports.businessDeveloperLogin = async (req, res) => {
  try {
    const { businessDeveloperId, password } = req.body;

    if (!businessDeveloperId || !password) {
      return res
        .status(400)
        .json({ message: "Please provide business developer Id and password" });
    }

    const existingBusinessDeveloper = await BusinessDeveloper.findOne({
      businessDeveloperId: businessDeveloperId,
    });

    if (!existingBusinessDeveloper) {
      return res
        .status(400)
        .json({ message: "Invalid business developer Id or Password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingBusinessDeveloper.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid Business Developer Id or Password" });
    }
    const token = jwt.sign(
      { businessDeveloperId: existingBusinessDeveloper._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      message: "Business developer login successful",
      businessDeveloperToken: token,
      businessDeveloperDetails: existingBusinessDeveloper,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// verifyFranchieBeforeRegistration
exports.verifyFranchieBeforeRegistration = async (req, res) => {
  try {
    const { refferId } = req.body;
    if (!refferId) {
      return res.status(422).json({
        message: "Please enter refferId",
      });
    }

    const stateUser = await StateHandler.findOne({ referralId: refferId });
    if (stateUser) {
      const stateUserState = stateUser.selectedState;
      return res.status(200).json({
        message: "State user found",
        stateUserState,
      });
    } else {
      return res.status(404).json({
        message: "Please provide a valid referral Id",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// verifyBuisnessDeveloperBeforeRegistration
exports.verifyBuisnessDeveloperBeforeRegistration = async (req, res) => {
  try {
    const { refferId } = req.body;
    if (!refferId) {
      return res.status(422).json({
        message: "Please enter refferId",
      });
    }

    const franchieUser = await Frenchise.findOne({ referralId: refferId });

    if (franchieUser) {
      const franchieUserCity = franchieUser.franchiseCity;
      return res.status(200).json({
        message: "Franchise user found",
        franchieUserCity,
      });
    } else {
      return res.status(404).json({
        message: "Please provide a valid referral Id",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};
//=======================================================================

exports.interactWithVideoForAdmin = async (req, res) => {
  try {
    const { videoId, action, comments, replyTo } = req.body;
    const userId =
      req.userId ||
      req.stateHandlerId ||
      req.businessDeveloperId ||
      req.franchiseId ||
      req.subAdminId;

    let user = null;

    if (req.userId) {
      user =
        (await Admin.findById(userId)) ||
        (await User.findById(userId)) ||
        (await Member.findById(userId));
    } else if (req.stateHandlerId) {
      user = await StateHandler.findById(userId);
    } else if (req.businessDeveloperId) {
      user = await BusinessDeveloper.findById(userId);
    } else if (req.franchiseId) {
      user = await Franchise.findById(userId); // Corrected typo here (Frenchise -> Franchise)
    } else if (req.subAdminId) {
      user = await SubAdmin.findById(userId); // Corrected typo here (subAdmin -> SubAdmin)
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!videoId || !action) {
      return res
        .status(400)
        .json({ message: "Video Id and action are required" });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }
    if (action === "like") {
      const existingLike = await Like.findOne({ userId, videoId });
      const existingDisLike = await DisLike.findOne({ userId, videoId });

      if (!existingLike) {
        video.likes += 1;
        const newLike = new Like({ userId, videoId, likeType: true });
        await newLike.save();
      } else if (existingLike.likeType === false) {
        video.likes += 1;
        existingLike.likeType = true;
        await existingLike.save();
      } else if (existingLike.likeType === true) {
        video.likes -= 1;
        existingLike.likeType = false;
        await existingLike.save();
      }

      if (existingDisLike && existingDisLike.disLikeType === true) {
        video.dislikes -= 1;
        existingDisLike.disLikeType = false;
        await existingDisLike.save();
      }
    } else if (action === "dislike") {
      const existingDisLike = await DisLike.findOne({ userId, videoId });
      const existingLike = await Like.findOne({ userId, videoId });

      if (!existingDisLike) {
        video.dislikes += 1;
        const newDisLike = new DisLike({ userId, videoId, disLikeType: true });
        await newDisLike.save();
      } else if (existingDisLike.disLikeType === false) {
        video.dislikes += 1;
        existingDisLike.disLikeType = true;
        await existingDisLike.save();
      } else if (existingDisLike.disLikeType === true) {
        video.dislikes -= 1;
        existingDisLike.disLikeType = false;
        await existingDisLike.save();
      }

      if (existingLike && existingLike.likeType === true) {
        video.likes -= 1;
        existingLike.likeType = false;
        await existingLike.save();
      }

      //================
    } else if (action === "comment") {
      if (!comments) {
        return res
          .status(400)
          .json({ message: "Comments are required for 'comment' action" });
      }

      if (replyTo) {
        const commentToReply = video.comments.find(
          (c) => c._id.toString() === replyTo
        );

        if (commentToReply) {
          if (user.fname && user.lname) {
            commentToReply.replies.push({
              text: comments,
              userId: userId,
              userName: user.fname + " " + user.lname,
            });
          } else {
            // Handle the case where both fname and lname are missing
            commentToReply.replies.push({
              text: comments,
              userId: userId,
              userName: "Admin",
            });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Comment to reply not found" });
        }
      } else {
        // Check if the user object has both fname and lname properties
        if (user.fname && user.lname) {
          video.comments.push({
            text: comments,
            userId: userId,
            userName: user.fname + " " + user.lname,
          });
        } else {
          // Handle the case where both fname and lname are missing
          video.comments.push({
            text: comments,
            userId: userId,
            userName: "Admin",
          });
        }
      }
    } else if (action === "view") {
      video.views += 1;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updatedVideo = await video.save();

    res.status(200).json({
      message: "Video interaction updated successfully",
      video: updatedVideo,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//===========================================================
exports.AdminfetchUserOneVideoLike = async (req, res) => {
  try {
    const { videoId, likeType } = req.body;
    const userId =
      req.userId ||
      req.stateHandlerId ||
      req.businessDeveloperId ||
      req.franchiseId ||
      req.subAdminId;

    const like = await Like.findOne({ userId, videoId, likeType });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ like });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.AdminfetchUserOneVideoDisLike = async (req, res) => {
  try {
    const { videoId, disLikeType } = req.body;
    const userId =
      req.userId ||
      req.stateHandlerId ||
      req.businessDeveloperId ||
      req.franchiseId ||
      req.subAdminId;

    const dislike = await DisLike.findOne({ userId, videoId, disLikeType });

    if (!dislike) {
      return res.status(404).json({ message: "Dislike not found" });
    }

    res.status(200).json({ dislike });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//==========================================================

exports.findAllState = async (req, res) => {
  try {
    const allstate = await StateHandler.find();
    if (allstate.length === 0) {
      return res.status(404).json({ message: "no state found" });
    }

    res
      .status(200)
      .json({ message: "state find successfully", data: allstate });
  } catch (error) {
    res.status(500).json({ message: "an error occured", error: error.message });
  }
};

//==================================================================

exports.findAllFrenchise = async (req, res) => {
  try {
    const allFrenchise = await Frenchise.find();
    if (!allFrenchise) {
      res.status(404).json({ message: "no frenchise found" });
    }
    res
      .status(200)
      .json({ message: "frenchise find successfully", data: allFrenchise });
  } catch (error) {
    res.status(500).json({ message: "an erro occured", error: error.message });
  }
};

//===========================================================================

exports.findAllBusinessDeveloper = async (req, res) => {
  try {
    const allBusinessDeveloper = await BusinessDeveloper.find();
    if (!allBusinessDeveloper) {
      res.status(402).json({ message: "no businessDeveloper found" });
    }
    res.status(200).json({
      message: "stateDeveloper found successfully",
      data: allBusinessDeveloper,
    });
  } catch (error) {
    res.status(500).json({ message: "an error occured", error: error.message });
  }
};

//===================================================================================================
//fetchBusinessDeveloperCreditwalletTransactionDetails
exports.fetchBusinessDeveloperCreditwalletTransactionDetails = async (
  req,
  res
) => {
  try {
    const fetchedData = await BusinessDeveloperCreditWalletTransaction.find();
    if (fetchedData.length == 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json({ message: "Fetched all data", fetchedData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//=======================================================================

exports.fetchFranchiseCreditwalletTransactionDetails = async (req, res) => {
  try {
    const fetchedData = await FranchiseCreditWalletTransaction.find();
    if (fetchedData.length == 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json({ message: "Fetched all data", fetchedData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//=============================================================

// fetchStateHandlerCreditwalletTransactionDetails

exports.fetchStateHandlerCreditwalletTransactionDetails = async (req, res) => {
  try {
    const fetchedData = await StateHandlerCreditWalletTransaction.find();
    if (fetchedData.length == 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json({ message: "Fetched all data", fetchedData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//================================================================
exports.fetchAdminCreditwalletTransactionDetails = async (req, res) => {
  try {
    const fetchedData = await AdminCreditWalletTransaction.find();
    if (fetchedData.length == 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json({ message: "Fetched all data", fetchedData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//==========================================================================
//fetchMemberCreditwalletTransactionDetails
exports.fetchMemberCreditwalletTransactionDetails = async (re1q, res) => {
  try {
    const fetchedData = await MemberCreditWalletTransaction.find();
    if (fetchedData.length == 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json({ message: "Fetched all data", fetchedData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//====================================================================
exports.fetchUserCreditwalletTransactionDetails = async (re1q, res) => {
  try {
    const fetchedData = await UserCreditWalletTransaction.find();
    if (fetchedData.length == 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json({ message: "Fetched all data", fetchedData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// stateOnlineOrNot
exports.stateOnlineOrNot = async (req, res) => {
  const { stateHandlerId } = req.body;
  let stateOnlineOrNot = await StateHandler.findOne({
    stateHandlerId: stateHandlerId,
  });
  if (stateOnlineOrNot) {
    const isOnline = stateOnlineOrNot.isOnline;
    return res.status(200).json({
      message: "State Online status fetched",
      isOnline,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchStateChatMessageAdmin
exports.fetchStateChatMessageAdmin = async (req, res) => {
  const { room } = req.body;
  let adminChatMessage = await StateChatMessage.find({ room: room });
  if (adminChatMessage) {
    return res.status(200).json({
      message: "Chat message fetched",
      adminChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchStateChatCount
exports.fetchStateChatCount = async (req, res) => {
  StateChatType.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "State Chat details fetched", result });
    }
  });
};
//==========================================================================

// fetch Frenchise Chat Count
exports.fetchFrenchiseChatCount = async (req, res) => {
  FrenchChatType.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "State Chat details fetched", result });
    }
  });
};

// fetchFrenchChatMessageAdmin
exports.fethcFrenchiseChatMessageAdmin = async (req, res) => {
  const { room } = req.body;
  let frenchChatMessage = await FrenchChatMessage.find({ room: room });
  if (frenchChatMessage) {
    return res.status(200).json({
      message: " French Chat message fetched",
      frenchChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// adminFrenchiseOnlineOrNot
exports.adminFrenchiseOnlineOrNot = async (req, res) => {
  const { frenchiseId } = req.body;
  let frenchOnlineOrNot = await Frenchise.findOne({ frenchiseId: frenchiseId });
  if (frenchOnlineOrNot) {
    const isOnline = frenchOnlineOrNot.isOnline;
    return res.status(200).json({
      message: "French Online status fetched",
      isOnline,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.blockStateByAdmin = async (req, res) => {
  try {
    const { id, block } = req.body;

    const state = await StateHandler.findById(id);

    if (!state) {
      return res
        .status(404)
        .json({ message: "BMM not found for the given ID" });
    }

    if (block === state.isBlocked) {
      return res.status(400).json({
        message: `BMM is already ${block ? "blocked" : "unblocked"}`,
      });
    }

    const updatedState = await StateHandler.findByIdAndUpdate(
      { _id: id },
      { $set: { isBlocked: block } }
    );

    return res.status(200).json({
      message: `BMM ${block ? "blocked" : "unblocked"} successfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=====================================================================

exports.blockFranchiseByAdmin = async (req, res) => {
  try {
    const { id, block } = req.body;

    const franchise = await Franchise.findById(id);

    if (!franchise) {
      return res
        .status(404)
        .json({ message: "Franchise not found for the given ID" });
    }

    if (block === franchise.isBlocked) {
      return res.status(400).json({
        message: `Franchise is already ${block ? "blocked" : "unblocked"}`,
      });
    }

    const updatedFranchise = await Franchise.findByIdAndUpdate(
      { _id: id },
      { $set: { isBlocked: block } }
    );

    return res.status(200).json({
      message: `Franchise ${block ? "blocked" : "unblocked"} successfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=====================================================================

exports.blockBusinessDeveloperByAdmin = async (req, res) => {
  try {
    const { id, block } = req.body;

    const businessDeveloper = await BusinessDeveloper.findById(id);

    if (!businessDeveloper) {
      return res
        .status(404)
        .json({ message: "Business Developer not found for the given ID" });
    }

    if (block === businessDeveloper.isBlocked) {
      return res.status(400).json({
        message: `Business Developer is already ${
          block ? "blocked" : "unblocked"
        }`,
      });
    }

    const updatedBusinessDeveloper = await BusinessDeveloper.findByIdAndUpdate(
      { _id: id },
      { $set: { isBlocked: block } }
    );

    return res.status(200).json({
      message: `Business Developer ${
        block ? "blocked" : "unblocked"
      } successfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//========================================================================
//update state

exports.updateStateHandler = async (req, res) => {
  try {
    const { fname, lname, phone, email, gender, selectedState } = req.body;
    const id = req.body.id;

    // Validate input fields
    if (!fname || !lname || !phone || !email || !gender || !selectedState) {
      return res.status(422).json({ message: "All fields are required." });
    }

    // Validate name format
    if (!isValidName(fname)) {
      return res.status(422).json({ message: "Invalid first name format." });
    }

    // Validate name format
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

    // Update state information
    const updateData = {
      fname,
      lname,
      phone,
      email,
      gender,
      selectedState,
    };

    const updatedState = await StateHandler.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedState) {
      return res.status(404).json({ message: "State not found" });
    }

    res
      .status(200)
      .json({ message: "State updated successfully", state: updatedState });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update pan state
exports.updatePanCardStateHandler = async (req, res) => {
  try {
    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Please uplaod Pan Card" });
    }
    const { id } = req.body;
    const panCardFile = req.files["panCard"][0];

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const panCardLocation = panCardFile.location;

    // Update state handler's PAN card information
    const updateData = {
      panCard: panCardLocation,
    };

    const stateHandler = await StateHandler.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!stateHandler) {
      return res.status(404).json({ message: "State handler not found" });
    }

    res.status(200).json({
      message: "PAN card updated successfully",
      panCard: stateHandler.panCard,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//====================================================================
exports.updateAdharCardFrontSideStateHandler = async (req, res) => {
  try {
    const { id } = req.body;

    if (!req.files["adhar_front_side"]) {
      return res
        .status(400)
        .json({ message: "Please uplaod adhar card front side" });
    }

    const adharCardFile = req.files["adhar_front_side"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adhar Card front side image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;

    // Update state handler's Aadhar card information
    const updateData = {
      adhar_front_side: adharCardLocation,
    };

    const stateHandler = await StateHandler.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!stateHandler) {
      return res.status(404).json({ message: "State handler not found" });
    }

    res.status(200).json({
      message: "Aadhar card front side updated successfully",
      adharCardFrontSide: stateHandler.adhar_front_side,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//==================================================================

exports.updateAdharCardBackSideStateHandler = async (req, res) => {
  try {
    const { id } = req.body;

    if (!req.files["adhar_back_side"]) {
      return res
        .status(400)
        .json({ message: "Please uplaod adhar card back side" });
    }

    const adharCardFile = req.files["adhar_back_side"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adhar Card back side image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;

    // Update state handler's Aadhar card information
    const updateData = {
      adhar_back_side: adharCardLocation,
    };

    const stateHandler = await StateHandler.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!stateHandler) {
      return res.status(404).json({ message: "State handler not found" });
    }

    res.status(200).json({
      message: "Aadhar card back side updated successfully",
      adharCardBackSide: stateHandler.adhar_back_side,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//======================================================================
//update franchise
exports.updateFranchise = async (req, res) => {
  try {
    const {
      fname,
      lname,
      phone,
      email,
      password,
      gender,
      franchiseCity,
      franchiseState,
    } = req.body;
    const id = req.body.id;

    // Validate input fields
    if (!fname || !lname || !phone || !email || !gender) {
      return res.status(422).json({ message: "All fields are required." });
    }

    // Validate name format
    if (!isValidName(fname)) {
      return res.status(422).json({ message: "Invalid name format." });
    }

    // Validate name format
    if (!isValidName(lname)) {
      return res.status(422).json({ message: "Invalid name format." });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(422).json({ message: "Invalid email format." });
    }

    // Validate phone number format
    if (!isValidPhone(phone)) {
      return res.status(422).json({ message: "Invalid phone number format." });
    }

    const franchise = await Frenchise.findOne({ _id: id, isDeleted: false });

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    // Clear franchiseCity array if franchiseState is changed
    if (franchise.franchiseState !== franchiseState) {
      franchise.franchiseCity = [];
    }

    // Push new values into the franchiseCity array
    // if (Array.isArray(franchiseCity)) {
    //   franchise.franchiseCity.push(...franchiseCity);
    // }

    franchise.fname = fname;
    franchise.lname = lname;
    franchise.phone = phone;
    franchise.email = email;
    franchise.gender = gender;
    franchise.franchiseState = franchiseState;
    franchise.franchiseCity = franchiseCity;

    const updatedFranchise = await franchise.save();

    res.status(200).json({
      message: "Franchise updated successfully",
      franchise: updatedFranchise,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=======================================================================
//=======================================================================
exports.updateAdharCardFrontSideFranchise = async (req, res) => {
  try {
    const { id } = req.body;

    if (!req.files["adhar_front_side"]) {
      return res
        .status(400)
        .json({ message: "Please uplaod adhar card front side" });
    }
    const adharCardFile = req.files["adhar_front_side"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;

    // Update franchise's adharCard information
    const updateData = {
      adhar_front_side: adharCardLocation,
    };

    const franchise = await Frenchise.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true }
    );

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    res.status(200).json({
      message: "Aadhar card Front Side updated successfully",
      adharCardFrontSide: franchise.adhar_front_side,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//==================================================================
exports.updateAdharCardBackSideFranchise = async (req, res) => {
  try {
    const { id } = req.body;

    if (!req.files["adhar_back_side"]) {
      return res
        .status(400)
        .json({ message: "Please uplaod adhar card back side" });
    }
    const adharCardFile = req.files["adhar_back_side"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;

    // Update franchise's adharCard information
    const updateData = {
      adhar_back_side: adharCardLocation,
    };

    const franchise = await Frenchise.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true }
    );

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    res.status(200).json({
      message: "Aadhar card Back Side updated successfully",
      adharCardBackSide: franchise.adhar_back_side,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//=======================================================================
exports.updatePanCardFranchise = async (req, res) => {
  try {
    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Please uplaod Pan Card" });
    }
    const { id } = req.body;
    const panCardFile = req.files["panCard"][0];

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const panCardLocation = panCardFile.location;

    // Update franchise's panCard information
    const updateData = {
      panCard: panCardLocation,
    };

    const franchise = await Frenchise.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true }
    );

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    res.status(200).json({
      message: "PAN card updated successfully",
      panCard: franchise.panCard,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePanCardBusinessDeveloper = async (req, res) => {
  try {
    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Please uplaod Pan Card" });
    }
    const { id } = req.body;
    const panCardFile = req.files["panCard"][0];

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const panCardLocation = panCardFile.location;

    // Update business developer's panCard information
    const updateData = {
      panCard: panCardLocation,
    };

    const businessDeveloper = await BusinessDeveloper.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    res.status(200).json({
      message: "PAN card updated successfully",
      panCard: businessDeveloper.panCard,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=========================================================================
// update business developer
exports.updateBusinessDeveloper = async (req, res) => {
  try {
    const { fname, lname, phone, email, gender, buisnessCity } = req.body;
    const id = req.body.id;

    // Validate input fields
    if (!fname || !lname || !phone || !email || !gender || !buisnessCity) {
      return res.status(422).json({ message: "All fields are required." });
    }

    // Validate name format
    if (!isValidName(fname)) {
      return res.status(422).json({ message: "Invalid first name format." });
    }

    // Validate name format
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

    // Update business developer information
    const updateData = {
      fname,
      lname,
      phone,
      email,
      gender,
      buisnessCity,
    };

    const updatedBusinessDeveloper = await BusinessDeveloper.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true }
    );

    if (!updatedBusinessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    res.status(200).json({
      message: "Business developer updated successfully",
      businessDeveloper: updatedBusinessDeveloper,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetchBusinessChatCount
exports.fetchBusinessChatCount = async (req, res) => {
  BusinessDeveloperChatType.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "Business Chat details fetched", result });
    }
  });
};

// fetchBusinessChatMessageAdmin
exports.fetchBusinessChatMessageAdmin = async (req, res) => {
  const { room } = req.body;
  let businessChatMessage = await BusinessDeveloperChatMessage.find({
    room: room,
  });
  if (businessChatMessage) {
    return res.status(200).json({
      message: " Business Chat message fetched",
      businessChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// adminBusinessOnlineOrNot
exports.adminBusinessOnlineOrNot = async (req, res) => {
  const { businessDeveloperId } = req.body;
  let businessOnlineOrNot = await BusinessDeveloper.findOne({
    businessDeveloperId: businessDeveloperId,
  });
  if (businessOnlineOrNot) {
    const isOnline = businessOnlineOrNot.isOnline;
    return res.status(200).json({
      message: "Business Online status fetched",
      isOnline,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
//=========================================================================

//get  one franchisde
exports.getOneFranchiseDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const franchise = await Frenchise.findOne({ _id: id });

    console.log("franchise", franchise);

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

//==========================================================================
//get one business developer
exports.getOneBDDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const businessDeveloper = await BusinessDeveloper.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business Developer not found" });
    }

    res.status(200).json({
      message: "Fetched Business Developer successfully",
      data: businessDeveloper,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//===========================================================================

exports.getOneStateDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const state = await StateHandler.findOne({ _id: id, isDeleted: false });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    res
      .status(200)
      .json({ message: "Fetched State successfully", data: state });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//========================================================================

exports.getOneMemberDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const member = await Member.findOne({ _id: id });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res
      .status(200)
      .json({ message: "Fetched member successfully", data: member });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//======================================================================\
//fetch admin

exports.fetchAdmin = async (req, res) => {
  try {
    const id = req.userId;
    let admin = await Admin.findOne({ _id: id });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log(admin, "admin details");
    console.log(admin.adminWallet, "3401");
    console.log(admin.referralId, "3401");

    return res
      .status(200)
      .json({ message: "Fetched admin details", data: admin });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//==========================================================================

exports.fetchCityByReferralIdInFranchise = async (req, res) => {
  try {
    const { franchiseReferralId } = req.body;
    const franchise = await Franchise.findOne({
      referralId: franchiseReferralId,
    });
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    return res.status(200).json({
      message: "Fetched franchise successfully",
      CityList: franchise.franchiseCity,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update  adhar card front side bd
exports.updateAdharcardFrontSideBusinessDeveloper = async (req, res) => {
  try {
    if (!req.files["adhar_front_side"]) {
      return res
        .status(400)
        .json({ message: "Please uplaod adhar card front side" });
    }
    const { id } = req.body;
    const adharCardFile = req.files["adhar_front_side"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;

    // Update business developer's adharCard information
    const updateData = {
      adhar_front_side: adharCardLocation,
    };

    const businessDeveloper = await BusinessDeveloper.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    res.status(200).json({
      message: "Aadhar card front side updated successfully",
      adharCard: businessDeveloper.adhar_front_side,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//update  adhar card back side bd
exports.updateAdharcardBackSideBusinessDeveloper = async (req, res) => {
  try {
    if (!req.files["adhar_back_side"]) {
      return res
        .status(400)
        .json({ message: "Please uplaod adhar card back side" });
    }
    const { id } = req.body;
    const adharCardFile = req.files["adhar_back_side"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;

    // Update business developer's adharCard information
    const updateData = {
      adhar_back_side: adharCardLocation,
    };

    const businessDeveloper = await BusinessDeveloper.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    res.status(200).json({
      message: "Aadhar card back side updated successfully",
      adharCard: businessDeveloper.adhar_back_side,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//================================================================

exports.deleteState = async (req, res) => {
  try {
    const id = req.body.id;
    const isDeleted = req.body.delete;
    const state = await StateHandler.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: isDeleted } }
    );

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    if (isDeleted) {
      return res
        .status(200)
        .json({ message: "This state is deleted successfully" });
    } else {
      return res
        .status(200)
        .json({ message: "This state is recovered successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//====================================================================
exports.deleteFranchise = async (req, res) => {
  try {
    const id = req.body.id;
    const isDeleted = req.body.delete;
    const franchise = await Franchise.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: isDeleted } }
    );

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    if (isDeleted) {
      return res
        .status(200)
        .json({ message: "This franchise is deleted successfully" });
    } else {
      return res
        .status(200)
        .json({ message: "This franchise is recovered successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//================================================================
exports.deleteBusinessDeveloper = async (req, res) => {
  try {
    const id = req.body.id;
    const isDeleted = req.body.delete;

    const businessDeveloper = await BusinessDeveloper.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: isDeleted } }
    );

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    const successMessage = isDeleted ? "deleted" : "recovered";
    return res.status(200).json({
      message: `This business developer is ${successMessage} successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//State approve payment request

exports.approvePaymentRequestOfState = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if the payment request exists
    const paymentRequest = await StatePaymentRequest.findById(id);
    if (!paymentRequest) {
      return res.status(404).json({ message: "Payment request not found." });
    }

    const newPaymentApproval = new StatePaymentApprove({
      stateHandlerId: paymentRequest.stateHandlerId,
      amount: paymentRequest.amount,
      requestDate: paymentRequest.requestDate,
      approveDate: new Date(),
    });

    const savedPaymentApproval = await newPaymentApproval.save();

    await StatePaymentRequest.findByIdAndDelete(id);

    await StateHandler.updateOne(
      { stateHandlerId: paymentRequest.stateHandlerId },
      { $inc: { paymentRequestCount: -1 } }
    );

    res.status(201).json({
      message: "Payment request approved successfully",
      savedPaymentApproval,
    });
  } catch (error) {
    console.error("Error approving payment request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//======================================================================
//Franchise approve payment request

exports.approvePaymentRequestOfFranchise = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if the payment request exists
    const paymentRequest = await FranchisePaymentRequest.findById(id);
    if (!paymentRequest) {
      return res.status(404).json({ message: "Payment request not found." });
    }

    const newPaymentApproval = new FranchisePaymentApprove({
      franchiseId: paymentRequest.franchiseId,
      amount: paymentRequest.amount,
      requestDate: paymentRequest.requestDate,
      approveDate: new Date(),
    });

    const savedPaymentApproval = await newPaymentApproval.save();

    await FranchisePaymentRequest.findByIdAndDelete(id);

    await Franchise.updateOne(
      {
        frenchiseId: paymentRequest.franchiseId,
      },
      { $inc: { paymentRequestCount: -1 } }
    );

    res.status(201).json({
      message: "Payment request approved successfully",
      savedPaymentApproval,
    });
  } catch (error) {
    console.error("Error approving payment request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//================================================================================
exports.approvePaymentRequestOfBusinessDeveloper = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if the payment request exists
    const paymentRequest = await BussinessDeveloperPaymentRequest.findById(id);
    if (!paymentRequest) {
      return res.status(404).json({ message: "Payment request not found." });
    }

    const newPaymentApproval = new BussinessDeveloperPaymentApprove({
      businessDeveloperId: paymentRequest.businessDeveloperId,
      amount: paymentRequest.amount,
      requestDate: paymentRequest.requestDate,
      approveDate: new Date(),
    });

    const savedPaymentApproval = await newPaymentApproval.save();

    await BussinessDeveloperPaymentRequest.findByIdAndDelete(id);

    await BusinessDeveloper.updateOne(
      {
        businessDeveloperId: paymentRequest.businessDeveloperId,
      },
      {
        $inc: {
          paymentRequestCount: -1,
        },
      }
    );

    res.status(201).json({
      message: "Payment request approved successfully",
      savedPaymentApproval,
    });
  } catch (error) {
    console.error("Error approving payment request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.adminFetchParticularStateHandlerDetails = async (req, res) => {
  try {
    const { stateHandlerId } = req.body;

    if (!stateHandlerId) {
      return res.status(400).json({ message: "stateHandlerId is required" });
    }

    const particularStateHandlerDetails = await StateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    if (!particularStateHandlerDetails) {
      return res.status(404).json({
        message:
          "State handler details not found for the provided stateHandlerId",
      });
    }

    return res.status(200).json({
      message: "State handler details fetched successfully",
      particularStateHandlerDetails,
    });
  } catch (error) {
    console.error("Error fetching state handler details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//adminFetchStateHandlerPaymentWithdrawalRequest
exports.adminFetchStateHandlerPaymentWithdrawalRequest = async (req, res) => {
  try {
    const { stateHandlerId } = req.body;

    if (!stateHandlerId) {
      return res.status(400).json({ message: "stateHandlerId is required" });
    }

    const stateHandlerPaymentWithdrawalRequests =
      await StatePaymentRequest.find({ stateHandlerId: stateHandlerId });

    if (stateHandlerPaymentWithdrawalRequests.length === 0) {
      return res.status(404).json({
        message: "No withdrawal requests found for the provided state handler",
      });
    }

    return res.status(200).json({
      message: "State handler withdrawal requests fetched",
      stateHandlerPaymentWithdrawalRequests,
    });
  } catch (error) {
    console.error("Error fetching state handler withdrawal requests:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//adminFetchStateHandlerApproveWithdrawal
exports.adminFetchStateHandlerApproveWithdrawal = async (req, res) => {
  try {
    const { stateHandlerId } = req.body;

    if (!stateHandlerId) {
      return res.status(400).json({ message: "stateHandlerId is required" });
    }

    const stateHandlerApproveWithdrawal = await StatePaymentApprove.find({
      stateHandlerId: stateHandlerId,
    });

    if (stateHandlerApproveWithdrawal.length === 0) {
      return res.status(404).json({
        message: "No approve withdrawals found for the provided state handler",
      });
    }

    return res.status(200).json({
      message: "State handler approve withdrawals fetched",
      stateHandlerApproveWithdrawal,
    });
  } catch (error) {
    console.error("Error fetching state handler approve withdrawals:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//adminFetchParticularFranchiseDetails
exports.adminFetchParticularFranchiseDetails = async (req, res) => {
  try {
    const { franchiseId } = req.body;

    if (!franchiseId) {
      return res.status(400).json({ message: "franchiseId is required" });
    }

    const particularFranchiseDetails = await Franchise.findOne({
      frenchiseId: franchiseId,
    });

    if (!particularFranchiseDetails) {
      return res.status(404).json({
        message: "Franchise not found",
      });
    }

    return res.status(200).json({
      message: "Franchise fetched successfully",
      particularFranchiseDetails,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//adminFetchFranchisePaymentWithdrawalRequest
exports.adminFetchFranchisePaymentWithdrawalRequest = async (req, res) => {
  try {
    const { franchiseId } = req.body;

    if (!franchiseId) {
      return res.status(400).json({ message: "franchiseId is required" });
    }

    const franchisePaymentWithdrawalRequests =
      await FranchisePaymentRequest.find({ franchiseId: franchiseId });

    if (franchisePaymentWithdrawalRequests.length === 0) {
      return res.status(404).json({
        message: "No withdrawal requests found for the provided franchise",
      });
    }

    return res.status(200).json({
      message: "Franchise payment withdrawal requests fetched",
      franchisePaymentWithdrawalRequests,
    });
  } catch (error) {
    console.error(
      "Error fetching franchise payment withdrawal requests:",
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

//adminFetchFranchiseApproveWithdrawal
exports.adminFetchFranchiseApproveWithdrawal = async (req, res) => {
  try {
    const { franchiseId } = req.body;

    if (!franchiseId) {
      return res.status(400).json({ message: "franchiseId is required" });
    }

    const franchiseApproveWithdrawal = await FranchisePaymentApprove.find({
      franchiseId: franchiseId,
    });

    if (franchiseApproveWithdrawal.length === 0) {
      return res.status(404).json({
        message: "No approve withdrawals found for the provided franchise",
      });
    }

    return res.status(200).json({
      message: "Franchise approve withdrawals fetched",
      franchiseApproveWithdrawal,
    });
  } catch (error) {
    console.error("Error fetching franchise approve withdrawals:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//adminFetchParticularBusinessDeveloperDetails
exports.adminFetchParticularBusinessDeveloperDetails = async (req, res) => {
  try {
    const { businessDeveloperId } = req.body;

    if (!businessDeveloperId) {
      return res
        .status(400)
        .json({ message: "business developer Id is required" });
    }

    const particularBusinessDeveloperDetails = await BusinessDeveloper.findOne({
      businessDeveloperId: businessDeveloperId,
    });

    if (!particularBusinessDeveloperDetails) {
      return res.status(404).json({
        message: "Business developer not found",
      });
    }

    return res.status(200).json({
      message: "Business developer fetched successfully",
      particularBusinessDeveloperDetails,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//adminFetchBusinessDeveloperPaymentWithdrawalRequest
exports.adminFetchBusinessDeveloperPaymentWithdrawalRequest = async (
  req,
  res
) => {
  try {
    const { businessDeveloperId } = req.body;

    if (!businessDeveloperId) {
      return res
        .status(400)
        .json({ message: "businessDeveloperId is required" });
    }

    const businessDeveloperPaymentWithdrawalRequests =
      await BussinessDeveloperPaymentRequest.find({
        businessDeveloperId: businessDeveloperId,
      });

    if (businessDeveloperPaymentWithdrawalRequests.length === 0) {
      return res.status(404).json({
        message:
          "No withdrawal requests found for the provided business developer",
      });
    }

    return res.status(200).json({
      message: "Business developer payment withdrawal requests fetched",
      businessDeveloperPaymentWithdrawalRequests,
    });
  } catch (error) {
    console.error(
      "Error fetching business developer payment withdrawal requests:",
      error.message
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.adminFetchBusinessDeveloperApproveWithdrawal = async (req, res) => {
  try {
    const { businessDeveloperId } = req.body;

    if (!businessDeveloperId) {
      return res
        .status(400)
        .json({ message: "businessDeveloperId is required" });
    }

    const businessDeveloperApproveWithdrawal =
      await BussinessDeveloperPaymentApprove.find({
        businessDeveloperId: businessDeveloperId,
      });

    if (businessDeveloperApproveWithdrawal.length === 0) {
      return res.status(404).json({
        message:
          "No approve withdrawals found for the provided business developer",
      });
    }

    return res.status(200).json({
      message: "Business developer approve withdrawals fetched",
      businessDeveloperApproveWithdrawal,
    });
  } catch (error) {
    console.error(
      "Error fetching business developer approve withdrawals:",
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

//=====================================================================

// filter credit wallet transaction details by userid

exports.filterCreditWalletTransactionByUserId = async (req, res) => {
  try {
    const { type, id } = req.body;

    if (!type || !id) {
      res.status(400).json({
        error: "Both 'type' and 'id' must be provided in the request body",
      });
      return;
    }

    let transactions;

    if (type === "franchise") {
      transactions = await FranchiseCreditWalletTransaction.find({
        frenchiseId: id,
      });
    } else if (type === "statehandler") {
      transactions = await StateHandlerCreditWalletTransaction.find({
        stateHandlerId: id,
      });
    } else if (type === "businessdeveloper") {
      transactions = await BusinessDeveloperCreditWalletTransaction.find({
        businessDeveloperId: id,
      });
    } else if (type === "member") {
      transactions = await MemberCreditWalletTransaction.find({
        memberId: id,
      });
    } else if (type === "trader") {
      transactions = await UserCreditWalletTransaction.find({
        userId: id,
      });
    } else {
      res
        .status(400)
        .json({ error: "Invalid 'type' specified in the request body" });
      return;
    }

    if (!transactions || transactions.length === 0) {
      res
        .status(404)
        .json({ error: "No transactions found for the provided 'id'" });
      return;
    }

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
};
//======================================================================

exports.verifyState = async (req, res) => {
  try {
    const { id } = req.body;

    const state = await StateHandler.findById(id);

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const updatedState = await StateHandler.findByIdAndUpdate(
      id,
      { isVerify: true, verifyDate: Date.now() },
      { new: true }
    );

    return res.status(200).json({
      message: "Bmm verified successfully",
      state: updatedState,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//verify franchise
exports.verifyFranchise = async (req, res) => {
  try {
    const { id } = req.body;

    const franchise = await Franchise.findById(id);

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    const updatedFranchise = await Franchise.findByIdAndUpdate(
      id,
      { isVerify: true, verifyDate: Date.now() },
      { new: true }
    );

    return res.status(200).json({
      message: "Franchise verified successfully",
      state: updatedFranchise,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//verify Business Developer

exports.verifyBusinessDeveloper = async (req, res) => {
  try {
    const { id } = req.body;

    const businessDeveloper = await BusinessDeveloper.findById(id);

    if (!businessDeveloper) {
      return res.status(404).json({ message: "BusinessDeveloper not found" });
    }

    const updatedBusinessDeveloper = await BusinessDeveloper.findByIdAndUpdate(
      id,
      { isVerify: true, verifyDate: Date.now() },
      { new: true }
    );

    return res.status(200).json({
      message: "BusinessDeveloper verified successfully",
      state: updatedBusinessDeveloper,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// blockSubAdminByAdmin
exports.blockSubAdminByAdmin = async (req, res) => {
  try {
    const { block, id } = req.body;
    const message = block ? "SubAdmin Blocked" : "SubAdmin Unblocked";

    const result = await subAdmin.updateOne(
      { _id: id },
      { $set: { isBlocked: block } }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({ message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMemberBankAndUpiDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    const memberBankDetails = await BankAccountHolder.find({ userId: userId });
    const memberUpiId = await UpiHolder.find({ userId: userId });
    return res.status(200).json({
      message: "Bank and UPI details of member fetched successfully",
      memberBankDetails,
      memberUpiId,
    });
  } catch (error) {
    console.error("Error fetching member details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// fetchParticularMemberDetailsUsingMemberid
exports.fetchParticularMemberDetailsUsingMemberid = async (req, res) => {
  const { memberId } = req.body;
  const particularMemberDetails = await Member.findOne({ memberId: memberId });
  if (!particularMemberDetails) {
    return res.status(400).send("Invalid member Id");
  }
  return res.status(200).json({
    message: "fetched particular member details ",
    particularMemberDetails,
  });
};

exports.getUserBankAndUpiDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    const userBankDetails = await BankAccountHolder.find({ userId: userId });
    const userUpiId = await UpiHolder.find({ userId: userId });

    return res.status(200).json({
      message: "Bank and UPI details of user fetched successfully",
      userBankDetails,
      userUpiId,
    });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// notificationForAllSho
exports.notificationForAllSho = async (req, res) => {
  try {
    const { investerType, message } = req.body;
    if (!investerType || !message) {
      return res.status(400).json({
        message: "Please provide type and message",
      });
    }
    const notification = new NotificationForAllSho({
      investerType: investerType,
      message: message,
    });
    await notification.save();
    if (notification) {
      StateHandler.updateMany({}, { $inc: { notification: 1 } })
        .then(() => {
          return res
            .status(201)
            .json({ message: "Notification pushed successfully" });
        })
        .catch((error) => {
          console.error("Error updating notification for SHO", error);
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// notificationForAllFranchise
exports.notificationForAllFranchise = async (req, res) => {
  try {
    const { investerType, message } = req.body;
    if (!investerType || !message) {
      return res.status(400).json({
        message: "Please provide type and message",
      });
    }
    const notification = new NotificationsForAllFranchise({
      investerType: investerType,
      message: message,
    });
    await notification.save();
    if (notification) {
      Frenchise.updateMany({}, { $inc: { notification: 1 } })
        .then(() => {
          return res
            .status(201)
            .json({ message: "Notification pushed successfully" });
        })
        .catch((error) => {
          return res.status(400).json({
            message: "Something went wrong",
          });
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// notificationForAllBusinessDev
exports.notificationForAllBusinessDev = async (req, res) => {
  try {
    const { investerType, message } = req.body;
    if (!investerType || !message) {
      return res.status(400).json({
        message: "Please provide type and message",
      });
    }
    const notification = new NotificationForAllBusinessDev({
      investerType: investerType,
      message: message,
    });
    await notification.save();
    if (notification) {
      BusinessDeveloper.updateMany({}, { $inc: { notification: 1 } })
        .then(() => {
          return res
            .status(201)
            .json({ message: "Notification pushed successfully" });
        })
        .catch((error) => {
          return res.status(400).json({
            message: "Something went wrong",
          });
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// notificationForParticularSho
exports.notificationForParticularSho = async (req, res) => {
  try {
    const { stateHandlerId, message } = req.body;
    if (!stateHandlerId || !message) {
      return res.status(400).json({
        message: "Please provide SHO ID and message",
      });
    }
    const shoExist = await StateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });
    if (!shoExist) {
      return res.status(400).json({ message: "Invalid SHO ID" });
    }
    const notification = new NotificationForParticularSho({
      stateHandlerId: stateHandlerId,
      message: message,
    });
    await notification.save();
    if (notification) {
      StateHandler.updateOne(
        { stateHandlerId: stateHandlerId },
        { $inc: { notification: 1 } }
      )
        .then(() => {
          return res
            .status(201)
            .json({ message: "Notification pushed successfully" });
        })
        .catch((error) => {
          return res.status(400).json({
            message: `Error while pushing notification for "${stateHandlerId}"`,
          });
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// notificationForParticularFranchise
exports.notificationForParticularFranchise = async (req, res) => {
  try {
    const { frenchiseId, message } = req.body;
    if (!frenchiseId || !message) {
      return res.status(400).json({
        message: "Please provide Franchise ID and message",
      });
    }
    const FranchiseExist = await Frenchise.findOne({
      frenchiseId: frenchiseId,
    });
    if (!FranchiseExist) {
      return res.status(400).json({ message: "Invalid Franchise ID" });
    }
    const notification = new NotificationForParticularFranchise({
      frenchiseId: frenchiseId,
      message: message,
    });
    await notification.save();
    if (notification) {
      Frenchise.updateOne(
        { frenchiseId: frenchiseId },
        { $inc: { notification: 1 } }
      )
        .then(() => {
          return res
            .status(201)
            .json({ message: "Notification pushed successfully" });
        })
        .catch((error) => {
          return res.status(400).json({
            message: `Error while pushing notification for "${frenchiseId}"`,
          });
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// notificationForParticularBusinessDev
exports.notificationForParticularBusinessDev = async (req, res) => {
  try {
    const { businessDeveloperId, message } = req.body;
    if (!businessDeveloperId || !message) {
      return res.status(400).json({
        message: "Please provide BusinessDev  ID and message",
      });
    }
    const BusinessDevExist = await BusinessDeveloper.findOne({
      businessDeveloperId: businessDeveloperId,
    });
    if (!BusinessDevExist) {
      return res.status(400).json({ message: "Invalid Business Developer ID" });
    }
    const notification = new NotificationForParticularBusinessDev({
      businessDeveloperId: businessDeveloperId,
      message: message,
    });
    await notification.save();
    if (notification) {
      BusinessDeveloper.updateOne(
        { businessDeveloperId: businessDeveloperId },
        { $inc: { notification: 1 } }
      )
        .then(() => {
          return res
            .status(201)
            .json({ message: "Notification pushed successfully" });
        })
        .catch((error) => {
          return res.status(400).json({
            message: `Error while pushing notification for "${businessDeveloperId}"`,
          });
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchOneVideo = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ message: "Video Id is required" });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.status(200).json({ message: "video details fetched", video });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server" });
  }
};

exports.countsTraderReferralFranchiseBmm = async (req, res) => {
  try {
    const traderCount = await User.countDocuments();
    const franchiseCount = await Franchise.countDocuments();
    const referralCount = await Member.countDocuments();
    const bmmCount = await StateHandler.countDocuments();

    return res.status(200).json({
      traderCount,
      franchiseCount,
      referralCount,
      bmmCount,
    });
  } catch (error) {
    console.error("Error in counting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.traderReferralFranchiseBmmCountForGraph = async (req, res) => {
  try {
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

    const traderCounts = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
        },
      },
    ]);

    const referralCounts = await Member.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
        },
      },
    ]);

    const franchiseCounts = await Frenchise.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
        },
      },
    ]);

    const bmmCounts = await StateHandler.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
        },
      },
    ]);

    // Mapping month number to abbreviated month name
    const formattedTraderCounts = traderCounts.map((item) => ({
      ...item,
      month: monthAbbreviations[item.month - 1], // Adjusting month number to array index
    }));

    const formattedReferralCounts = referralCounts.map((item) => ({
      ...item,
      month: monthAbbreviations[item.month - 1], // Adjusting month number to array index
    }));

    const formattedFranchiseCounts = franchiseCounts.map((item) => ({
      ...item,
      month: monthAbbreviations[item.month - 1], // Adjusting month number to array index
    }));

    const formattedBmmCounts = bmmCounts.map((item) => ({
      ...item,
      month: monthAbbreviations[item.month - 1], // Adjusting month number to array index
    }));

    res.json({
      traderCounts: formattedTraderCounts,
      referralCounts: formattedReferralCounts,
      franchiseCounts: formattedFranchiseCounts,
      bmmCounts: formattedBmmCounts,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.totalTradingValue = async (req, res) => {
  try {
    let { percentage } = req.body;

    percentage = Number(percentage);

    // Fetch all users and their tradingWallet values in a single query
    const users = await User.find({}, "userid tradingWallet profitWallet");
    // console.log(users,5072)
    // Array to store updated TotaltradingValue documents
    const totalTradingValues = [];

    // Calculate updates for each user
    for (let user of users) {
      const liquidity = user.tradingWallet;

      // Calculate the increase based on the percentage
      const increase = user.tradingWallet * (percentage / 100);

      let updatedTradingWallet = user.tradingWallet;
      let updatedProfitWallet = user.profitWallet;

      const history = new TradingHistory({
        userId: user._id,
        percentage,
        amountAdded:increase,
      })
      await history.save();

      if (percentage > 0) {
        // Update profitWallet only when percentage is positive
        updatedProfitWallet = (user.profitWallet + increase).toFixed(2);
        updatedTradingWallet = user.tradingWallet.toFixed(2);
      } else {
        updatedProfitWallet = user.profitWallet.toFixed(2);
        updatedTradingWallet = (user.tradingWallet + increase).toFixed(2);
      }
      // Store updates for bulk insertion
      totalTradingValues.push({
        userId: user.userid,
        percentage,
        liquidity,
        totalTradingValue: (
          Number(updatedTradingWallet) + Number(updatedProfitWallet)
        ).toFixed(2),

        updatedTradingWallet,
        updatedProfitWallet,
        increase: increase.toFixed(2), // Round increase to two decimal places
      });
    }

    // Update all users in bulk
    const updatedUsers = await User.bulkWrite(
      totalTradingValues.map(
        ({ userId, updatedTradingWallet, updatedProfitWallet }) => ({
          updateOne: {
            filter: { userid: userId },
            update: {
              tradingWallet: updatedTradingWallet,
              profitWallet: updatedProfitWallet,
            }, // Rounding here
          },
        })
      )
    );

    // Insert all TotaltradingValue documents into the database
    await TotaltradingValue.insertMany(totalTradingValues);

    return res.status(200).json({
      status: true,
      message: "Total trading values calculated and saved successfully",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// adminViewAllBankDetails
exports.adminViewAllBankDetails = async (req, res) => {
  try {
    // Fetch all user bank details from the BankHolder model
    const allBankDetails = await BankAccountHolder.find().sort({
      isAuthorised: 1,
    });

    // Send the fetched bank details as a response
    res.status(200).json(allBankDetails);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching bank details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// adminFetchAllUpiDetails
exports.adminFetchAllUpiDetails = async (req, res) => {
  try {
    // Fetch all user bank details from the BankHolder model
    const allUpiDetails = await UpiHolder.find().sort({ isAuthorised: 1 });

    // Send the fetched bank details as a response
    res.status(200).json(allUpiDetails);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching bank details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.fetchtotalTradingValue = async (req, res) => {
  try {
    // Find the last document in the collection
    const lastTotalTradingValue = await TotaltradingValue.findOne()
      .sort({ _id: -1 })
      .limit(1);

    if (!lastTotalTradingValue) {
      return res.status(404).json({ error: "No total trading value found" });
    }

    return res.status(200).json({
      message: "Fetch total trading value successfully",
      data: lastTotalTradingValue,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.authoriseBank = async (req, res) => {
  try {
    const { userId } = req.body;

    const updatedBank = await BankAccountHolder.findOneAndUpdate(
      { userId },
      {
        $set: {
          isAuthorised: true,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Bank account authorised successfully",
      data: updatedBank,
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.authoriseUpiId = async (req, res) => {
  try {
    const { userId } = req.body;

    const updatedUpiId = await UpiHolder.findOneAndUpdate(
      { userId },
      {
        $set: {
          isAuthorised: true,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "UPI Id authorised successfully",
      data: updatedUpiId,
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.userLockAndUnlock = async (req, res) => {
  try {
    const { isLocked, userid } = req.body;

    // Update the user's isLocked status
    const updateToUser = await User.findOneAndUpdate(
      { userid },
      { $set: { isLocked: isLocked } }
    );

    // Check if the user was found and updated
    if (!updateToUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Provide message based on isLocked value using ternary operator
    const message = isLocked
      ? "Trader locked successfully"
      : "Trader unlocked successfully";

    return res.status(200).json({
      status: true,
      message: message,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.approveWithdrawalRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await MoneyWithdrawlTransaction.updateOne(
      { _id: id },
      { $set: { isApproved: true } }
    );

    return res.status(200).json({
      status: true,
      message: "Withdrawal request have been approved successfully.",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchAllWithdrawalRequest = async (req, res) => {
  try {
    const data = await MoneyWithdrawlTransaction.find();

    return res.status(200).json({
      status: true,
      data,
      message: "Withdrawal request have been approved successfully.",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.saveInvoice = async (req, res) => {
  try {
    const { userId, invoiceNumber, type } = req.body;
    const invoiceFile = req.files["invoice"]
      ? req.files["invoice"][0]?.location
      : null;
    //userId validation if not exist
    const user = await User.findOne({ userid: userId });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User not exist." });
    }
    const saveInvoice = await Invoice.create({
      userId,
      invoiceNumber,
      invoice: invoiceFile,
      type,
    });
    // Handle success response
    res.status(200).json({
      status: true,
      message: "Invoice saved successfully",
      data: saveInvoice,
    });
  } catch (error) {
    // Handle error response
    console.error("Error saving invoice:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.fetchInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    return res.status(200).json({
      status: true,
      message: "Invoices fetched successfully",
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.updateUserTradingWallet = async (req, res) => {
  try {
    const { userid, tradingWallet } = req.body;
    // console.log(userid, tradingWallet, 5314);
    const updateTradingWallet = await User.findOneAndUpdate(
      { userid },
      { $set: { tradingWallet } },
      { new: true }
    );
    // console.log(updateTradingWallet, 5320);
    return res.status(200).json({ status: true, data: updateTradingWallet });
  } catch (error) {
    console.error("updating trading wallet:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { text, sendingTo } = req.body;
    const audioFile = req.files["audio"]
      ? req.files["audio"][0]?.location
      : null;

    const saveNote = await Note.create({
      text,
      sendingTo,
      audio: audioFile,
    });
    // Handle success response
    res.status(201).json({
      status: true,
      message: "Note saved successfully",
      data: saveNote,
    });
  } catch (error) {
    // Handle error response
    console.error("Error saving note:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.adminAddingTradingAmountForTrader = async (req, res) => {
  try {
    const { userid, tradingWallet } = req.body;
    console.log(userid, tradingWallet, 5314);

    // Ensure tradingWallet is a number
    if (!userid || !tradingWallet || isNaN(tradingWallet)) {
      return res.status(400).json({
        status: false,
        message: "Invalid userid or tradingWallet value",
      });
    }

    // Update the tradingWallet by summing the value
    const updateTradingWallet = await User.findOneAndUpdate(
      { userid },
      { $inc: { tradingWallet: tradingWallet } }, // Increment tradingWallet
      { new: true } // Return the updated document
    );

    console.log(updateTradingWallet, 5320);

    if (!updateTradingWallet) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: updateTradingWallet,
      message: "Trading wallet updated successfully",
    });
  } catch (error) {
    console.error("Error updating trading wallet:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.userDetailsEditAdmin = async (req, res) => {
  const {
    userWhat,
    fname,
    lname,
    phone,
    address,
    gender,
    aadhar,
    pan,
    id,
    Id_No,
    tradingWallet,
  } = req.body;

  try {
    let updatedUser;
    if (userWhat === "indian") {
      if (
        !fname ||
        !lname ||
        !phone ||
        !address ||
        !gender ||
        !aadhar ||
        !pan 
      ) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            fname: fname,
            lname: lname,
            address: address,
            gender: gender,
            phone: phone,
            aadhar: aadhar,
            pan: pan,
            tradingWallet :tradingWallet,
          },
        },
        { new: true } // Return the updated document
      );
    } else if (userWhat === "otherCountry") {
      if (!fname || !lname || !phone || !address || !gender || !Id_No) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            fname: fname,
            lname: lname,
            address: address,
            gender: gender,
            phone: phone,
            Id_No: Id_No,
          },
        },
        { new: true } // Return the updated document
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(201)
      .json({ message: "User Details Updated",
         data: updatedUser,
         status:true,
       });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ message: "Internal Server Error" ,status:false});
  }
};

exports.fetchTradingHistory = async (req, res) => {
  try {
    const {userId} = req.body
    const tradingHistory = await TradingHistory.find({userId});
    return res.status(200).json({
      status: true,
      message: "Trading history fetched successfully",
      data: tradingHistory,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.fetchTradingValueAddingHistory = async (req, res) => {
  try {
    const {userId} = req.body
    const tradingValueHistory = await WalletTransaction.find({userId});
    return res.status(200).json({
      status: true,
      message: "Trading value history fetched successfully",
      data: tradingValueHistory,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.giveCryptoTransferOption = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ status: false, message: "User ID is required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { isCryptoTransfer: !user.isCryptoTransfer } },  // Toggle the field
      { new: true }  // Return the updated document
    );

    res.status(200).json({
      status: true,
      message: `Crypto transfer option has been ${updatedUser.isCryptoTransfer ? 'enabled' : 'disabled'} for the user`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error while giving crypto transfer option:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.adminFetchCryptoTransferHistory = async (req, res) => {
  try {
    const {userId} = req.body
    const tradingHistory = await CryptoTransferHistory.find({userId});
    return res.status(200).json({
      status: true,
      message: "Crypto history fetched successfully",
      data: tradingHistory,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.adminActivateWithdrawalMessage = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ status: false, message: "User ID is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const toggleValue = !user.isWithdrawalMessage;
    const updateFields = {
      isWithdrawalMessage: toggleValue,
    };

    // If turning ON, set current time
    if (toggleValue) {
      updateFields.withdrawalMessageStartTime = new Date();
    } else {
      updateFields.withdrawalMessageStartTime = null; // Optionally clear it when turned off
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: updateFields,
    }, { new: true });

    res.status(200).json({
      status: true,
      message: `Withdrawal Message ${updatedUser.isWithdrawalMessage ? 'enabled' : 'disabled'} for this User.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error while activating withdrawal message:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.adminFetchTradingValueAddRequest = async(req,res) => {
  try {
    const tradingValueAddRequest = await WalletTransaction.find();
    return res.status(200).json({
      status: true,
      message: "Trading value adding request fetched successfully",
      data: tradingValueAddRequest,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
}

exports.adminApproveAddTradingValueRequest = async (req, res) => {
  try {
    const { id } = req.body;

    // 1. Find the WalletTransaction by ID
    const transaction = await WalletTransaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // 2. If already added, prevent duplicate addition
    if (transaction.isAdded) {
      return res.status(400).json({ message: 'Amount already added' });
    }

    // 3. Mark transaction as added
    transaction.isAdded = true;
    await transaction.save();

    // 4. Find the user by userid and update tradingWallet
    const user = await User.findOne({ userid: transaction.userid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.tradingWallet = (user.tradingWallet || 0) + transaction.amountAdded;
    await user.save();

    // 5. Return success message
    return res.status(200).json({ message: 'Amount approved and wallet updated successfully' });
  } catch (error) {
    console.error('Error approving wallet transaction:', error);
    return res.status(500).json({ message: 'Failed to approve transaction' });
  }
};
