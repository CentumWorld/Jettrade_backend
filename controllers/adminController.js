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
const Frenchise = require("../model/frenchiseSchema")
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
    dob,
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
      !dob ||
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
          dob: dob,
          aadhar: aadhar,
          pan: pan,
        },
      }
    ).then(() => {
      return res.status(201).json({ message: "User Details Updated" });
    });
  }
  if (userWhat === "otherCountry") {
    if (!fname || !lname || !phone || !address || !gender || !dob || !Id_No) {
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
          dob: dob,
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
    dob,
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
      !dob ||
      !aadhar ||
      !pan
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
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
          dob: dob,
          aadhar: aadhar,
          pan: pan,
        },
      }
    ).then(() => {
      return res.status(201).json({ message: "User Details Updated" });
    });
  }
  if (userWhat === "otherCountry") {
    if (!fname || !lname || !phone || !address || !gender || !dob || !Id_No) {
      return res.status(400).json({ message: "Please fill all the fields" });
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
          dob: dob,
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

// exports.createVideo = async (req, res, next) => {
//   try {
//     const { title } = req.body;
//     const fileUrl = req.file.location; // Assuming your upload middleware sets the 'location' property
//     if (!title) {
//       return res
//         .status(400)
//         .send({ status: false, message: "title is required" });
//     }
//     if (!fileUrl) {
//       return res
//         .status(400)
//         .send({ status: false, message: "video file is required" });
//     }

//     // Save the video information to MongoDB
//     const video = new Video({
//       title,
//       videoOne: fileUrl,
//     });

//     const savedVideo = await video.save();

//     res.status(201).json({ status: true, savedVideo });
//   } catch (error) {
//     console.error("Failed to create video:", error);
//     res.status(500).json({ error: "Failed to create video" });
//   }
// };

//===========

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
   

//register state handler

exports.createStateHandler = async (req, res) => {
  try {
    const {
      fname,
      lname,
      phone,
      email,
      gender,
      password,
      address,
      dob,
      selectedState,
      stateHandlerId,
    } = req.body;

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
      "address",
      "gender",
      "dob",
      "selectedState",
      "stateHandlerId",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(422).json({
        message: `Please fill all details: ${missingFields.join(", ")}`,
      });
    }

    // Validate stateHandlerId uniqueness
    const existingStateHandler = await StateHandler.findOne({
      stateHandlerId: stateHandlerId,
    });
    if (existingStateHandler) {
      return res.status(422).json({
        message: "State handler ID already exists. Please choose a unique ID.",
      });
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

    if (!isValidUserId(stateHandlerId)) {
      return res.status(422).json({
        message:
          "StateHandlerId Should have at least 1 letter and 1 digit, minimum length 6.",
      });
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    const referralId = `${fname.toLowerCase()}${randomDigits}`;
    console.log(referralId);

    const newStateHandler = new StateHandler({
      fname,
      lname,
      phone,
      email,
      password,
      address,
      gender,
      dob,
      selectedState,
      stateHandlerId,
      adharCard: adharCardLocation,
      panCard: panCardLocation,
      referralId,
    });

    const savedStateHandler = await newStateHandler.save();

    return res.status(201).json({
      message: "User created successfully",
     
      savedStateHandler,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};



exports.createFrenchise = async (req, res) => {
  try {
    const {
      fname,
      lname,
      phone,
      email,
      gender,
      password,
      address,
      dob,
      frenchiseId,
      referredId
    } = req.body;

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
      "address",
      "gender",
      "dob",
      "frenchiseId",
      "referredId",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(422).json({
        message: `Please fill all details: ${missingFields.join(", ")}`,
      });
    }

    // Validate stateHandlerId uniqueness
    const existingFrenchiseId = await Frenchise.findOne({
      frenchiseId: frenchiseId,
    });
    if (existingFrenchiseId) {
      return res.status(422).json({
        message: "This Frenchise ID already exists. Please choose a unique ID.",
      });
    }

    // Is referred id exist in state handler collection

    const existReferredId = await StateHandler.findOne({referralId:referredId})

    console.log(existReferredId)

    if(!existReferredId){
      return res.status(400).json({message: "invalid reffered Id"})
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

    // if (!isValidStateHandlerId(stateHandlerId)) {
    //   return res.status(422).json({
    //     message:
    //       "StateHandlerId Should have at least 1 letter and 1 digit, minimum length 6.",
    //   });
    // }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    const referralId = `${fname.toLowerCase()}${randomDigits}`;
    console.log(referralId);

    const newFrenchise = new Frenchise({
      fname,
      lname,
      phone,
      email,
      password,
      address,
      gender,
      dob,
      frenchiseId,
      adharCard: adharCardLocation,
      panCard: panCardLocation,
      referralId,
      referredId
    });

    const savedFrenchise = await newFrenchise.save();

    return res.status(201).json({
      message: "User created successfully",
      referralId: referralId,
      savedFrenchise,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

