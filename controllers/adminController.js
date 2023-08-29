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
const AdminCreditWalletTransaction = require("../model/adminCreditWalletTransaction")

const {
  isValidPassword,
  isValidName,
  isValidImage,
  isValidPhone,
  isValidEmail,
  isValidUserId,
} = require("../validation/validation");

require("dotenv").config();

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
        res.status(201).json({
          message: "Admin Login Successfully",
          token: token,
          admin_id,
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
  let result = await User.updateOne(
    { _id: id },
    {
      $set: { status: status },
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
      $set: { status: status },
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

    // const dateString = dob;
    // const parts = dateString.split('/');
    // const year = parseInt(parts[2]);
    // const month = parseInt(parts[1]);
    // const day = parseInt(parts[0]);
    // const dateofbirth = new Date(year, month - 1, day);

    // console.log(dateofbirth.toISOString());

    // User.updateOne({ _id: 'id' })
    //     .set({ fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dateofbirth, aadhar: aadhar, pan: pan })
    User.updateOne(
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
      return res.status(201).json({ message: "User Details Updated" });
    });
  }
  if (userWhat === "otherCountry") {
    if (!fname || !lname || !phone || !address || !gender || !Id_No) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    User.updateOne(
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
    if (
      !fname ||
      !lname ||
      !phone ||
      !address ||
      !gender ||

      !aadhar ||
      !pan
    ) {
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
    if (!fname || !lname || !phone || !address || !gender|| !Id_No) {
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
  const { block, id } = req.body;
  // console.log(block);
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
  MoneyWithdrawlTransaction.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "Withdrawal Request fetched", result });
    }
  });
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
    console.log(memberid, walletAmount, requestDate, "548");
    const approveRequestAmount = new memberRefferalPayoutApproveWithdrawal({
      memberid: memberid,
      walletAmount: walletAmount,
      requestDate: requestDate,
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
  memberRefferalPayoutApproveWithdrawal.find((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "Withdrawal Request fetched", result });
    }
  });
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
  let userOnlineOrNot = await User.findOne({ userid: userid });
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
    const videoLocation = req.files["videoOne"][0]?.location;
    const thumbnailLocation = req.files["thumbnail"][0]?.location;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!videoLocation) {
      return res.status(400).json({ message: "Video file is required" });
    }
    if (!thumbnailLocation) {
      return res.status(400).json({ message: "Thumbnail file is required" });
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
        message: "No data found",
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

    if (filteredInactiveUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with inactive payment statuses" });
    }
    if (filteredRunningUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with Running payment statuses" });
    }
    if (filteredExpiredUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with expired payment statuses" });
    }

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
      return res.status(404).json({ message: "Sub admin not found" });
    }

    // if (subadmin.isSubAdmin === false) {
    //   return res.status(400).json({ message: "You are not a sub admin" });
    // }

    const passwordMatch = await bcrypt.compare(password, subadmin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect userId and password" });
    }

    const token = jwt.sign(
      { subAdminId: subadmin._id },
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
    isVideoCreator,
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
      isVideoCreator,
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
      referredId
    } = req.body;

    if (!req.files["adharCard"]) {
      return res.status(400).json({ message: "Adhar card file is missing." });
    }

    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Pan card file is missing." });
    }

    const adharCardFile = req.files["adharCard"][0];
    const panCardFile = req.files["panCard"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;
    const panCardLocation = panCardFile.location;

    const existingstateHandler = await StateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    if (existingstateHandler) {
      return res.status(422).json({
        message:
          "State Handler Id ID already exists. Please choose a unique ID.",
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
          "frenchise Id Should have at least 1 letter and 1 digit, minimum length 6.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //const referralId = `${fname.toLowerCase()}${randomDigits}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    const firstThreeDigits = `${fname.substring(0, 3).toUpperCase()}`;
    const referralId = "SH" + "-" + firstThreeDigits + randomDigits;
    console.log(referralId, "1886");

    const frenchiseWallet = 0;

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
      selectedState,
      adharCard: adharCardLocation,
      panCard: panCardLocation,
    });

    const savedData = await newStateHandler.save();

    return res.status(201).json({
      message: "State handler created successfully",
      savedData,
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
    } = req.body;

    if (!req.files["adharCard"]) {
      return res.status(400).json({ message: "Adhar card file is missing." });
    }

    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Pan card file is missing." });
    }

    const adharCardFile = req.files["adharCard"][0];
    const panCardFile = req.files["panCard"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;
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
        message: "Frenchise ID already exists. Please choose a unique ID.",
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
          "frenchise Id Should have at least 1 letter and 1 digit, minimum length 6.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //const referralId = `${fname.toLowerCase()}${randomDigits}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    const firstThreeDigits = `${fname.substring(0, 3).toUpperCase()}`;
    const referralId = "FC" + "-" + firstThreeDigits + randomDigits;
    console.log(referralId, "1886");

    const frenchiseWallet = 0;

    const newFranchise = new Frenchise({
      fname,
      lname,
      phone,
      email,
      password: hashedPassword,
      gender,
      franchiseCity,
      frenchiseId,
      referredId,
      frenchiseWallet,
      referralId,
      franchiseState,
      adharCard: adharCardLocation,
      panCard: panCardLocation,
    });

    const savedFranchise = await newFranchise.save();

    return res.status(201).json({
      message: "Franchise created successfully",
      savedFranchise,
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
    } = req.body;

    if (!req.files["adharCard"]) {
      return res.status(400).json({ message: "Adhar card file is missing." });
    }

    if (!req.files["panCard"]) {
      return res.status(400).json({ message: "Pan card file is missing." });
    }

    const adharCardFile = req.files["adharCard"][0];
    const panCardFile = req.files["panCard"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;
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
      adharCard: adharCardLocation,
      panCard: panCardLocation,
      referralId,
      referredId,
      businessDeveloperWallet,
      buisnessCity,
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
        .json({ message: "Please provide state handler Id and password" });
    }

    const existingStateHandler = await StateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });

    if (!existingStateHandler) {
      return res
        .status(400)
        .json({ message: "Invalid State handler Id or Password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingStateHandler.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid State handler Id or Password" });
    }
    const token = jwt.sign(
      { stateHandlerId: existingStateHandler._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      message: "State handler login successful",
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
        .json({ message: "Please provide  frenchise Id and password" });
    }

    const existingFrenchiseId = await Frenchise.findOne({
      frenchiseId: frenchiseId,
    });

    if (!existingFrenchiseId) {
      return res
        .status(400)
        .json({ message: "Invalid frenchise Id or Password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingFrenchiseId.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid frenchise Id or Password" });
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
      message: "Not found",
    });
  }
};

// verifyBuisnessDeveloperBeforeRegistration
exports.verifyBuisnessDeveloperBeforeRegistration = async (req, res) => {
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
      message: "Franchie user found",
      franchieUserCity,
    });
  } else {
    return res.status(404).json({
      message: " Franchie user not found",
    });
  }
};
//=======================================================================

exports.interactWithVideoForAdmin = async (req, res) => {
  try {
    const { videoId, action, comments, replyTo } = req.body;
    const userId = req.userId || req.stateHandlerId || req.businessDeveloperId;

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
          commentToReply.replies.push({
            text: comments,
            userId: userId,
          });
        } else {
          return res
            .status(400)
            .json({ message: "Comment to reply not found" });
        }
      } else {
        video.comments.push({
          text: comments,
          userId: userId,
        });
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
    console.log(error.message, "//////////");
    return res.status(500).json({ message: "Internal Server Error" });
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
        .json({ message: "State not found for the given ID" });
    }

    if (block === state.isBlocked) {
      return res
        .status(400)
        .json({
          message: `State is already ${block ? "blocked" : "unblocked"}`,
        });
    }

    const updatedState = await StateHandler.findByIdAndUpdate(
      { _id: id },
      { $set: { isBlocked: block } }
    );

    return res
      .status(200)
      .json({
        message: `State ${block ? "blocked" : "unblocked"} successfully`,
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
      return res
        .status(400)
        .json({
          message: `Franchise is already ${block ? "blocked" : "unblocked"}`,
        });
    }

    const updatedFranchise = await Franchise.findByIdAndUpdate(
      { _id: id },
      { $set: { isBlocked: block } }
    );

    return res
      .status(200)
      .json({
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
      return res
        .status(400)
        .json({
          message: `Business Developer is already ${
            block ? "blocked" : "unblocked"
          }`,
        });
    }

    const updatedBusinessDeveloper = await BusinessDeveloper.findByIdAndUpdate(
      { _id: id },
      { $set: { isBlocked: block } }
    );

    return res
      .status(200)
      .json({
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
    const { fname, lname, phone, email, password, gender, selectedState } =
      req.body;
    const id = req.body.id;

    const adharCardFile = req.files["adharCard"][0];
    const panCardFile = req.files["panCard"][0];

    // Check if adharCard image is valid using isValidImage function
    if (!isValidImage(adharCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    // Check if panCard image is valid using isValidImage function
    if (!isValidImage(panCardFile.originalname)) {
      return res.status(422).json({
        message:
          "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format.",
      });
    }

    const adharCardLocation = adharCardFile.location;
    const panCardLocation = panCardFile.location;

    // Validate input fields
    if (
      !fname ||
      !lname ||
      !phone ||
      !email ||
      !password ||
      !gender ||
      !selectedState
    ) {
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

    // Validate password strength
    if (!isValidPassword(password)) {
      return res.status(422).json({
        message:
          "Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
      });
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
      password,
      gender,
      selectedState,
      panCard: panCardLocation,
      adharCard: adharCardLocation,
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
    if (
      !fname ||
      !lname ||
      !phone ||
      !email ||
      !gender 
    ) {
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
    franchise.franchiseCity = franchiseCity

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
exports.updateAdharcardFranchise = async (req, res) => {
  try {
    const { id } = req.body;
    const adharCardFile = req.files["adharCard"][0];

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
      adharCard: adharCardLocation,
    };

    const franchise = await Frenchise.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true }
    );

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    res
      .status(200)
      .json({
        message: "Aadhar card updated successfully",
        adharCard: franchise.adharCard,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=======================================================================
exports.updatePanCardFranchise = async (req, res) => {
  try {
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

    res
      .status(200)
      .json({
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
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true }
    );

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    res
      .status(200)
      .json({
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
    const { fname, lname, phone, email, gender, buisnessCity } =
      req.body;
    const id = req.body.id;

  
  
    // Validate input fields
    if (
      !fname ||
      !lname ||
      !phone ||
      !email ||
      
      !gender ||
      !buisnessCity
    ) {
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

    res
      .status(200)
      .json({
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

    res
      .status(200)
      .json({
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

exports.fetchAdmin = async(req, res) => {
  try {
    const id = req.userId
    let admin = await Admin.findOne({_id:id})

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" })
    }

    console.log(admin, "admin details")
    console.log(admin.adminWallet, "3401")
    console.log(admin.referralId, "3401")


    return res.status(200).json({ message: "Fetched admin details", data: admin })

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

//==========================================================================

exports.fetchCityByReferralIdInFranchise = async(req, res) => {
  try {

    const {franchiseReferralId} = req.body 
    const franchise = await Franchise.findOne({referralId:franchiseReferralId})
    if(!franchise){
      return res.status(404).json({message: "Franchise not found"} )

    }
    return res.status(200).json({message: "Fetched franchise successfully", CityList: franchise.franchiseCity} )
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

////////////////////////////update pan and adhar bd
exports.updateAdharcardBusinessDeveloper = async (req, res) => {
  try {
    const { id } = req.body;
    const adharCardFile = req.files["adharCard"][0];

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
      adharCard: adharCardLocation,
    };

    const businessDeveloper = await BusinessDeveloper.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true }
    );

    if (!businessDeveloper) {
      return res.status(404).json({ message: "Business developer not found" });
    }

    res
      .status(200)
      .json({
        message: "Aadhar card updated successfully",
        adharCard: businessDeveloper.adharCard,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

