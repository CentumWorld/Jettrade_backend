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
const { isValidPassword, isValidPhone, isValidUserId } = require("../validation/validation");
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

//const profilePhoto = require('../model/profilePhotoSchema');

// userRegistartion
exports.userRegistration = async (req, res) => {


  if ( !req.files["aadhar_front_side"]) {
    return res.status(422).json({
      message: "Please upload adhar card front side.",
    });
  }
  if ( !req.files["aadhar_back_side"]) {
    return res.status(422).json({
      message: "Please upload adhar card back side.",
    });
  }

  if ( !req.files["pan_card"]) {
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

  if (
    !isValidRefferedIdUser &&
    !isValidRefferedIdMember &&
    !isValidRefferedIdAdmin
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


      // if (password.length < 8) {
      //   return res.status(400).json({
      //     message: "Password must be minimum length of 8 charector!",
      //   });
      // }

      if(!isValidPassword(password)){
        return res.status(400).json({
              message: "Password mmmmmust be minimum length of 8 charector!",
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
        _id: user._id,
        fname,
        refferal_id,
        userType,
        userid,
        token,
        password,
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
          message: "Password must at least one digit, one lowercase letter, one uppercase letter, and be 8 to 15 characters long.",
        });
      }

      if (!isValidUserId(userid)) {
        return res.status(400).json({
          message: "User ID must be a combination of at least one letter and one digit, and it should be a minimum of 6 characters in length.",
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
        _id: user._id,
        fname,
        refferal_id,
        userType,
        userid,
        token,
        password,
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
    } = req.body;

    // Check if any required field is missing
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(422).json({
        message: `Please fill in all details: ${missingFields.join(", ")}`,
      });
    }

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

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email address" });
    }

    if (!userid && !password) {
      const generatedUserId = fname + Math.floor(Math.random() * 100000 + 1);

      const refferal_id = generatedUserId + Math.floor(Math.random() * 100000 + 1);

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

      console.log(refferal_id, "referral")

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
        _id: user._id,
        fname,
        referral_id: refferal_id,
        userType,
        userid: generatedUserId,
        token,
        password: generatedPassword,
      });
    } else {
      if (!userid ) {
        return res.status(422).json({ message: "Please provide User Id" });
      }
      if (!password ) {
        return res.status(422).json({ message: "Please provide password" });
      }

      const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);

      const userExist = await User.findOne({ userid });
      if (userExist) {
        return res.status(400).json({ message: "This user ID is already taken" });
      }

      if (password.length < 8) {
        return res.status(400).json({
          message: "Password must be a minimum of 8 characters long!",
        });
      }

      if (!isValidUserId(userid)) {
        return res.status(400).json({
          message: "User ID must be a combination of at least one letter and one digit, and it should be a minimum of 6 characters in length.",
        });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          message: "Password must at least one digit, one lowercase letter, one uppercase letter, and be 8 to 15 characters long.",
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
        _id: user._id,
        fname,
        referral_id: refferal_id,
        userType,
        userid,
        token,
        password,
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
      { userId: userLogin._id },
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
  if (
    !req.files ||
    !req.files["aadhar_front_side"] ||
    !req.files["aadhar_back_side"] ||
    !req.files["pan_card"]
  ) {
    return res.status(422).json({ message: "Please Fill all Details!" });
  }

  console.log(req.files);
  const userid = req.body.userid;
  const aadhar_front_side = req.files.aadhar_front_side[0].location;
  const aadhar_back_side = req.files.aadhar_back_side[0].location;
  const pan_card = req.files.pan_card[0].location;
  console.log(aadhar_back_side, aadhar_front_side, pan_card, userid, "140");

  if (!aadhar_front_side || !aadhar_back_side || !pan_card) {
    return res.status(422).json({ message: "All field required" });
  }
  // console.log(userid);
  // ------------------------------------------
  const user = await User.find({ id: userid });
  if (user) {
    User.updateMany({ id: userid })
      .set({
        aadhar_front_side: aadhar_front_side,
        aadhar_back_side: aadhar_back_side,
        pan_card: pan_card,
      })
      .then(() => {
        return res.status(201).json({ message: "Document Updated" });
      });
  } else {
    const userdocument = new User({
      userid,
      aadhar_front_side,
      aadhar_back_side,
      pan_card,
    });
    const success = await userdocument.save();

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

  // --------------------------
  //

  // try {
  //     token = req.token;
  //     const userDetails = await User.findOne({token})
  //     if (userDetails) {
  //         const upload_doc = await userDetails.add_document( doc_type,front_side, back_side);

  //         await userDetails.save();
  //         return res.status(201).json({ message: "Document Uploaded Successfully" })
  //     }
  // } catch (error) {
  //     console.log(error);
  // }
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
    User.updateOne({ userid: userid })
      .set({
        fname: fname,
        lname: lname,
        address: address,
        gender: gender,
        phone: phone,
        dob: dob,
        aadhar: aadhar,
        pan: pan,
      })
      .then(() => {
        return res.status(201).json({ message: "User Details Updated" });
      });
  }
  if (userWhat === "other") {
    if (!fname || !lname || !phone || !address || !gender || !dob || !Id_No) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    User.updateOne({ userid: userid })
      .set({
        fname: fname,
        lname: lname,
        address: address,
        gender: gender,
        phone: phone,
        dob: dob,
        Id_No: Id_No,
      })
      .then(() => {
        return res.status(201).json({ message: "User Details Updated" });
      });
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
    console.log(userId, "1028");
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
  const userActivate = new AllNewPaidUser({
    userid: userid,
    activationAmount: serviceAmount,
  });
  userActivate.save();
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
      console.log(findUserFromRefferedId, "592");
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

            const transferPercentage = 2.5;
            const transferAmount = (3500 * transferPercentage) / 100;

            const bmm = await StateHandler.findOne({
              referralId: franchiseDetails.referredId,
            });
            console.log(bmm, "bmm");

            if(bmm){

            let bmmWallet = bmm.stateHandlerWallet;
            bmmWallet += transferAmount;

            await StateHandler.updateOne(
              { referralId: franchiseDetails.referredId },
              { $set: { stateHandlerWallet: bmmWallet } }
            );

            const bmmCreditWalletDetails =
              new StateHandlerCreditWalletTransaction({
                stateHandlerId: bmm.stateHandlerId,
                creditAmount: 450,
                Type: "New",
                refferUserId: franchiseDetails.frenchiseId,
              });
            await bmmCreditWalletDetails.save();

            }




            // const transferPercentage = 2.5;
            // // const transferAmount = (3500 * transferPercentage) / 100;
            // const stateHandler = await StateHandler.findOne({
            //   referralId: franchise.referredId,
            // });
            // console.log(stateHandler, ";;;;;");
            // if (stateHandler) {
            //   let stateHandlerWallet = stateHandler.stateHandlerWallet;
            //   stateHandlerWallet += transferAmount;
            //   await StateHandler.updateOne(
            //     { referralId: franchise.referredId },
            //     { $set: { stateHandlerWallet: stateHandlerWallet } }
            //   );
            //   const statehandlerCreditWalletDetails =
            //     new StateHandlerCreditWalletTransaction({
            //       stateHandlerId: stateHandler.stateHandlerId,
            //       creditAmount: transferAmount,
            //       Type: "New",
            //       refferUserId: franchise.frenchiseId,
            //     });
            //   await statehandlerCreditWalletDetails.save();
            // }
            const admin = await Admin.findOne({
              referralId: bmm.referredId,
            });
            console.log(admin, "1195admin details");
            if (admin) {
              console.log(admin.adminWallet);
              let adminWallet = admin.adminWallet;
              adminWallet += 1612.5;
              await Admin.updateOne(
                { referralId: bmm.referredId },
                { $set: { adminWallet: adminWallet } }
              );
              const adminCreditWalletDetails = new AdminCreditWalletTransaction(
                {
                  admin_id: admin.admin_id,
                  creditAmount: 1612.5,
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
        }
        // else {
        //   const memberid = findUserFromMemberRefferedId[0].memberid;
        //   const referredId = findUserFromMemberRefferedId[0].reffered_id;
        //   console.log(referredId, "[[[[[[[");
        //   let wallet = findUserFromMemberRefferedId[0].wallet;
        //   wallet = wallet + 500;
        //   // Update member wallet
        //   const insertWalletAmount = await Member.updateOne(
        //     { memberid },
        //     {
        //       $set: {
        //         wallet,
        //       },
        //     }
        //   );
        //   // Create referral details for renewal member
        //   const myReferralDetails = new MyReferral({
        //     userid: userExist.userid,
        //     joininigDate: userExist.doj,
        //     refferal_id: userExist.reffered_id,
        //     referralAmount: 500,
        //     userType: "Renewal",
        //     role: "Member",
        //     refferUserID: memberid,
        //   });
        //   await myReferralDetails.save();
        //   const memberCrediwalletTransactionDetails =
        //     new memberCreditWalletTransaction({
        //       memberId: memberid,
        //       Type: "Renewal",
        //       refferUserId: userExist.userid,
        //       creditAmount: 500,
        //     });
        //   await memberCrediwalletTransactionDetails.save();
        //   const businessDeveloper = await BusinessDeveloper.findOne({
        //     referralId: referredId,
        //   });
        //   console.log(businessDeveloper, "1630");
        //   let businessDeveloperWallet =
        //     businessDeveloper.businessDeveloperWallet;
        //   businessDeveloperWallet += 200;
        //   await BusinessDeveloper.updateOne(
        //     { referralId: referredId },
        //     { $set: { businessDeveloperWallet: businessDeveloperWallet } }
        //   );
        // if (insertWalletAmount) {
        //   return res.status(200).json({
        //     message: "Payment Successful",
        //   });
        // }
        // }
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
  if (!req.file) {
    return res.status(400).json({ message: "No File Uploaded" });
  }
  const ID_Card = req.file.location;

  if (!ID_Card) {
    return res.status(422).json({ message: "All field required" });
  }
  const userid = req.body.userid;
  // console.log(userid);
  // ------------------------------------------
  const user = await User.find({ userid });
  console.log(user.length, "176");
  if (user.length > 0) {
    User.updateOne({ userid: userid })
      .set({ ID_Card: ID_Card })
      .then(() => {
        return res.status(201).json({ message: "Document Updated" });
      });
  } else {
    const userdocument = new User({ userid, ID_Card });
    const success = await userdocument.save();

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
  const { userid, amountWithdrawn, date, paymentBy } = req.body;

  // Validate that the "amountWithdrawn" is a valid number and greater than zero
  if (isNaN(amountWithdrawn) || amountWithdrawn <= 0) {
    return res.status(400).json({ error: "Invalid amount withdrawn" });
  }

  // Validate that the "date" is a valid date
  if (!Date.parse(date)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  try {
    // Find the user by their ID
    const user = await User.findOne({ userid: userid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
      date: date,
      paymentBy,
    });

    // Save the transaction document
    await transaction.save();

    // Respond with the updated user document or any other appropriate response
    res.json({ message: "Amount withdrawn successfully", user: user });
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
  const { userid } = req.body;
  const renewAmount = 1800;

  const userExist = await User.findOne({ userid: userid });
  const payment = userExist.paymentCount;
  const reffered_id = userExist.reffered_id;

  const user = await User.updateOne(
    { userid: userid },
    {
      $set: {
        paymentStatus: true,
        paymentCount: payment + 1,
        doj: new Date(),
      },
    }
  );

  const userRenewal = new UserRenewal({
    userid: userid,
    renewalAmount: renewAmount,
  });
  userRenewal.save();

  const referaluser = await User.findOne({
    refferal_id: reffered_id,
  });

  if (referaluser) {
    const userId = referaluser.userid;
    await Admin.updateOne(
      { referralId: "admin@123" },
      { $inc: { adminWallet: 1300 } }
    );
    const adminRefferalTransaction = new AdminCreditWalletTransaction({
      admin_id: "admin",
      creditAmount: 1300,
      refferUserId: userId,
      Type: "Renewal",
    });
    adminRefferalTransaction.save();
    const userRefferalTransaction = new userCreditWalletTransaction({
      userId: userId,
      creditAmount: 500,
      refferUserId: userExist.userid,
      Type: "Renewal",
    });
    userRefferalTransaction.save();
  }

  if (reffered_id === "admin@123") {
    const admin = await Admin.findOne({
      referralId: "admin@123",
    });

    if (admin) {
      let adminWallet = admin.adminWallet;

      adminWallet += 1800;

      await Admin.updateOne(
        { referralId: "admin@123" },
        { $set: { adminWallet: adminWallet } }
      );

      const adminCreditWalletTransaction = new AdminCreditWalletTransaction({
        admin_id: admin.admin_id,
        creditAmount: 1800,
        refferUserId: userid,
        Type: "Renewal",
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
      console.log(findUserFromRefferedId, "592");

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

          let wallet = findUserFromMemberRefferedId[0].wallet;
          wallet = wallet + 900;
          console.log(wallet);
          const insertWalletAmount = await Member.updateOne(
            { memberid: memberid },
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
            role: "Member",
            refferUserID: memberid,
          });
          myReferralDetails.save();

          if (insertWalletAmount) {
            return res.status(200).json({
              message: "Payment Successfull",
            });
          }
        } else {
          const memberid = findUserFromMemberRefferedId[0].memberid;
          let wallet = findUserFromMemberRefferedId[0].wallet;
          const referredId = findUserFromMemberRefferedId[0].reffered_id;
          wallet = wallet + 500;
          console.log(wallet);
          const insertWalletAmount = await Member.updateOne(
            { memberid: memberid },
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
            role: "Member",
            refferUserID: memberid,
          });
          myReferralDetails.save();

          // Create referral details for new member
          const memberCreditWalletTransactionDetails =
            new memberCreditWalletTransaction({
              memberId: memberid,
              creditAmount: 500,
              Type: "Renewal",
              refferUserId: userExist.userid,
            });
          await memberCreditWalletTransactionDetails.save();

          const franchise = await Franchise.findOne({
            referralId: referredId,
          });

          let franchiseWallet =
          franchise.frenchiseWallet;
          franchiseWallet += 300;

          await Franchise.updateOne(
            { referralId: referredId },
            { $set: {frenchiseWallet: franchiseWallet } }
          );

          const franchiseCreditWalletDetails =
            new FranchiseCreditWalletTransaction({
              frenchiseId: franchise.frenchiseId,
              creditAmount: 300,
              Type: "Renewal",
              refferUserId: memberid,
            });

          await franchiseCreditWalletDetails.save();


          const transferPercentage = 2.5;
          const transferAmount = (1800 * transferPercentage) / 100;

          const bmm = await StateHandler.findOne({
            referralId: franchise.referredId,
          });

          let bmmWallet = bmm.stateHandlerWallet;
          bmmWallet  += transferAmount;

          await StateHandler.updateOne(
            { referralId: franchise.referredId },
            { $set: {stateHandlerWallet: bmmWallet } }
          );

          const bmmCreditWalletDetails =
            new StateHandlerCreditWalletTransaction({
              stateHandlerId: bmm.stateHandlerId,
              creditAmount: 45,
              Type: "Renewal",
              refferUserId: franchise.frenchiseId,
            });

          await bmmCreditWalletDetails.save();

          // const transferPercentage = 2.5;
          // const transferAmount = (1800 * transferPercentage) / 100;

          // const stateHandler = await StateHandler.findOne({
          //   referralId: franchise.referredId,
          // });

          // let stateHandlerWallet = stateHandler.stateHandlerWallet;
          // stateHandlerWallet += transferAmount;

          // await StateHandler.updateOne(
          //   { referralId: franchise.referredId },
          //   { $set: { stateHandlerWallet } }
          // );

          // const stateHandlerCreditWalletDetails =
          //   new StateHandlerCreditWalletTransaction({
          //     stateHandlerId: stateHandler.stateHandlerId,
          //     creditAmount: transferAmount,
          //     Type: "Renewal",
          //     refferUserId: franchise.frenchiseId,
          //   });

          // await stateHandlerCreditWalletDetails.save();

          const admin = await Admin.findOne({
            referralId: bmm.referredId,
          });

          let adminWallet = admin.adminWallet;
          adminWallet += 655;

          await Admin.updateOne(
            { referralId: bmm.referredId },
            { $set: { adminWallet } }
          );

          const adminCreditWalletDetails = new AdminCreditWalletTransaction({
            admin_id: admin.admin_id,
            creditAmount: 655,
            Type: "Renewal",
            refferUserId: bmm.stateHandlerId,
          });

          await adminCreditWalletDetails.save();

          if (insertWalletAmount) {
            return res.status(200).json({
              message: "Payment Successfull",
            });
          }
        }
      }
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
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

    const tradingWallet = existUser.tradingWallet;
    const referralWallet = existUser.wallet;
    const totalWallet = tradingWallet + referralWallet;

    if (requestAmount <= tradingWallet) {
      existUser.tradingWallet -= requestAmount;
    } else if (requestAmount <= totalWallet) {
      const remainingAmount = requestAmount - tradingWallet;
      existUser.tradingWallet = 0;
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
      message: "Withdrawn successfully",
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

    const user = await User.findById(userId)

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
      .json({ message: "User UPI created successfully", savedUpi });
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
