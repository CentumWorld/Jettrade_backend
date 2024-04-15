const Razorpay = require("razorpay");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const forgetPasswordSms = require("../utils/forget-password-otp");
require("dotenv").config();
const ProfilePhoto = require("../model/profilePhotoSchema");
const Userdocument = require("../model/userDocumentSchema");
const notificationForAll = require("../model/notificationForAllSchema");
const notificationForAllTrader = require("../model/notificationForAllTraderSchema");
const notificationForParticularTrader = require("../model/notificationForParticularTraderSchema");
const Member = require("../model/memberSchema");
const userRefferalPayoutRequest = require("../model/userRefferalPayoutRequest");
const userRefferalPayoutApproveWithdrawal = require("../model/userRefferalPayoutApproveWithdrawalSchema");
const ChatType = require("../model/chatType");
const chatMessage = require("../model/chatMessageSchema");
const Admin = require("../model/adminSchema");
const SuccessfullRegistrationSms = require("../utils/successfull-registration");
const PasswordReset = require("../utils/password-reset");
const ChangePassword = require("../utils/change-password");
const validator = require("validator");
const Video = require("../model/videoModel");
const WalletTransaction = require("../model/transactionSchema");
const UserRenewal = require("../model/userRenewelSchema");
const MoneyWithdrawalTransaction = require("../model/withDrawlSchema");
const AllNewPaidUser = require("../model/allNewPaidUserSchema");
const MyReferral = require("../model/myReferralSchema");
const Like = require("../model/likeModel");
const DisLike = require("../model/disLikeModel");
const {
  isValidPassword,
  isValidPhone,
  isValidUserId,
} = require("../validation/validation");
const BusinessDeveloper = require("../model/businessDeveloperSchema");
const BusinessDeveloperCreditWalletTransaction = require("../model/businessDeveloperCreditWalletTransaction");
const Franchise = require("../model/frenchiseSchema");
const FranchiseCreditWalletTransaction = require("../model/frenchiseCreditWalletTransactionSchema");
const StateHandler = require("../model/stateHandlerSchema");
const StateHandlerCreditWalletTransaction = require("../model/stateHandlerCreditWalletTransactionScema");
const AdminCreditWalletTransaction = require("../model/adminCreditWalletTransaction");
const userCreditWalletTransaction = require("../model/userCreditWalletTransaction");
const memberCreditWalletTransaction = require("../model/memberCreditWalletTransaction");
const BankAccountHolder = require("../model/BankAccountHolderSchema");
const UpiHolder = require("../model/UpiHolderSchema");
const TotaltradingValue = require("../model/totalTradingValue");
const Invoice = require("../model/Invoice");

//const profilePhoto = require('../model/profilePhotoSchema');

// userRegistartion
exports.userRegistration = async (req, res) => {
  if (!req.files["aadhar_front_side"]) {
    return res.status(422).json({
      message: "Please upload adhar card front side.",
    });
  }
  if (!req.files["aadhar_back_side"]) {
    return res.status(422).json({
      message: "Please upload adhar card back side.",
    });
  }

  if (!req.files["pan_card"]) {
    return res.status(422).json({
      message: "Please upload pan card.",
    });
  }

  const userType = "indian";
  const aadhar_front_side = req.files.aadhar_front_side[0].location;
  const aadhar_back_side = req.files.aadhar_back_side[0].location;
  const pan_card = req.files.pan_card[0].location;
  //console.log(aadhar_back, aadhar_front, pan_card,'140');

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
    "reffered_id",
  ];

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
    doj,
    rig
  } = req.body;

  // Check if any required field is missing
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(422).json({
      message: `Please fill all details: ${missingFields.join(", ")}`,
    });
  }

  let isValidRefferedIdUser = await User.findOne({ refferal_id: reffered_id });
  let isValidRefferedIdMember = await Member.findOne({
    refferal_id: reffered_id,
  });
  let isValidRefferedIdAdmin = await Admin.findOne({ referralId: reffered_id });
  let isValidRefferedIdFranchise = await Franchise.findOne({
    referralId: reffered_id,
  });
  let isValidRefferedIdBmm = await StateHandler.findOne({
    referralId: reffered_id,
  });

  if (
    !isValidRefferedIdUser &&
    !isValidRefferedIdMember &&
    !isValidRefferedIdAdmin &&
    !isValidRefferedIdFranchise &&
    !isValidRefferedIdBmm
  ) {
    return res
      .status(400)
      .json({ message: "You are providing a wrong referral id" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid email address" });
  }

  const aadhar_length = aadhar;
  const pan_length = pan;

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

      if (!isValidPassword(password)) {
        return res.status(400).json({
          message: "Password must be minimum length of 8 charector!",
        });
      }

      const userExist = await User.findOne({ userid: userid });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "this userId is already taken" });
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
        userType,
        userid,
        password,
        rig
      });
      await user.save();
      const phone1 = "+" + user.phone;
      // SuccessfullRegistrationSms(phone1, { "userid": user.userid, "password": password })
      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 6000 } // Set the token to expire in 1 hour
      );
      console.log(token, "270");

      res.status(201).json({
        message: "User registered successfully",
        token,
      userLogin: user,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);
      // const userid = userid;
      // const password = password;

      const userExist = await User.findOne({ userid: userid });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "this userId is already taken." });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          message:
            "Password must at least one digit, one lowercase letter, one uppercase letter, and be 8 to 15 characters long.",
        });
      }

      if (!isValidUserId(userid)) {
        return res.status(400).json({
          message:
            "User ID must be a combination of at least one letter and one digit, and it should be a minimum of 6 characters in length.",
        });
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
        userType,
        userid,
        password,
        rig
      });
      await user.save();
      const phone2 = "+" + user.phone;
      // SuccessfullRegistrationSms(phone2, { "userid": user.userid, "password": password })

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 6000 } // Set the token to expire in 1 hour
      );
      res.status(201).json({
        message: "User registered successfully",
        token,
        userLogin:user
       
      });
    } catch (error) {
      console.log(error);
    }
  }
};

// otherCountryUserRegistration
//==
exports.otherCountryUserRegistration = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Uploaded" });
    }

    const ID_Card = req.file.location;
    const userType = "otherCountry";

    const requiredFields = [
      "fname",
      "lname",
      "email",
      "phone",
      "address",
      "gender",
      "dob",
      "Id_No",
      "reffered_id",
    ];

    const {
      fname,
      lname,
      email,
      phone,
      address,
      gender,
      dob,
      Id_No,
      reffered_id,
      userid,
      password,
      doj,
      rig
    } = req.body;

    // Check if any required field is missing
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(422).json({
        message: `Please fill in all details: ${missingFields.join(", ")}`,
      });
    }

    let isValidRefferedIdUser = await User.findOne({
      refferal_id: reffered_id,
    });
    let isValidRefferedIdMember = await Member.findOne({
      refferal_id: reffered_id,
    });
    let isValidRefferedIdAdmin = await Admin.findOne({
      referralId: reffered_id,
    });
    let isValidRefferedIdFranchise = await Franchise.findOne({
      referralId: reffered_id,
    });
    let isValidRefferedIdBmm = await StateHandler.findOne({
      referralId: reffered_id,
    });

    if (
      !isValidRefferedIdUser &&
      !isValidRefferedIdMember &&
      !isValidRefferedIdAdmin &&
      !isValidRefferedIdFranchise &&
      !isValidRefferedIdBmm
    ) {
      return res
        .status(400)
        .json({ message: "You are providing a wrong referral id" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email address" });
    }

    if (!userid && !password) {
      const generatedUserId = fname + Math.floor(Math.random() * 100000 + 1);

      const refferal_id =
        generatedUserId + Math.floor(Math.random() * 100000 + 1);

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

      const generatedPassword = makepassword(8);

      const userExist = await User.findOne({ userid: generatedUserId });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "This user ID is already taken" });
      }

      console.log(refferal_id, "referral");

      const user = new User({
        fname,
        lname,
        email,
        phone,
        address,
        gender,
        dob,
        refferal_id,
        reffered_id,
        Id_No,
        ID_Card,
        userType,
        userid: generatedUserId,
        password: generatedPassword,
        rig
      });

      await user.save();
      const phone3 = "+" + user.phone;
      // SuccessfullRegistrationSms(phone3, { "userid": user.userid, "password": generatedPassword })

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 6000 } // Set the token to expire in 1 hour
      );

      return res.status(201).json({
        message: "User registered successfully",
        token,
        userLogin: user,


       
      });
    } else {
      if (!userid) {
        return res.status(422).json({ message: "Please provide User Id" });
      }
      if (!password) {
        return res.status(422).json({ message: "Please provide password" });
      }

      const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);

      const userExist = await User.findOne({ userid });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "This user ID is already taken" });
      }

      if (password.length < 8) {
        return res.status(400).json({
          message: "Password must be a minimum of 8 characters long!",
        });
      }

      if (!isValidUserId(userid)) {
        return res.status(400).json({
          message:
            "User ID must be a combination of at least one letter and one digit, and it should be a minimum of 6 characters in length.",
        });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          message:
            "Password must at least one digit, one lowercase letter, one uppercase letter, and be 8 to 15 characters long.",
        });
      }

      const user = new User({
        fname,
        lname,
        email,
        phone,
        address,
        gender,
        dob,
        refferal_id,
        reffered_id,
        Id_No,
        ID_Card,
        userType,
        userid,
        password,
        rig
      });

      await user.save();
      const phone4 = "+" + user.phone;

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 6000 } // Set the token to expire in 1 hour
      );
      return res.status(201).json({
        message: "User registered successfully",
        token,
        userLogin: user
       
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//==
exports.userLogin = async (req, res) => {
  try {
    const { userid, password } = req.body;
    if (!userid || !password) {
      return res
        .status(422)
        .json({ status: false, message: "Please fill all details" });
    }
    const userLogin = await User.findOne({ userid: userid });
    console.log(userLogin, "104");

    if (!userLogin) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid Credential!" });
    }

    const blocked = userLogin.isBlocked;
    if (blocked) {
      return res
        .status(403)
        .json({ status: false, message: "Your account is blocked!" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    const token = jwt.sign(
      { userId: userLogin._id, role: "user" },
      process.env.SECRET_KEY,
      { expiresIn: "8h" } // Set the token to expire in 1 hour
    );
    console.log(token, "270");

    if (!isMatch) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid Credential!" });
    } else {
      return res.status(200).json({
        status: true,
        message: "User Login successfully",
        token: token,
        userLogin,
        expires: new Date().getTime() + 60000,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

// userFetchDeatils
exports.userFetchDeatils = async (req, res) => {
  let token = req.token;
  let verifyToken = req.verifyToken;
  //console.log(token,verifyToken);

  const userFetchDetails = await User.findOne({ token });
  //console.log(userFetchDetails)
  if (userFetchDetails) {
    console.log(userFetchDetails);
    return res.status(200).json({ message: "User Details Fetched" });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// profileVerification
exports.profileVerification = async (req, res) => {
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

    const userid = req.body.userid;

    if (!userid) {
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

    const userDocuments = await User.findOneAndUpdate(
      { userid: userid },
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

// resetPassword
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, token } = req.body;
  console.log(token);
  // console.log(req.token)
  console.log(oldPassword, newPassword, "380");
  if (!oldPassword || !newPassword) {
    return res.status(422).json({ message: "Fields required" });
  }

  // if (newPassword !== confirmPassword) {
  //     return res.status(422).json({ message: "Password Not Matched" })
  // }

  //   const   verifyToken =req.body.verifyToken

  const userFetchDetails = await User.findOne({ token });
  console.log(userFetchDetails);
  if (userFetchDetails) {
    const isMatch = await bcrypt.compare(
      oldPassword,
      userFetchDetails.password
    );
    if (isMatch) {
      userFetchDetails.password = req.body.newPassword;
      await userFetchDetails.save();
      const phone = "+" + userFetchDetails.phone;
      ChangePassword(phone, {
        userid: userFetchDetails.userid,
        password: req.body.newPassword,
      });
      return res.status(201).json({ message: "Password successfully Change" });
    } else {
      return res.status(422).json({ message: "Old Password Is Wrong1" });
    }
    //console.log(isMatch,'198');
  }
};

// forgetPassword
exports.forgetPassword = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const phone = req.body;
  //verifyToken = req.verifyToken;
  console.log(otp, "207");

  const userFetchDetails = await User.findOne(phone);
  console.log(userFetchDetails, "210");

  if (userFetchDetails) {
    let phone = "+" + userFetchDetails.phone;

    forgetPasswordSms(phone, { otp: otp });
    userFetchDetails.otp = otp;
    await userFetchDetails.save();
    return res.status(201).json({ message: "OTP Sent" });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

// verifyOtp
exports.verifyOtp = async (req, res) => {
  const { phone } = req.body;
  //verifyToken = req.verifyToken;
  const otp = Number(req.body.otp);
  console.log(typeof otp);

  const userFetchDetails = await User.findOne({ phone });
  if (userFetchDetails) {
    if (userFetchDetails.otp !== otp) {
      return res.status(400).json({ message: "OTP Invalid" });
    } else {
      return res.status(200).json({ message: "OTP matched" });
    }
  }
};

// resetPassword
exports.resetPassword = async (req, res) => {
  const { phone } = req.body;
  const { newPassword, confirmPassword } = req.body;

  console.log(newPassword, confirmPassword);
  if (!newPassword || !confirmPassword) {
    return res.status(422).json({ message: "Fields required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(422).json({ message: "Password Not Matched" });
  }

  //verifyToken = req.verifyToken;

  const userFetchDetails = await User.findOne({ phone });
  if (userFetchDetails) {
    userFetchDetails.password = req.body.newPassword;
    await userFetchDetails.save();
    const phone = "+" + userFetchDetails.phone;
    PasswordReset(phone, { password: req.body.newPassword });

    return res.status(201).json({ message: "Password Successfully Reset" });
  }
};

// Profile photo Upload
exports.profilePhotoUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No File Uploaded" });
  }
  const userid = req.body.userid;
  const imageUrl = req.file.location;

  const result = await ProfilePhoto.find({ userid });
  console.log(result.length);
  if (result.length > 0) {
    ProfilePhoto.updateOne({ userid: userid })
      .set({ imageUrl: imageUrl })
      .then(() => {
        return res.status(201).json({ message: "Profile photo Updated" });
      });
  } else {
    if (!userid || !imageUrl) {
      return res.send({
        code: 400,
        message: "Bad Request",
      });
    }

    const profilePhoto = new ProfilePhoto({
      userid: userid,
      imageUrl: imageUrl,
    });
    const success = await profilePhoto.save();

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

exports.fetchUserDetailsUserside = async (req, res) => {
  const _id = req.body;
  User.findById(_id)
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
// fetchProfilePhotoUser
exports.fetchProfilePhotoUser = async (req, res) => {
  const { userid } = req.body;
  ProfilePhoto.find({ userid })
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

// fetchUserDocumentUser
exports.fetchUserDocumentUser = async (req, res) => {
  const { userid } = req.body;
  await Userdocument.find({ userid })
    .then((result) => {
      res.status(200).json({
        message: "User documents Fetched",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// editUserDetails
exports.editUserDetails = async (req, res) => {
  const { userid } = req.body;
  User.find({ userid })
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

// saveEditedUserDetails
exports.saveEditedUserDetails = async (req, res) => {
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
    Id_No,
    userid,
  } = req.body;

  try {
    let updateFields = {};
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

      updateFields = {
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
      };
    } else if (userWhat === "other") {
      if (!fname || !lname || !phone || !address || !gender || !Id_No) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      updateFields = {
        $set: {
          fname: fname,
          lname: lname,
          address: address,
          gender: gender,
          phone: phone,
          dob: dob,
          Id_No: Id_No,
        },
      };
    }

    const updatedUser = await User.findOneAndUpdate(
      { userid: userid },
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(201)
      .json({ message: "User Details Updated", updatedUser });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetchUserNotification
exports.fetchUserNotification = async (req, res) => {
  const { userid } = req.body;
  const allNotitfication = await notificationForAll.find();
  //console.log(allNotitfication);
  if (allNotitfication) {
    const allTraderNotification = await notificationForAllTrader.find();
    if (allTraderNotification) {
      const particularTrader = await notificationForParticularTrader.find({
        userid: userid,
      });
      if (particularTrader) {
        res.status(200).json({
          message: "User notification fetched",
          allNotitfication,
          allTraderNotification,
          particularTrader,
        });
      }
    }
  }
};

// paymentUseridVerify
exports.paymentUseridVerify = async (req, res) => {
  const { userid } = req.body;
  console.log(userid, "927");
  let paymentValue = 0;
  if (!userid) {
    res.status(404).json({
      message: "Please enter user ID",
    });
  } else {
    const user = await User.findOne({ userid: userid });

    if (!user) {
      return res.status(422).json({
        message: "Invalid User ID",
      });
    } else {
      paymentValue = user.paymentCount;
    }
    if (paymentValue > 0) {
      return res.status(200).json({
        message: "Please Login and Renewal",
        statusCode: 200,
      });
    } else if (paymentValue === 0) {
      return res.status(200).json({
        message: "User id verified",
        user,
        statusCode: 201,
      });
    }
  }
};

//=================
exports.fetchUserid = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User not found" });
    }

    let paymentValue = 0;
    if (user.paymentCount) {
      paymentValue = user.paymentCount;
    }

    if (paymentValue > 0) {
      return res.status(200).json({
        message: "Please Login and Renewal",
        statusCode: 200,
      });
    } else if (paymentValue === 0) {
      return res.status(200).json({
        message: "User ID verified",
        user,
        statusCode: 201,
      });
    }
    res.status(200).json({ statusCode: 200, userid: user.userid });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

exports.changeUserPaymentStatus = async (req, res) => {
  const { userid } = req.body;
  const serviceAmount = 3500;
  const userExist = await User.findOne({ userid: userid });
  const payment = userExist.paymentCount;
  const reffered_id = userExist.reffered_id;

  // Find the document with the highest invoice number
  const latestUserInvoice = await User.aggregate([
    {
      $group: {
        _id: null,
        maxInvoiceNumber: { $max: { $toInt: "$invoiceNumber" } },
      },
    },
    {
      $project: {
        _id: 0,
        maxInvoiceNumber: { $toString: "$maxInvoiceNumber" },
      },
    },
  ]);

  console.log(latestUserInvoice, 1060);

  if (latestUserInvoice[0].maxInvoiceNumber === null) {
    console.log("No invoices found");
    const latestUserInvoiceNumber = "000001";
    // Update the user document with the default invoice number
    await User.updateOne(
      { userid },
      { $set: { invoiceNumber: latestUserInvoiceNumber } }
    );
    console.log("Default invoice number updated successfully");
  } else {
    const maxInvoiceNumber = latestUserInvoice[0].maxInvoiceNumber;
    const updateToInVoiceNumber = String(
      parseInt(maxInvoiceNumber) + 1
    ).padStart(6, "0");
    await User.updateOne(
      { userid },
      { $set: { invoiceNumber: updateToInVoiceNumber } }
    );
    console.log("invoice number updated successfully");
  }

  const user = await User.updateOne(
    { userid: userid },
    {
      $set: {
        paymentStatus: true,
        paymentCount: payment + 1,
        isBlocked: false,
        doj: new Date(),
      },
    }
  );
  const referaluser = await User.findOne({
    refferal_id: reffered_id,
  });

  if (referaluser) {
    const userId = referaluser.userid;
    await Admin.updateOne(
      { referralId: "admin@123" },
      { $inc: { adminWallet: 2600 } }
    );
    const adminRefferalTransaction = new AdminCreditWalletTransaction({
      admin_id: "admin",
      creditAmount: 2600,
      refferUserId: userId,
      Type: "New",
    });
    adminRefferalTransaction.save();
  }

  const firstTimeUser = await User.findOne({userid: userid})

  const userActivate = new AllNewPaidUser({
    userid: userid,
    activationAmount: serviceAmount,
    firstName: firstTimeUser.fname,
    lastName: firstTimeUser.lname,
    phoneNumber: firstTimeUser.phone,
    invoiceNumber: firstTimeUser.invoiceNumber,

  });
  await userActivate.save();

  if (reffered_id === "admin@123") {
    const admin = await Admin.findOne({
      referralId: "admin@123", // Assuming "admin@123" is the admin's referralId
    });
    if (admin) {
      let adminWallet = admin.adminWallet;
      adminWallet += 3500;
      // Update admin's wallet
      await Admin.updateOne(
        { referralId: "admin@123" }, // Assuming "admin@123" is the admin's referralId
        { $set: { adminWallet: adminWallet } }
      );
      // Create an AdminCreditWalletTransaction document
      const adminCreditWalletTransaction = new AdminCreditWalletTransaction({
        admin_id: admin.admin_id, // Replace with the actual admin ID
        creditAmount: 3500,
        refferUserId: userid, // Assuming the user being referred is the one specified in the request
        Type: "New",
      });

      // Save the AdminCreditWalletTransaction document
      await adminCreditWalletTransaction.save();
      return res.status(200).json({ message: "Your payment successful" });
    } else {
      return res.status(500).json({ message: "Admin not found" });
    }
  } else {
    if (user) {
      const findUserFromRefferedId = await User.find({
        refferal_id: reffered_id,
      });
      if (findUserFromRefferedId.length > 0) {
        const findUserfromUser = await User.find({ refferal_id: reffered_id });
        if (findUserfromUser.length > 0 && payment < 1) {
          const userid = findUserFromRefferedId[0].userid;
          let wallet = findUserFromRefferedId[0].wallet;
          wallet = wallet + 900;
          console.log(wallet);
          const insertUserWalletAmount = await User.updateOne(
            { userid: userid },
            {
              $set: {
                wallet: wallet,
              },
            }
          );
          const myReferralDetails = new MyReferral({
            userid: userExist.userid,
            joininigDate: userExist.doj,
            refferal_id: userExist.reffered_id,
            referralAmount: 900,
            userType: "New",
            role: "User",
            refferUserID: userid,
          });
          myReferralDetails.save();
          const userCreditWalletTransactionsDetails =
            new userCreditWalletTransaction({
              userId: userid,
              joininigDate: userExist.doj,
              refferUserId: userExist.userid,
              creditAmount: 900,
              Type: "New",
            });
          userCreditWalletTransactionsDetails.save();
          if (insertUserWalletAmount) {
            return res.status(200).json({
              message: "Payment Successfull",
            });
          }
        } else {
          const userid = findUserFromRefferedId[0].userid;
          let wallet = findUserFromRefferedId[0].wallet;
          wallet = wallet + 500;
          console.log(wallet);
          const insertUserWalletAmount = await User.updateOne(
            { userid: userid },
            {
              $set: {
                wallet: wallet,
              },
            }
          );
          const myReferralDetails = new MyReferral({
            userid: userExist.userid,
            joininigDate: userExist.doj,
            refferal_id: userExist.reffered_id,
            referralAmount: 500,
            userType: "Renewal",
            role: "User",
            refferUserID: userid,
          });
          myReferralDetails.save();
          const userCreditWalletTransactionsDetails =
            new userCreditWalletTransaction({
              userId: userExist.userid,
              joininigDate: userExist.doj,
              refferUserId: userid,
              creditAmount: 500,
              Type: "Renewal",
            });
          userCreditWalletTransactionsDetails.save();
          if (insertUserWalletAmount) {
            return res.status(200).json({
              message: "Payment Successfull",
            });
          }
        }
      } else {
        const findUserFromMemberRefferedId = await Member.find({
          refferal_id: reffered_id,
        });
        if (findUserFromMemberRefferedId.length > 0 && payment < 1) {
          const memberid = findUserFromMemberRefferedId[0].memberid;
          const memberReferred = findUserFromMemberRefferedId[0].reffered_id;

          const franchiseDetails = await Franchise.findOne({
            referralId: memberReferred,
          });
          console.log(franchiseDetails, "franchise details");
          if (franchiseDetails) {
            const franchiseUserid = franchiseDetails.frenchiseId;
            let franchiseWallet = franchiseDetails.frenchiseWallet;
            const WALLET_CREDIT_AMOUNT = 450;
            franchiseWallet = franchiseWallet + WALLET_CREDIT_AMOUNT;
            // Update franchise wallet
            await Franchise.updateOne(
              { referralId: memberReferred },
              {
                $set: {
                  frenchiseWallet: franchiseWallet,
                },
              }
            );
            // Create franhchise credit wallet transaction record
            const franchiseCreditWalletDetails =
              new FranchiseCreditWalletTransaction({
                frenchiseId: franchiseUserid,
                creditAmount: WALLET_CREDIT_AMOUNT,
                Type: "New",
                refferUserId: memberid,
              });
            await franchiseCreditWalletDetails.save();

            console.log(franchiseDetails.referredId);

            const transferAmount = 450;

            const bmm = await StateHandler.findOne({
              referralId: franchiseDetails.referredId,
            });
            console.log(bmm, "bmm");

            if (bmm) {
              let bmmWallet = bmm.stateHandlerWallet;
              bmmWallet += transferAmount;

              await StateHandler.updateOne(
                { referralId: franchiseDetails.referredId },
                { $set: { stateHandlerWallet: bmmWallet } }
              );

              const bmmCreditWalletDetails =
                new StateHandlerCreditWalletTransaction({
                  stateHandlerId: bmm.stateHandlerId,
                  creditAmount: transferAmount,
                  Type: "New",
                  refferUserId: franchiseDetails.frenchiseId,
                });
              await bmmCreditWalletDetails.save();
            }

            const admin = await Admin.findOne({
              referralId: bmm.referredId,
            });
            console.log(admin, "1195admin details");
            if (admin) {
              console.log(admin.adminWallet);
              let adminWallet = admin.adminWallet;
              adminWallet += 1700;
              await Admin.updateOne(
                { referralId: bmm.referredId },
                { $set: { adminWallet: adminWallet } }
              );
              const adminCreditWalletDetails = new AdminCreditWalletTransaction(
                {
                  admin_id: admin.admin_id,
                  creditAmount: 1700,
                  Type: "New",
                  refferUserId: bmm.stateHandlerId,
                }
              );
              await adminCreditWalletDetails.save();
            }
          }
          let wallet = findUserFromMemberRefferedId[0].wallet;
          wallet = wallet + 900;
          // Update member wallet
          const insertWalletAmount = await Member.updateOne(
            { memberid },
            {
              $set: {
                wallet,
              },
            }
          );
          // Create referral details for new member
          const myReferralDetails = new MyReferral({
            userid: userExist.userid,
            joininigDate: userExist.doj,
            refferal_id: userExist.reffered_id,
            referralAmount: 900,
            userType: "New",
            role: "Member",
            refferUserID: memberid,
          });
          await myReferralDetails.save();
          // Create referral details for new member
          const memberCreditWalletTransactionDetails =
            new memberCreditWalletTransaction({
              memberId: findUserFromMemberRefferedId[0].memberid,
              creditAmount: 900,
              Type: "New",
              refferUserId: userExist.userid,
            });
          await memberCreditWalletTransactionDetails.save();
          // admin_id: admin.admin_id,
          // creditAmount: 1400,
          // Type: "New",
          // refferUserId: stateHandler.stateHandlerId,
          if (insertWalletAmount) {
            return res.status(200).json({
              message: "Payment Successful",
            });
          }
        } else {
          const findUserFromFranchiseRefferedId = await Franchise.find({
            referralId: reffered_id,
          });
          if (findUserFromFranchiseRefferedId.length > 0 && payment < 1) {
            const frenchiseId = findUserFromFranchiseRefferedId[0].frenchiseId;
            const franchiseReferred =
              findUserFromFranchiseRefferedId[0].referredId;

            const BmmDetails = await StateHandler.findOne({
              referralId: franchiseReferred,
            });
            console.log(BmmDetails, 1342);
            if (BmmDetails) {
              const BmmUserid = BmmDetails.stateHandlerId;
              let BmmWallet = BmmDetails.stateHandlerWallet;
              const WALLET_CREDIT_AMOUNT = 450;
              BmmWallet = BmmWallet + WALLET_CREDIT_AMOUNT;
              // Update franchise wallet
              await StateHandler.updateOne(
                { referralId: franchiseReferred },
                {
                  $set: {
                    stateHandlerWallet: BmmWallet,
                  },
                }
              );
              // Create Bmm credit wallet transaction record
              const BmmCreditWalletDetails =
                new StateHandlerCreditWalletTransaction({
                  stateHandlerId: BmmUserid,
                  creditAmount: WALLET_CREDIT_AMOUNT,
                  Type: "New",
                  refferUserId: frenchiseId,
                });
              await BmmCreditWalletDetails.save();

              console.log(BmmDetails.referredId);

              const admin = await Admin.findOne({
                referralId: BmmDetails.referredId,
              });
              console.log(admin, "1376admin details");
              if (admin) {
                console.log(admin.adminWallet);
                let adminWallet = admin.adminWallet;
                adminWallet += 2150;
                await Admin.updateOne(
                  { referralId: BmmDetails.referredId },
                  { $set: { adminWallet: adminWallet } }
                );
                const adminCreditWalletDetails =
                  new AdminCreditWalletTransaction({
                    admin_id: admin.admin_id,
                    creditAmount: 2150,
                    Type: "New",
                    refferUserId: BmmDetails.stateHandlerId,
                  });
                await adminCreditWalletDetails.save();
              }
            }

            let frenchiseWallet =
              findUserFromFranchiseRefferedId[0].frenchiseWallet;
            frenchiseWallet = frenchiseWallet + 900;
            // Update member wallet
            const insertWalletAmount = await Franchise.updateOne(
              { frenchiseId },
              {
                $set: {
                  frenchiseWallet,
                },
              }
            );
            // Create referral details for new member
            const myReferralDetails = new MyReferral({
              userid: userExist.userid,
              joininigDate: userExist.doj,
              refferal_id: userExist.reffered_id,
              referralAmount: 900,
              userType: "New",
              role: "Franchise",
              refferUserID: frenchiseId,
            });
            await myReferralDetails.save();
            // Create referral details for new member
            const franchiseCreditWalletTransactionDetails =
              new FranchiseCreditWalletTransaction({
                frenchiseId: findUserFromFranchiseRefferedId[0].frenchiseId,
                creditAmount: 900,
                Type: "New",
                refferUserId: userExist.userid,
              });
            await franchiseCreditWalletTransactionDetails.save();
            if (insertWalletAmount) {
              return res.status(200).json({
                message: "Payment Successful",
              });
            }
          } else {
            const findUserFromBmmRefferedId = await StateHandler.find({
              referralId: reffered_id,
            });
            if (findUserFromBmmRefferedId.length > 0 && payment < 1) {
              const stateHandlerId =
                findUserFromBmmRefferedId[0].stateHandlerId;
              const BmmReferred = findUserFromBmmRefferedId[0].referredId;

              const admin = await Admin.findOne({
                referralId: BmmReferred,
              });
              console.log(admin, "1376admin details");
              if (admin) {
                console.log(admin.adminWallet);
                let adminWallet = admin.adminWallet;
                adminWallet += 2600;
                await Admin.updateOne(
                  { referralId: BmmReferred },
                  { $set: { adminWallet: adminWallet } }
                );
                const adminCreditWalletDetails =
                  new AdminCreditWalletTransaction({
                    admin_id: admin.admin_id,
                    creditAmount: 2600,
                    Type: "New",
                    refferUserId: stateHandlerId,
                  });
                await adminCreditWalletDetails.save();
              }

              let stateHandlerWallet =
                findUserFromBmmRefferedId[0].stateHandlerWallet;
              stateHandlerWallet = stateHandlerWallet + 900;
              // Update member wallet
              const insertWalletAmount = await StateHandler.updateOne(
                { stateHandlerId },
                {
                  $set: {
                    stateHandlerWallet,
                  },
                }
              );
              // Create referral details for new member
              const myReferralDetails = new MyReferral({
                userid: userExist.userid,
                joininigDate: userExist.doj,
                refferal_id: userExist.reffered_id,
                referralAmount: 900,
                userType: "New",
                role: "BMM",
                refferUserID: stateHandlerId,
              });
              await myReferralDetails.save();
              // Create referral details for new member
              const BmmCreditWalletTransactionDetails =
                new StateHandlerCreditWalletTransaction({
                  stateHandlerId: findUserFromBmmRefferedId[0].stateHandlerId,
                  creditAmount: 900,
                  Type: "New",
                  refferUserId: userExist.userid,
                });
              await BmmCreditWalletTransactionDetails.save();
              if (insertWalletAmount) {
                return res.status(200).json({
                  message: "Payment Successful",
                });
              }
            }
          }
        }
      }
    } else {
      console.log(error.message);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};

// userfetchRefferalPayout
exports.userfetchRefferalPayout = async (req, res) => {
  const { userid } = req.body;

  const userPayoutFetch = await User.findOne({ userid: userid });
  if (userPayoutFetch) {
    const wallet = userPayoutFetch.wallet;
    return res.status(200).json({
      message: "User Details Fetched",
      wallet,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// refferalPayoutRequestUser
exports.refferalPayoutRequestUser = async (req, res) => {
  const { userid, requestAmount } = req.body;
  if (!requestAmount) {
    return res.status(422).json({ message: "Please Enter Amount" });
  }
  const userWalletFetch = await User.findOne({ userid: userid });
  if (userWalletFetch) {
    let walletAmount = userWalletFetch.wallet;
    if (requestAmount > walletAmount) {
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    } else {
      const restAmount = walletAmount - requestAmount;
      let requestDate = new Date();
      const requestWithdrawal = new userRefferalPayoutRequest({
        userid,
        walletAmount: requestAmount,
        requestDate,
      });
      await requestWithdrawal.save();
      if (requestWithdrawal) {
        await User.updateOne(
          { userid: userid },
          {
            $set: {
              wallet: restAmount,
            },
          }
        );
        return res.status(201).json({
          message: "Withdrawal request sent",
        });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
    // console.log(walletAmount,'694');
  }
};

// userFetchRefferalPayoutWithdrawalRequest
exports.userFetchRefferalPayoutWithdrawalRequest = async (req, res) => {
  const { userid } = req.body;
  let userWithdrawalRequest = await userRefferalPayoutRequest.find({
    userid: userid,
  });
  if (userWithdrawalRequest) {
    return res.status(200).json({
      message: "Withdrawal Request fetched",
      userWithdrawalRequest,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchApproveRefferalPayoutUser
exports.fetchApproveRefferalPayoutUser = async (req, res) => {
  const { userid } = req.body;
  let userWithdrawalApprove = await userRefferalPayoutApproveWithdrawal.find({
    userid: userid,
  });
  if (userWithdrawalApprove) {
    return res.status(200).json({
      message: "Withdrawal Request fetched",
      userWithdrawalApprove,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchChatDetailsUser
exports.fetchChatDetailsUser = async (req, res) => {
  const { userid } = req.body;
  let userChatDetails = await ChatType.find({ userid: userid });
  if (userChatDetails) {
    return res.status(200).json({
      message: "Chat details fetched",
      userChatDetails,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// fetchChatMessageUser
exports.fetchChatMessageUser = async (req, res) => {
  const { room } = req.body;
  let userChatMessage = await chatMessage.find({ room: room });
  if (userChatMessage) {
    return res.status(200).json({
      message: "Chat message fetched",
      userChatMessage,
    });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// AdminOnlineOrNot
exports.AdminOnlineOrNot = async (req, res) => {
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

// fetchUserNotificationStatus
exports.fetchUserNotificationStatus = async (req, res) => {
  const { userid } = req.body;
  let notificationStatus = await User.findOne({ userid: userid });
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

// setNotificationToFalseUser
exports.setNotificationToFalseUser = async (req, res) => {
  const { userid } = req.body;

  let setNotificationStatus = await User.updateOne(
    { userid: userid },
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

// otherCountryProfileVerification
exports.otherCountryProfileVerification = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Uploaded" });
    }

    const ID_Card = req.file.location;

    if (!ID_Card) {
      return res.status(422).json({ message: "ID Card field is required" });
    }

    const userid = req.body.userid;

    let updatedUser, updatedMember;

    // Update user document
    updatedUser = await User.findOneAndUpdate(
      { userid: userid },
      { $set: { ID_Card: ID_Card } },
      { new: true }
    );

    // If user not found, update member document
    if (!updatedUser) {
      updatedMember = await Member.findOneAndUpdate(
        { memberid: userid },
        { $set: { ID_Card: ID_Card } },
        { new: true }
      );
    }

    if (updatedUser || updatedMember) {
      return res.status(200).json({
        message: "Profile photo updated successfully",
        user: updatedUser || updatedMember,
      });
    } else {
      console.log("User not found with userid:", userid);
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating profile photo:", error);
    return res.status(500).json({ message: "Error updating profile photo" });
  }
};

// userTotalWithdrawal
exports.userTotalWithdrawal = async (req, res) => {
  const { userid } = req.body;
  userRefferalPayoutRequest
    .aggregate([
      {
        $match: {
          userid: userid,
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
          message: "No user found",
          data: 0,
        });
      }
    })
    .catch((err) => {
      console.error("Error executing MongoDB aggregation:", err);
    });
};

// userMyTeam
exports.userMyTeam = async (req, res) => {
  const { refferal_id } = req.body;
  // const query = { referral_id:reffered_id };

  const myteam = await MyReferral.find({ refferal_id: refferal_id });
  console.log(myteam, "+++++++++");
  // const myteamDetails = myteam.map((user) => user.userid);

  // const myteamDetails = myteam.map((user) => ({
  //   userid: user.userid,
  //   date: user.doj,
  // }));

  // console.log(myteamDetails);
  return res.status(200).json({
    message: "My Team fetched",
    teamMembers: myteam,
  });
};

// userUpdateWalletAfterAdding
exports.userUpdateWalletAfterAdding = async (req, res) => {
  const { userid, amount } = req.body;
  const userExist = await User.findOne({ userid: userid });
  const tradingWallet = userExist.tradingWallet;

  // console.log(amount,'1146');
  const updateWallet = await User.updateOne(
    { userid: userid },
    {
      $set: {
        tradingWallet: tradingWallet + amount,
      },
    }
  );
  if (updateWallet) {
    return res.status(200).json({
      message: "wallet added",
      tradingWallet,
    });
  } else {
    return res.status(400).json({
      message: "Payment failed",
    });
  }
};

exports.updateDayCount = async (req, res) => {
  const { dayCount, userid } = req.body;
  const userExist = await User.findOne({ userid: userid });
  const dayCount1 = userExist.trialDayCount;

  const updateTrialDay = await User.updateOne(
    { userid: userid },
    {
      $set: {
        trialDayCount: dayCount + 1,
      },
    }
  );
  if (updateTrialDay) {
    return res.status(200).json({
      message: "udated day count",
      dayCount,
    });
  } else {
    return res.status(400).json({
      message: "Payment failed",
    });
  }
};
//expired
exports.updateExpireUser = async (req, res) => {
  const { userid, expire } = req.body;
  const updateExpire = await User.updateOne(
    { userid: userid },
    {
      $set: {
        isBlocked: expire,
      },
    }
  );
  if (updateExpire) {
    return res.status(200).json({
      message: "expire",
    });
  } else {
    return res.status(400).json({
      message: "not expire",
    });
  }
};

//get all video
exports.userFetchAllVideo = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
  } catch (error) {
    console.error("Failed to fetch video:", error);
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

// addingAmountToTradingWallet

// Function to add money to user's wallet and create a transaction document
const addMoneyToWallet = async (userid, amountAdded, date) => {
  try {
    // Find the user by their ID
    const user = await User.findOne({ userid: userid });
    if (!user) {
      throw new Error("User not found"); // Use "throw" instead of "new Error()" to throw the error
    }

    console.log(user, "uyuhyu");

    // Update the wallet balance for the user
    user.tradingWallet += amountAdded;

    // Save the updated user document
    await user.save();

    // Create a transaction document
    const transaction = new WalletTransaction({
      userid: userid,
      amountAdded,
      date: date, // Include the provided date in the transaction document
    });

    // Save the transaction document
    await transaction.save();

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Controller function for adding money to trading wallet
exports.addingAmountToTradingWallet = async (req, res) => {
  const { userid, amountAdded, date } = req.body;

  // Validate that the "amountAdded" is a valid number
  if (isNaN(amountAdded) || amountAdded <= 0) {
    return res.status(400).json({ error: "Invalid amount added" });
  }

  // If the "date" is not provided in the request body, use the current date by default
  const transactionDate = date ? new Date(date) : new Date();

  try {
    // Call the function to add money to the wallet and create a transaction
    const updatedUser = await addMoneyToWallet(
      userid,
      amountAdded,
      transactionDate
    );

    // Respond with the updated user document or any other appropriate response
    res.json({ message: "Money added successfully", user: updatedUser });
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.withdrawlAmountFromTradingWallet = async (req, res) => {
  const { userid, amountWithdrawn, paymentBy } = req.body;

  // Validate that the "amountWithdrawn" is a valid number and greater than zero
  if (isNaN(amountWithdrawn) || amountWithdrawn <= 0) {
    return res.status(400).json({ message: "Invalid amount withdrawn" });
  }

  if(!paymentBy){
    return res.status(400).json({message: "Please select payment method"})
  }

  try {
    // Find the user by their ID
    const user = await User.findOne({ userid: userid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has sufficient balance in the trading wallet
    if (user.tradingWallet < amountWithdrawn) {
      return res
        .status(400)
        .json({ error: "Insufficient balance in the trading wallet" });
    }

    // Update the wallet balance for the user
    user.tradingWallet -= amountWithdrawn;

    // Save the updated user document
    await user.save();

    // Create a transaction document for the withdrawal
    const transaction = new MoneyWithdrawalTransaction({
      userid: userid,
      amountWithdrawn: amountWithdrawn,
      date:  new Date(),
      paymentBy,
    });

    // Save the transaction document
    await transaction.save();

    // Respond with the updated user document or any other appropriate response
    res.json({ message: "Congratulations! Your emergency withdrawal request received. Your funds will be ready for you within 48 hours!", user: user });
  } catch (error) {
    console.error(
      "Error withdrawing amount from trading wallet:",
      error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

// userTotalWithdrawalFromTradingWallet
exports.userTotalWithdrawalFromTradingWallet = async (req, res) => {
  const { userid } = req.body;
  MoneyWithdrawalTransaction.aggregate([
    {
      $match: {
        userid: userid,
      },
    },
    {
      $group: {
        _id: null, // Group all filtered documents together as there is no specific grouping criteria
        totalAmountWithdrawn: { $sum: "$amountWithdrawn" }, // Calculate the sum of 'amountWithdrawn'
      },
    },
  ])
    .then((result) => {
      if (result.length > 0) {
        const sumOfAmountWithdrawn = result[0].totalAmountWithdrawn;
        // console.log(`Sum of amountWithdrawn for user ${userid}:`, sumOfAmountWithdrawn);
        return res.status(200).json({
          message: "Sum of amountWithdrawn for user" + " " + `${userid}`,
          sumOfAmountWithdrawn,
        });
      } else {
        // console.log('User not found or no data available for the user.');
        res.status(200).json({
          message: "User not found or no data available for the user",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// changePaymentStatusForRenewal
exports.changePaymentStatusForRenewal = async (req, res) => {
  try {
    const { userid } = req.body;
    const renewAmount = 1500;

    // Find the document with the highest invoice number
    const latestUserInvoice = await User.aggregate([
      {
        $group: {
          _id: null,
          maxInvoiceNumber: { $max: { $toInt: "$invoiceNumber" } },
        },
      },
      {
        $project: {
          _id: 0,
          maxInvoiceNumber: { $toString: "$maxInvoiceNumber" },
        },
      },
    ]);
    const maxInvoiceNumber = latestUserInvoice[0].maxInvoiceNumber;
    const updateToInVoiceNumber = String(
      parseInt(maxInvoiceNumber) + 1
    ).padStart(6, "0");
    await User.updateOne(
      { userid },
      { $set: { invoiceNumber: updateToInVoiceNumber } }
    );
    const userExist = await User.findOne({ userid: userid });

    const payment = userExist.paymentCount;
    const reffered_id = userExist.reffered_id;

    await User.updateOne(
      { userid: userid },
      {
        $set: {
          paymentStatus: true,
          paymentCount: payment + 1,
          doj: new Date(),
        },
      }
    );

    const referaluser = await User.findOne({
      refferal_id: reffered_id,
    });

    const renwwalUser = await User.findOne({userid}) 

    const userActivate = new UserRenewal({
      userid: userid,
      renewalAmount: renewAmount,
      firstName: renwwalUser.fname,
      lastName: renwwalUser.lname,
      phoneNumber: renwwalUser.phone,
      invoiceNumber: renwwalUser.invoiceNumber,
      
    });

    await userActivate.save();

    if (referaluser) {
      const userId = referaluser.userid;
      await Admin.updateOne(
        { referralId: "admin@123" },
        { $inc: { adminWallet: 1000 } }
      );
      const adminRefferalTransaction = new AdminCreditWalletTransaction({
        admin_id: "admin",
        creditAmount: 1000,
        refferUserId: userId,
        Type: "Renewal",
      });
      adminRefferalTransaction.save();

      await User.updateOne(
        {
          refferal_id: reffered_id,
        },
        { $inc: { wallet: 500 } }
      );

      const userRefferalTransaction = new userCreditWalletTransaction({
        userId: userId, // refer kiya hai
        creditAmount: 500,
        refferUserId: userExist.userid, // jisko refer hua hai
        Type: "Renewal",
      });
      userRefferalTransaction.save();
    }

    //trader refer by member
    const referralMember = await Member.findOne({
      refferal_id: reffered_id,
    });

    if (referralMember) {
      const memberUserId = referralMember.memberid;

      const member = await Member.findOneAndUpdate(
        {
          refferal_id: reffered_id,
        },
        { $inc: { wallet: 500 } }
      );

      const memberRefferalTransaction = new memberCreditWalletTransaction({
        memberId: memberUserId, // refer kiya hai
        creditAmount: 500,
        refferUserId: userExist.userid, // jisko refer hua hai
        Type: "Renewal",
      });
      await memberRefferalTransaction.save();

      const franchise = await Franchise.findOneAndUpdate(
        { referralId: referralMember.reffered_id },
        { $inc: { frenchiseWallet: 300 } },
        { new: true }
      );

      const franchiseRefferalTransaction = new FranchiseCreditWalletTransaction(
        {
          frenchiseId: franchise.frenchiseId, // refer kiya hai
          creditAmount: 300,
          refferUserId: memberUserId, // jisko refer hua hai
          Type: "Renewal",
        }
      );
      await franchiseRefferalTransaction.save();

      const bmm = await StateHandler.findOneAndUpdate(
        { referralId: franchise.referredId },
        { $inc: { stateHandlerWallet: 300 } },
        { new: true }
      );

      const bmmRefferalTransaction = new StateHandlerCreditWalletTransaction({
        stateHandlerId: bmm.stateHandlerId, // refer kiya hai
        creditAmount: 300,
        refferUserId: franchise.frenchiseId, // jisko refer hua hai
        Type: "Renewal",
      });
      await bmmRefferalTransaction.save();

      const admin = await Admin.findOne({
        referralId: bmm.referredId,
      });

      let adminWallet = admin.adminWallet;
      adminWallet += 400;

      await Admin.updateOne(
        { referralId: bmm.referredId },
        { $set: { adminWallet } }
      );

      const adminCreditWalletDetails = new AdminCreditWalletTransaction({
        admin_id: admin.admin_id,
        creditAmount: 400,
        Type: "Renewal",
        refferUserId: bmm.stateHandlerId,
      });

      await adminCreditWalletDetails.save();
    }

    //trader refer by franchise
    const referralFranchise = await Franchise.findOne({
      referralId: reffered_id,
    });

    if (referralFranchise) {
      console.log(referralFranchise);
      const franchiseUserId = referralFranchise.frenchiseId;

      const franchise = await Franchise.findOneAndUpdate(
        { referralId: reffered_id },
        { $inc: { frenchiseWallet: 500 } },
        { new: true }
      );

      const franchiseRefferalTransaction = new FranchiseCreditWalletTransaction(
        {
          frenchiseId: franchiseUserId, // refer kiya hai
          creditAmount: 500,
          refferUserId: userExist.userid, // jisko refer hua hai
          Type: "Renewal",
        }
      );
      franchiseRefferalTransaction.save();

      const bmm = await StateHandler.findOneAndUpdate(
        { referralId: franchise.referredId },
        { $inc: { stateHandlerWallet: 300 } },
        { new: true }
      );

      const bmmRefferalTransaction = new StateHandlerCreditWalletTransaction({
        stateHandlerId: bmm.stateHandlerId, // refer kiya hai
        creditAmount: 300,
        refferUserId: franchise.frenchiseId, // jisko refer hua hai
        Type: "Renewal",
      });
      await bmmRefferalTransaction.save();

      const admin = await Admin.findOne({
        referralId: bmm.referredId,
      });

      let adminWallet = admin.adminWallet;
      adminWallet += 700;

      await Admin.updateOne(
        { referralId: bmm.referredId },
        { $set: { adminWallet } }
      );

      const adminCreditWalletDetails = new AdminCreditWalletTransaction({
        admin_id: admin.admin_id,
        creditAmount: 700,
        Type: "Renewal",
        refferUserId: bmm.stateHandlerId,
      });

      await adminCreditWalletDetails.save();
    }

    //trader refer by bmm
    const referralBmm = await StateHandler.findOne({
      referralId: reffered_id,
    });

    if (referralBmm) {
      const bmmUserId = referralBmm.stateHandlerId;

      const bmm = await StateHandler.findOneAndUpdate(
        { referralId: reffered_id },
        { $inc: { stateHandlerWallet: 500 } },
        { new: true }
      );

      const bmmRefferalTransaction = new StateHandlerCreditWalletTransaction({
        stateHandlerId: bmmUserId, // refer kiya hai
        creditAmount: 500,
        refferUserId: userExist.userid, // jisko refer hua hai
        Type: "Renewal",
      });
      await bmmRefferalTransaction.save();

      const admin = await Admin.findOne({
        referralId: bmm.referredId,
      });

      let adminWallet = admin.adminWallet;
      adminWallet += 1000;

      await Admin.updateOne(
        { referralId: bmm.referredId },
        { $set: { adminWallet } }
      );

      const adminCreditWalletDetails = new AdminCreditWalletTransaction({
        admin_id: admin.admin_id,
        creditAmount: 1000,
        Type: "Renewal",
        refferUserId: bmmUserId,
      });

      await adminCreditWalletDetails.save();
    }

    if (reffered_id === "admin@123") {
      const admin = await Admin.findOne({
        referralId: "admin@123",
      });

      if (admin) {
        let adminWallet = admin.adminWallet;

        adminWallet += 1500;

        await Admin.updateOne(
          { referralId: "admin@123" },
          { $set: { adminWallet: adminWallet } }
        );

        const adminCreditWalletTransaction = new AdminCreditWalletTransaction({
          admin_id: admin.admin_id,
          creditAmount: 1500,
          refferUserId: userid,
          Type: "Renewal",
        });

        // Save the AdminCreditWalletTransaction document
        await adminCreditWalletTransaction.save();
      }
    }

    return res.status(200).json({ message: "Your payment successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.tradingWalletTransferFromOneUserToAnother = async (req, res) => {
  const { amount, fromUser, toUser } = req.body;

  try {
    const sender = await User.findOne({ userid: fromUser });
    const receiver = await User.findOne({ userid: toUser });

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (fromUser === toUser) {
      return res
        .status(400)
        .json({ message: "Cannot transfer money to the same user" });
    }

    // Calculate the combined balance of both trading and regular wallets
    const totalBalance = sender.tradingWallet + sender.wallet;

    if (totalBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct the amount from the appropriate wallet
    if (sender.tradingWallet >= amount) {
      sender.tradingWallet -= amount;
    } else {
      // Deduct from trading wallet first, then the regular wallet
      const remainingAmount = amount - sender.tradingWallet;
      sender.tradingWallet = 0;
      sender.wallet -= remainingAmount;
    }

    receiver.tradingWallet += amount;

    await sender.save();
    await receiver.save();

    return res.status(200).json({ message: "Money transferred successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.withdrawlFromWalletAndTradingWallet = async (req, res) => {
  try {
    let { userid, requestAmount, date, paymentBy } = req.body;

    if (requestAmount < 500) {
      return res
        .status(400)
        .json({ message: "Minimum amount should be 500 rupees" });
    }

    let existUser = await User.findOne({ userid: userid });
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // const tradingWallet = existUser.tradingWallet;
    const profitWallet = existUser.profitWallet;

    const referralWallet = existUser.wallet;
    const totalWallet = profitWallet + referralWallet;

    if (requestAmount <= profitWallet) {
      existUser.profitWallet -= requestAmount;
    } else if (requestAmount <= totalWallet) {
      const remainingAmount = requestAmount - profitWallet;
      existUser.profitWallet = 0;
      existUser.wallet -= remainingAmount;
    } else {
      return res
        .status(400)
        .json({ message: "Insufficient funds for withdrawal" });
    }

    await existUser.save();

    const withdrawalTransaction = new MoneyWithdrawalTransaction({
      userid: userid,
      amountWithdrawn: requestAmount,
      date: date || Date.now(),
      paymentBy,
    });

    await withdrawalTransaction.save();

    return res.status(200).json({
      message: "Congratulations! Your withdrawal request has been received. Get ready to enjoy your funds within 48 hours!",
  });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//withdrawal History
exports.fetchWalletWithdrawalHistory = async (req, res) => {
  try {
    let { userid } = req.body;
    const walletHistory = await MoneyWithdrawalTransaction.find({
      userid: userid,
    });
    if (walletHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No withdrawal history found for the user" });
    }

    return res.status(200).json({
      message: "Withdrawal history fetched successfully",
      walletHistory,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// wallet Add money history
exports.fetchWalletHistory = async (req, res) => {
  try {
    let { userid } = req.body;
    const walletHistory = await WalletTransaction.find({
      userid: userid,
    });
    if (walletHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No Wallet history found for the user" });
    }

    return res.status(200).json({
      message: "Wallet history fetched successfully",
      walletHistory,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Total count of payment status
exports.totalCountOfPaymentStatusOfUseruser = async (req, res) => {
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
//=========================================================================
//interact with video
exports.interactWithVideo = async (req, res) => {
  try {
    const { videoId, action, comments, replyTo } = req.body;
    const userId = req.userId;

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

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
            userName: user.fname + " " + user.lname,
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
          userName: user.fname + " " + user.lname,
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

exports.fetchOneVideoDetail = async (req, res) => {
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

exports.fetchUserOneVideoLike = async (req, res) => {
  try {
    const { videoId, likeType } = req.body;
    const userId = req.userId;

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

exports.fetchUserOneVideoDisLike = async (req, res) => {
  try {
    const { videoId, disLikeType } = req.body;
    const userId = req.userId;

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

//================================================================
exports.fetchOnecomment = async (req, res) => {
  try {
    const { commentId, videoId } = req.body;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = video.comments.find((c) => c._id.toString() === commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res
      .status(200)
      .json({ message: "Fetched comment successfully", comment });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//=================================================================

exports.getOwnTraderCreditWalletTransactionDetails = async (req, res) => {
  try {
    const { userid } = req.body;

    // Validate userid
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch trader credit wallet transactions based on userid
    const traderTransactions = await MyReferral.find({ userid: userid });

    // Check if there are transactions for the specified user
    if (traderTransactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No credit wallet transactions found for this user" });
    }

    return res.status(200).json({
      message: "Fetched Trader Credit Wallet Transaction details",
      traderTransactions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createUserBankAccountHolder = async (req, res) => {
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
    const user = await User.findOne({ memberid: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a bank account
    const existingAccount = await BankAccountHolder.findOne({ userId });

    if (existingAccount) {
      return res
        .status(400)
        .json({ message: "User already has a bank account" });
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
      message: "User Account holder created successfully",
      accountHolder: savedAccountHolder,
    });
  } catch (error) {
    console.error("Error creating account holder:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//=====================================================================

exports.createUserUpiHolder = async (req, res) => {
  try {
    const { upiId, userId } = req.body;

    if (!upiId) {
      return res.status(400).json({ message: "UPI Id is required" });
    }

    const existingUpi = await UpiHolder.findOne({ userId });

    if (existingUpi) {
      return res.status(400).json({ message: "User has already an UPI Id " });
    }

    const user = await User.findOne({ memberid: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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

//==============================================================

exports.getOwnUserBankAndUpiDetails = async (req, res) => {
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
//===============================================================
exports.changePaymentStatus = async (req, res) => {
  try {
    const userid = req.body.userid;
    const user = await User.findOneAndUpdate(
      { userid: userid },
      { $set: { paymentStatus: false } },
      { new: true }
    );

    if (user) {
      return res
        .status(200)
        .json({ message: "Payment status updated successfully", user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyRefferalIdInUser = async (req, res) => {
  const { referralId } = req.body;

  let findRefferalUser = await User.find({ refferal_id: referralId });
  console.log("findRefferalUser", findRefferalUser, "2756");
  if (findRefferalUser.length > 0) {
    return res.status(200).json({
      message: "Refferal Id verified successfully",
    });
  } else {
    let findRefferalMember = await Member.find({ refferal_id: referralId });
    // console.log('findRefferalMember',findRefferalMember ,'2756')
    if (findRefferalMember.length > 0) {
      return res.status(200).json({
        message: "Refferal Id verified successfully",
      });
    } else {
      return res.status(404).json({
        message: "Invalid referral Id",
      });
    }
  }
};

exports.traderFetchOwnReferralPayout = async (req, res) => {
  try {
    const { userid } = req.body;
    const fetchedData = await userCreditWalletTransaction.find({
      userId: userid,
    });

    if (fetchedData.length === 0) {
      return res.status(204).json({ message: "Invalid refferUserId" });
    }

    return res.status(200).json({ message: "Fetched all data", fetchedData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// totalReferralPayoutAmountTrader
exports.totalReferralPayoutAmountTrader = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await userCreditWalletTransaction.aggregate([
      {
        $match: { userId: userId },
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

exports.fetchTotalTradingValue = async (req, res) => {
  try {
    const { userId } = req.body;
    const totalTradingValue = await TotaltradingValue.find({ userId });

    return res.status(200).json({
      message: "Fetched total trading value successfully",
      data: totalTradingValue,
    });
  } catch (error) {}
};

exports.traderCountForGraph = async (req, res) => {
  try {
    const { referralId } = req.body;

    // Define an array mapping month numbers to month abbreviations
    const monthNames = [
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
        $match: {
          reffered_id: referralId,
        },
      },
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
          month: {
            $arrayElemAt: [monthNames, { $subtract: ["$_id.month", 1] }],
          }, // Convert month number to month abbreviation
          count: 1,
        },
      },
    ]);

    res.json({ traderCounts });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// traderUpdateBankDetails
exports.traderUpdateBankDetails = async (req, res) => {
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

    const updateToBank = await BankAccountHolder.findOneAndUpdate(
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

    if (updateToBank) {
      return res.status(200).json({
        message: "Your Bank Details Updated Successfully",
        data: updateToBank,
      });
    } else {
      return res.status(404).json({ message: "Trader not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// traderUpdateUpiDetails
exports.traderUpdateUpiDetails = async (req, res) => {
  try {
    const { upiId, userId } = req.body;
    if (!upiId) {
      return res.status(400).json({ message: "Please fill all the fields 1" });
    }

    const updateToUpiId = await UpiHolder.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          upiId: upiId,
          isAuthorised: false,
        },
      },
      { new: true }
    );

    if (updateToUpiId) {
      return res.status(200).json({
        message: "Your UPI Details Updated Successfully",
        data: updateToUpiId,
      });
    } else {
      return res.status(404).json({ message: "Trader not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.expireToRig = async (req, res) => { 
  try {
    const { userId } = req.body;
    console.log(userId)
    const rigexpire = await User.findOneAndUpdate(
      { userid: userId },
      {
        $set: {
          rig: false,
          isBlocked: true,
        },
      },
      { new: true }
    );

    if (rigexpire) {
      return res.status(200).json({
        message: "Your free subscription is expired!",
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
