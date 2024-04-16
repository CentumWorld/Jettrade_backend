const Member = require("../model/memberSchema");
const multer = require("multer");
const jwt = require("jsonwebtoken");
// const sharp = require('sharp');
const bcrypt = require("bcrypt");
// const forgetPasswordSms = require('../utils/forget-password-otp');
require("dotenv").config();
const MemberProfilePhoto = require("../model/memberProfilePhotoSchema");
const Memberdocument = require("../model/memberDocumentSchema");
const notificationForAll = require("../model/notificationForAllSchema");
const notificationForAllRefferal = require("../model/notificationForAllRefferalSchema");
const notificationForParticularRefferal = require("../model/notificationForParticularRefferalSchema");
const memberRefferalPayoutRequest = require("../model/memberRefferalPayoutRequestSchema");
const memberRefferalPayoutApproveWithdrawal = require("../model/memberRefferalPayoutApproveWithdrawalSchema");
const RefferalChatType = require("../model/refferalChatType");
const ReffrealChatMessage = require("../model/refferalChatMessageSchema");
const Admin = require("../model/adminSchema");
const User = require("../model/userSchema");
const validator = require("validator");
const MyReferral = require("../model/myReferralSchema");

const BusinessDeveloper = require("../model/businessDeveloperSchema");
const Franchise = require("../model/frenchiseSchema");
const MemberCreditWalletTransaction = require("../model/memberCreditWalletTransaction");
const BankAccountHolder = require("../model/BankAccountHolderSchema");
const UpiHolder = require("../model/UpiHolderSchema");
const {
  isValidPassword,
  isValidName,
  isValidImage,
  isValidPhone,
  isValidEmail,
  isValidUserId,
} = require("../validation/validation");
const Note = require("../model/NoteModel");

// refferalRegistration
exports.memberRegistration = async (req, res) => {
  if (!req.files["aadhar_front_side"]) {
    return res
      .status(422)
      .json({ message: "please provide adhar card front side" });
  }

  if (!req.files["aadhar_back_side"]) {
    return res.status(422).json({ message: "please provide adhar back side" });
  }

  if (!req.files["pan_card"]) {
    return res.status(422).json({ message: "please provide pan card" });
  }

  const aadhar_front_side = req.files.aadhar_front_side[0].location;
  const aadhar_back_side = req.files.aadhar_back_side[0].location;
  const pan_card = req.files.pan_card[0].location;

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
    memberid,
    password,
    reffered_id,
  } = req.body;

  const requiredFields = [
    "fname",
    "lname",
    "email",
    "phone",
    "address",
    "gender",
    "dob",
    "aadhar",
    "pan",
    "memberid",
    "password",
    "reffered_id",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res
      .status(422)
      .json({ message: `Missing fields: ${missingFields.join(", ")}` });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  console.log(phone);

  // if (!isValidPhone('+91'+phone)) {
  //   return res.status(422).json({
  //     message:
  //       "Invalid phone number format. Use 10 digits or include country code.",
  //   });
  // }

  if (!isValidName(fname) || !isValidName(lname)) {
    return res.status(422).json({
      message: "Invalid name format.",
    });
  }

  if (!isValidPassword(password)) {
    return res.status(422).json({
      message:
        "Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
    });
  }

  if (!isValidUserId(memberid)) {
    return res.status(422).json({
      message:
        "Member Id Should have at least 1 letter and 1 digit, minimum length 6.",
    });
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
    //const memberid = fname + Math.floor(Math.random() * 10000 + 1);
    const refferal_id = memberid + Math.floor(Math.random() * 10000 + 1);
    console.log(refferal_id);

    const memberExist = await Member.findOne({ memberid: memberid });

    if (memberExist) {
      return res.status(400).json({ message: "Member already exist!" });
    }

    const existingreferredId = await Franchise.findOne({
      referralId: reffered_id,
    });

    if (!existingreferredId) {
      return res
        .status(400)
        .send({ message: "You are providing wrong referral Id" });
    }

    const member = new Member({
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
      aadhar_front_side,
      aadhar_back_side,
      pan_card,
      memberid,
      password,
      reffered_id,
      userType: "indian",
    });
    await member.save();
    const token = jwt.sign(
      { userId: member._id },
      process.env.SECRET_KEY,
      { expiresIn: "8h" }
    );
    res.status(201).json({ message: "Referral registered successfully",token, memberLogin:member });
  } catch (error) {
    console.log(error);
  }
};

// otherCountryMemberRegistration
exports.otherCountryMemberRegistration = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No File Uploaded" });
  }

  const ID_Card = req.file.location;

  //console.log(aadhar_back, aadhar_front, pan_card,'140');

  if (!ID_Card) {
    return res.status(422).json({ message: "Please provide Id card." });
  }

  const {
    fname,
    lname,
    email,
    phone,
    address,
    gender,
    dob,
    Id_No,
    memberid,
    password,
    reffered_id,
  } = req.body;

  const requiredFields = [
    "fname",
    "lname",
    "email",
    "phone",
    "address",
    "gender",
    "dob",
    "Id_No",
    "memberid",
    "password",
    "reffered_id",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res
      .status(422)
      .json({ message: `Missing fields: ${missingFields.join(", ")}` });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (
    !fname ||
    !lname ||
    !phone ||
    !address ||
    !gender ||
    !dob ||
    !Id_No ||
    !memberid ||
    !password ||
    !reffered_id
  ) {
    return res.status(422).json({ message: "Please Fill all Details!" });
  } else {
    try {
      //const memberid = fname + Math.floor(Math.random() * 10000 + 1);
      const refferal_id = memberid + Math.floor(Math.random() * 10000 + 1);
      console.log(refferal_id);

      const memberExist = await Member.findOne({ memberid: memberid });
      if (memberExist) {
        return res.status(422).json({ message: "Member already exist" });
      }

      const existingreferredId = await Franchise.findOne({
        referralId: reffered_id,
      });
      console.log(existingreferredId, "242");

      if (!existingreferredId) {
        return res.status(400).send({
          message: "You are providing wrong business developer referral Id",
        });
      }

   

      const member = new Member({
        fname,
        lname,
        email,
        phone,
        address,
        gender,
        dob,
        refferal_id,
        Id_No,
        ID_Card,
        memberid,
        password,
        reffered_id,
        userType: "other",
      });
      await member.save();

      const token = jwt.sign(
        { userId: member._id },
        process.env.SECRET_KEY,
        { expiresIn: "8h" }
      );
      res
        .status(201)
        .json({ message: "Referral registered successfully",token,memberLogin:  member });
    } catch (error) {
      console.log(error);
    }
  }
};

// memberLogin
exports.memberLogin = async (req, res) => {
  const { memberid, password } = req.body;
  if (!memberid || !password) {
    return res.status(422).json({ message: "Please fill all details" });
  }
  try {
    const memberLogin = await Member.findOne({ memberid: memberid });

    if (!memberLogin) {
      return res.status(404).json({ message: "Invalid Credential!" });
    }

    const blocked = memberLogin.isBlocked;
    if (blocked) {
      return res.status(401).json({ message: "Your Account is blocked!" });
    }

    const isMatch = await bcrypt.compare(password, memberLogin.password);
    const token = jwt.sign(
      { userId: memberLogin._id },
      process.env.SECRET_KEY,
      { expiresIn: "8h" }
    );
    console.log(token);

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 60000),
      httpOnly: true,
    });

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credential!" });
    } else {
      return res.status(200).json({
        message: "Member Login successfully",
        token: token,
        memberLogin,
        expires: new Date().getTime() + 60000,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// memberProfileVerification

exports.memberProfileVerification = async (req, res) => {
  try {
    const adharFront = req.files["aadhar_front_side"]
      ? req.files["aadhar_front_side"][0]?.location
      : null;

    const adharBack = req.files["aadhar_back_side"]
      ? req.files["aadhar_back_side"][0]?.location
      : null;

    const panCard = req.files["pan_card"]
      ? req.files["pan_card"][0]?.location
      : null;

    const memberid = req.body.memberid;

    if (!memberid) {
      return res.status(400).json({ message: "User Id is required" });
    }

    let updateFields = {};

    if (adharFront) {
      updateFields.aadhar_front_side = adharFront;
    }

    if (adharBack) {
      updateFields.aadhar_back_side = adharBack;
    }

    if (panCard) {
      updateFields.pan_card = panCard;
    }

   const userDocuments = await Member.findOneAndUpdate(
      { memberid: memberid },
      { $set: updateFields },
      { new: true }
    );

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

// fetchMemberDetails
exports.fetchMemberDetailsMemberSide = async (req, res) => {
  const memberid = req.body;
  verifyToken = req.verifyToken;
  //console.log(token,verifyToken);

  const memberFetchDetails = await Member.findOne(memberid);
  //console.log(userFetchDetails)
  if (memberFetchDetails) {
    console.log(memberFetchDetails);
    return res.status(200).json({
      message: "User Details Fetched",
      result: memberFetchDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// memberProfilePhotoUpload
exports.memberProfilePhotoUpload = async (req, res) => {
  //console.log(req.file, '290');
  if (!req.file) {
    return res.status(400).json({ message: "No File Uploaded" });
  }
  const memberid = req.body.memberid;
  const imageUrl = req.file.location;

  const result = await MemberProfilePhoto.find({ memberid });
  console.log(result.length);
  if (result.length > 0) {
    MemberProfilePhoto.updateOne({ memberid: memberid })
      .set({ imageUrl: imageUrl })
      .then(() => {
        return res.status(201).json({ message: "Profile photo Updated" });
      });
  } else {
    if (!memberid || !imageUrl) {
      return res.send({
        code: 400,
        message: "Bad Request",
      });
    }

    const memberProfilePhoto = new MemberProfilePhoto({
      memberid: memberid,
      imageUrl: imageUrl,
    });
    const success = await memberProfilePhoto.save();

    if (success) {
      return res.send({
        code: 200,
        message: "Uploaded Successfully",
      });
    } else {
      return res.send({
        code: 500,
        message: "Service Error",
      });
    }
  }
};

// fetchMemberProfilePhoto
exports.fetchMemberProfilePhoto = async (req, res) => {
  const { memberid } = req.body;
  MemberProfilePhoto.find({ memberid })
    .then((result) => {
      res.status(200).json({
        message: "User Details Fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// fetchMemberDocumentMemberSide
exports.fetchMemberDocumentMemberSide = async (req, res) => {
  const { memberid } = req.body;
  await Memberdocument.find({ memberid })
    .then((result) => {
      res.status(200).json({
        message: "Member documents Fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// memberChangePassword
exports.memberChangePassword = async (req, res) => {
  const { oldPassword, newPassword, token } = req.body;
  console.log(token);
  console.log(req.token);
  if (!oldPassword || !newPassword) {
    return res.status(422).json({ message: "Fields required" });
  }

  verifyToken = req.verifyToken;

  const memberFetchDetails = await Member.findOne({ token });
  console.log(memberFetchDetails);
  if (memberFetchDetails) {
    const isMatch = await bcrypt.compare(
      oldPassword,
      memberFetchDetails.password
    );
    if (isMatch) {
      memberFetchDetails.password = req.body.newPassword;
      await memberFetchDetails.save();
      return res.status(201).json({ message: "Password successfully Change" });
    } else {
      return res.status(422).json({ message: "Old Password Is Wrong" });
    }
    //console.log(isMatch,'198');
  }
};

// memberForgetPassword
exports.memberForgetPassword = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const memberid = req.body;
  console.log(otp, "207");

  const memberFetchDetails = await Member.findOne(memberid);
  //console.log(memberFetchDetails, '210');

  if (memberFetchDetails) {
    let phone = "+91" + memberFetchDetails.phone;

    // forgetPasswordSms(phone, {"otp": otp })
    memberFetchDetails.otp = otp;
    await memberFetchDetails.save();
    return res.status(201).json({ message: "OTP Sent" });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

// memberVerifyOtp
exports.memberVerifyOtp = async (req, res) => {
  const { memberid } = req.body;
  //verifyToken = req.verifyToken;
  const otp = Number(req.body.otp);
  console.log(typeof otp);

  const memberFetchDetails = await Member.findOne({ memberid });
  if (memberFetchDetails) {
    if (memberFetchDetails.otp !== otp) {
      return res.status(400).json({ message: "OTP Invalid" });
    } else {
      return res.status(200).json({ message: "OTP matched" });
    }
  }
};

// memberResetPassword
exports.memberResetPassword = async (req, res) => {
  const { memberid } = req.body;
  const { newPassword, confirmPassword } = req.body;

  console.log(newPassword, confirmPassword);
  if (!newPassword || !confirmPassword) {
    return res.status(422).json({ message: "Fields required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(422).json({ message: "Password Not Matched" });
  }

  //verifyToken = req.verifyToken;

  const memberFetchDetails = await Member.findOne({ memberid });
  if (memberFetchDetails) {
    memberFetchDetails.password = req.body.newPassword;
    await memberFetchDetails.save();

    return res.status(201).json({ message: "Password Successfully Reset" });
  }
};

// editMemberDetails
exports.editMemberDetails = async (req, res) => {
  const { memberid } = req.body;
  Member.find({ memberid })
    .then((result) => {
      res.status(200).json({
        message: "Member Details Fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// saveMemberEditedDetails

exports.saveMemberEditedDetails = async (req, res) => {
  try {
    const { fname, lname, phone, address, gender, aadhar, pan, userid } =
      req.body;

    if (!fname || !lname || !phone || !address || !gender || !aadhar || !pan) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const updateToMember = await Member.findOneAndUpdate(
      { memberid: userid },
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
      { new: true }
    );

    if (updateToMember) {
      return res
        .status(200)
        .json({ message: "Member Details Updated", data: updateToMember });
    } else {
      return res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetchRefferalNotification
exports.fetchRefferalNotification = async (req, res) => {
  const { memberid } = req.body;
  const allNotitfication = await notificationForAll.find();
  // console.log(allNotitfication);
  if (allNotitfication) {
    const allRefferalNotification = await notificationForAllRefferal.find();
    if (allRefferalNotification) {
      const particularRefferal = await notificationForParticularRefferal.find({
        memberid: memberid,
      });
      if (particularRefferal) {
        res.status(200).json({
          message: "Member notification fetched",
          allNotitfication,
          allRefferalNotification,
          particularRefferal,
        });
      }
    }
  }
};

// memberFetchRefferalPayout
exports.memberFetchRefferalPayout = async (req, res) => {
  const { memberid } = req.body;

  const memberPayoutFetch = await Member.findOne({ memberid: memberid });
  if (memberPayoutFetch) {
    const wallet = memberPayoutFetch.wallet;
    return res.status(200).json({
      message: "Member Wallet Fetched",
      wallet,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// refferalPayoutRequestMember

exports.refferalPayoutRequestMember = async (req, res) => {
  const { memberid, requestAmount, paymentBy } = req.body;

  try {
    if (!requestAmount) {
      return res
        .status(422)
        .json({ data: null, message: "Please Enter Amount" });
    }

    const memberWalletFetch = await Member.findOne({ memberid: memberid });

    if (!memberWalletFetch) {
      return res.status(400).json({ data: null, message: "Member not found" });
    }

    const walletAmount = memberWalletFetch.wallet;

    if (requestAmount > walletAmount) {
      return res.status(400).json({
        data: null,
        message: "Insufficient Balance",
      });
    }

    const restAmount = walletAmount - requestAmount;
    const requestDate = new Date();
    const requestWithdrawal = new memberRefferalPayoutRequest({
      memberid,
      walletAmount: requestAmount,
      requestDate,
      paymentBy,
    });

    const savedRequest = await requestWithdrawal.save();

    if (savedRequest) {
      await Member.updateOne(
        { memberid: memberid },
        {
          $set: {
            wallet: restAmount,
            verifyDate: Date.now(),
          },
        }
      );

      return res.status(201).json({
        data: savedRequest, // Include the created data here
        message: "Withdrawal request sent",
      });
    } else {
      return res
        .status(500)
        .json({ data: null, message: "Something went wrong" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ data: null, message: "Internal server error" });
  }
};

// fetchMemberRefferalPayoutRequestWithdrawal
exports.fetchMemberRefferalPayoutRequestWithdrawal = async (req, res) => {
  const { memberid } = req.body;
  let memberWithdrawalRequest = await memberRefferalPayoutRequest.find({
    memberid: memberid,
  });
  if (memberWithdrawalRequest) {
    return res.status(200).json({
      message: "Withdrawal Request fetched",
      memberWithdrawalRequest,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// memberFetchRefferalPayoutApproveWithdrawal
exports.memberFetchRefferalPayoutApproveWithdrawal = async (req, res) => {
  const { memberid } = req.body;
  let memberApproveWithdrawal =
    await memberRefferalPayoutApproveWithdrawal.find({ memberid: memberid });
  if (memberApproveWithdrawal) {
    return res.status(200).json({
      message: " Approved withdrawal fetched",
      memberApproveWithdrawal,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchMemberNotificationStatus
exports.fetchMemberNotificationStatus = async (req, res) => {
  const { memberid } = req.body;
  let notificationStatus = await Member.findOne({ memberid: memberid });
  if (notificationStatus) {
    const isNotification = notificationStatus.notification;
    return res.status(200).json({
      message: "Notification status fetched",
      isNotification,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// setNotificationToFalseMember
exports.setNotificationToFalseMember = async (req, res) => {
  const { memberid } = req.body;

  let setNotificationStatus = await Member.updateOne(
    { memberid: memberid },
    {
      $set: { notification: 0 },
    }
  );
  if (setNotificationStatus) {
    return res.status(201).json({ message: "Notification set to zero " });
  } else {
    return res.status(500).json({ message: "something went wrong" });
  }
};

// fetchChatDetailsRefferal
exports.fetchChatDetailsRefferal = async (req, res) => {
  const { memberid } = req.body;
  let refferalChatDetails = await RefferalChatType.find({ memberid: memberid });
  if (refferalChatDetails) {
    return res.status(200).json({
      message: " Refferal Chat details fetched",
      refferalChatDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchChatMessageRefferal
exports.fetchChatMessageRefferal = async (req, res) => {
  const { room } = req.body;
  let refferalChatMessage = await ReffrealChatMessage.find({ room: room });
  if (refferalChatMessage) {
    return res.status(200).json({
      message: "Chat message fetched",
      refferalChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// adminOnlineOrNotRefferal
exports.adminOnlineOrNotRefferal = async (req, res) => {
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

// refferalTotalWithdrawal
exports.refferalTotalWithdrawal = async (req, res) => {
  const { memberid } = req.body;
  memberRefferalPayoutRequest
    .aggregate([
      {
        $match: {
          memberid: memberid,
        },
      },
      {
        $group: {
          _id: null,
          totalDataSum: {
            $sum: {
              $add: ["$walletAmount"], // Replace with the fields you want to sum
            },
          },
        },
      },
    ])
    .then((result) => {
      if (result.length > 0) {
        const totalSum = result[0].totalDataSum;
        //   console.log('Total sum for user:', totalSum);
        return res.status(200).json({
          message: "Sum of wallet fetched",
          walletAmount: totalSum,
        });
      } else {
        //   console.log('No data found for user');
        return res.status(200).json({
          message: "No Member found",
          data: 0,
        });
      }
    })
    .catch((err) => {
      console.error("Error executing MongoDB aggregation:", err);
    });
};

// refferalMyTeam
exports.refferalMyTeam = async (req, res) => {
  const { refferal_id } = req.body;

  const myteam = await MyReferral.find({ refferal_id: refferal_id });
  console.log(myteam);
  return res.status(200).json({
    message: "My Team fetched",
    teamMembers: myteam,
  });
};

//==============================================================

exports.getOwnMemberCreditWalletTransactionDetails = async (req, res) => {
  try {
    const { memberId } = req.body;
    console.log(memberId, "memberid");

    // Fetch member based on the given member ID
    // const member = await Member.findOne({ memberid: memberId });

    // console.log(member, "member");

    // Check if the member exists
    // if (!member) {
    //   return res.status(404).json({ message: "Member not found" });
    // }

    // Fetch member credit wallet transactions based on member ID
    const memberTransactions = await MemberCreditWalletTransaction.find({
      memberId: memberId,
    });
    console.log(memberTransactions,932)

    if (memberTransactions.length == 0) {
      return res.status(400).json({ message: "member transaction not found" });
    }

    return res.status(200).json({
      message: "Fetched Member Credit Wallet Transaction details",
      memberTransactions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//=================================================================

exports.getOwnTradersInsideMemberCreditWalletTransactionDetails = async (
  req,
  res
) => {
  try {
    const { memberId } = req.body;

    const member = await Member.findOne({ memberid: memberId });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const traders = await User.find({
      reffered_id: member.refferal_id,
    });
    console.log(traders, "traders details");

    if (traders.length === 0) {
      return res
        .status(404)
        .json({ message: "No traders referred by this Member" });
    }

    const traderIds = traders.map((trader) => trader.userid);

    const traderTransactions = await MyReferral.find({
      userid: { $in: traderIds },
    });

    return res.status(200).json({
      message: "Fetched Trader Credit Wallet Transaction details",
      traderTransactions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//===================================================================

exports.createMemberBankAccountHolder = async (req, res) => {
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
    const member = await Member.findOne({ memberid: userId });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Check if the user already has a bank account
    const existingAccount = await BankAccountHolder.findOne({ userId });

    if (existingAccount) {
      return res
        .status(400)
        .json({ message: "Referral already has a bank account" });
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
      message: "Referral Bank Account details saved successfully",
      accountHolder: savedAccountHolder,
    });
  } catch (error) {
    console.error("Error creating account holder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//========================================================================

exports.createMemberUpiHolder = async (req, res) => {
  try {
    const { upiId, userId } = req.body;

    if (!upiId) {
      return res.status(400).json({ message: "UPI Id is required" });
    }
    const member = await Member.findOne({ memberid: userId });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Check if the user already has a upi
    const existingAccount = await UpiHolder.findOne({ userId });

    if (existingAccount) {
      return res.status(400).json({ message: "Referral already has an UPI Id" });
    }

    const newUpi = new UpiHolder({
      upiId,
      userId,
    });

    const savedUpi = await newUpi.save();
    return res
      .status(201)
      .json({ message: "UPI Id saved successfully", savedUpi });
  } catch (error) {
    console.error("Error creating UPI ID:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
//======================================================================

exports.getMemberOwnBankDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    const memberBankDetails = await BankAccountHolder.find({ userId: userId });

    if (!memberBankDetails) {
      return res
        .status(404)
        .json({ message: "Bank details not found for the provided member" });
    }

    return res.status(200).json({
      message: "bank details of member fetched successfully",
      memberBankDetails,
    });
  } catch (error) {
    console.error("Error fetching member bank details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMemberOwnUpi = async (req, res) => {
  try {
    const { userId } = req.body;

    const memberUpiId = await UpiHolder.find({ userId: userId });

    if (!memberUpiId) {
      return res
        .status(404)
        .json({ message: "upi id not found for the provided member" });
    }

    return res
      .status(200)
      .json({ message: "Upi of member fetched successfully", memberUpiId });
  } catch (error) {
    console.error("Error fetching member:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.TotalCountOfTraders = async (req, res) => {
  try {
    const { refferal_id } = req.body;

    // Find all documents that match the refferal_id
    const matchedUsers = await User.find({ reffered_id: refferal_id });
    // Count by checking the length of the returned array
    const traderCount = matchedUsers.length;
    return res.status(200).json({
      traderCount,
    });
  } catch (error) {
    console.error("Error in finding and counting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// totalReferralPayoutAmount
exports.totalReferralPayoutAmount = async (req, res) => {
  try {
    const { memberId } = req.body;
    const result = await MemberCreditWalletTransaction.aggregate([
      {
        $match: { memberId: memberId },
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

// editMemberBankDetails
exports.editMemberBankDetails = async (req, res) => {
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
          isAuthorised:false,
        },
      },
      { new: true }
    );

    if (updateToMember) {
      return res
        .status(200)
        .json({ message: "Referral Bank Details Updated", data: updateToMember });
    } else {
      return res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// editMemberUpiId
exports.editMemberUpiId = async (req, res) => {
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
          isAuthorised:false,
        },
      },
      { new: true }
    );

    if (updateToMember) {
      return res
        .status(200)
        .json({ message: "Referral UPI Id Updated", data: updateToMember });
    } else {
      return res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTradersInReferral = async (req, res) => {
  try {
    const { referralId } = req.body;

    // Find all documents that match the refferal_id
    const traders = await User.find({ reffered_id: referralId });
    return res.status(200).json({
      traders,
    });
  } catch (error) {
    console.error("Error in getting traders in referral:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchReferralNote = async (req, res) => {
  try {
    // Find the latest note intended for traders or all users
    const latestNote = await Note.find({
      sendingTo: { $in: ["referrals", "all"] },
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