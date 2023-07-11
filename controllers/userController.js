const Razorpay = require('razorpay');
const User = require('../model/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const forgetPasswordSms = require('../utils/forget-password-otp');
require('dotenv').config();
const ProfilePhoto = require('../model/profilePhotoSchema');
const Userdocument = require('../model/userDocumentSchema');
const notificationForAll = require('../model/notificationForAllSchema');
const notificationForAllTrader = require('../model/notificationForAllTraderSchema');
const notificationForParticularTrader = require('../model/notificationForParticularTraderSchema');
const Member = require('../model/memberSchema');
const userRefferalPayoutRequest = require('../model/userRefferalPayoutRequest');
const userRefferalPayoutApproveWithdrawal = require('../model/userRefferalPayoutApproveWithdrawalSchema');
const ChatType = require('../model/chatType');
const chatMessage = require('../model/chatMessageSchema');
const Admin = require('../model/adminSchema');
const SuccessfullRegistrationSms = require('../utils/successfull-registration');
const PasswordReset = require('../utils/password-reset');
const ChangePassword = require('../utils/change-password');
const validator = require('validator');



//const profilePhoto = require('../model/profilePhotoSchema');



//userRegistartion
exports.userRegistration = async (req, res) => {


    if (!req.files || !req.files['aadhar_front_side'] || !req.files['aadhar_back_side'] || !req.files['pan_card']) {

        return res.status(422).json({ message: "Please Fill all Details1!" })

    }
    const userType = 'indian';
    const aadhar_front_side = req.files.aadhar_front_side[0].location;
    const aadhar_back_side = req.files.aadhar_back_side[0].location;
    const pan_card = req.files.pan_card[0].location;
    //console.log(aadhar_back, aadhar_front, pan_card,'140');

    if (!aadhar_front_side || !aadhar_back_side || !pan_card) {

        return res.status(422).json({ message: "All field required" })
    }

    const { fname, lname, email, phone, address, gender, dob, aadhar, pan, reffered_id, userid, password, doj } = req.body;


    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    const aadhar_length = aadhar;
    const pan_length = pan;
    //console.log(aadhar_length.length,'35');
    if (aadhar_length.length < 12 || aadhar_length.length > 12) {
        return res.status(422).json({
            message: "Inavlid Aadhar !"
        })
    }

    if (pan_length.length < 10 || pan_length.length > 10) {
        return res.status(422).json({
            message: "Invalid Pan !"
        })
    }
    if (userid === '' && password === '') {
        if (!fname || !lname || !phone || !address || !gender || !dob || !aadhar || !pan || !reffered_id) {

            return res.status(422).json({ message: "Please Fill all Details2!" })
        } else {
            try {
                const userid = fname + Math.floor(Math.random() * 100000 + 1);
                const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);
                console.log(refferal_id);
                console.log(userid, '59');
                function makepassword(length) {
                    let result = '';
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%&@#';
                    const charactersLength = characters.length;
                    let counter = 0;
                    while (counter < length) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                        counter += 1;
                    }
                    return result;
                }

                const password = makepassword(8)
                //const userid = userid;
                // const pass = password;


                const userExist = await User.findOne({ userid: userid });
                if (userExist) {
                    return res.status(400).json({ message: 'User already exist!' })
                }

                const user = new User({ fname, lname, email, phone, address, gender, dob, aadhar, pan, refferal_id, reffered_id, aadhar_front_side, aadhar_back_side, pan_card, userType, userid, password });
                await user.save();
                const phone1 = '+' + user.phone
                // SuccessfullRegistrationSms(phone1, { "userid": user.userid, "password": password })
                res.status(201).json({ message: "User registered successfully",
                userid,password
            });


            }

            catch (error) {
                console.log(error);
            }
        }
    } else {
        if (!fname || !lname || !phone || !address || !gender || !dob || !aadhar || !pan || !reffered_id || !userid || !password) {

            return res.status(422).json({ message: "Please Fill all Details3!" })
        }
        else {

            try {

                const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);
                // const userid = userid;
                // const password = password;


                const userExist = await User.findOne({ userid: userid });
                if (userExist) {
                    return res.status(400).json({ message: 'User already exist!' })
                }

                const user = new User({ fname, lname, email, phone, address, gender, dob, aadhar, pan, refferal_id, reffered_id, aadhar_front_side, aadhar_back_side, pan_card, userType, userid, password });
                await user.save();
                const phone2 = '+' + user.phone
                // SuccessfullRegistrationSms(phone2, { "userid": user.userid, "password": password })
                res.status(201).json({ message: "User registered successfully",
                userid,password
            });


            }

            catch (error) {
                console.log(error);
            }
        }
    }

}


// otherCountryUserRegistration
exports.otherCountryUserRegistration = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No File Uploaded" })
    }

    const ID_Card = req.file.location;
    const userType = 'otherCountry';
    //console.log(aadhar_back, aadhar_front, pan_card,'140');

    if (!ID_Card) {

        return res.status(422).json({ message: "All field required" })
    }

    const { fname, lname, email, phone, address, gender, dob, Id_No, reffered_id, userid, password, doj } = req.body;

    //console.log(aadhar_length.length,'35');
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    if (userid === '' && password === '') {
        if (!fname || !lname || !phone || !address || !gender || !Id_No || !dob || !reffered_id) {

            return res.status(422).json({ message: "Please Fill all Details2!" })
        } else {
            try {
                const userid = fname + Math.floor(Math.random() * 100000 + 1);
                const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);
                console.log(refferal_id);
                console.log(userid, '59');
                function makepassword(length) {
                    let result = '';
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%&@#';
                    const charactersLength = characters.length;
                    let counter = 0;
                    while (counter < length) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                        counter += 1;
                    }
                    return result;
                }

                const password = makepassword(8)
                //const userid = userid;
                // const pass = password;


                const userExist = await User.findOne({ userid: userid });
                if (userExist) {
                    return res.status(400).json({ message: 'User already exist!' })
                }

                const user = new User({ fname, lname, email, phone, address, gender, dob, refferal_id, reffered_id, Id_No, ID_Card, userType, userid, password });
                await user.save();
                const phone3 = '+' + user.phone
                // SuccessfullRegistrationSms(phone3, { "userid": user.userid, "password": password })
                res.status(201).json({ message: "User registered successfully",
                userid,password
            });


            }

            catch (error) {
                console.log(error);
            }
        }
    } else {
        if (!fname || !lname || !phone || !address || !gender || !dob || !Id_No || !reffered_id || !userid || !password) {

            return res.status(422).json({ message: "Please Fill all Details3!" })
        }
        else {

            try {

                const refferal_id = userid + Math.floor(Math.random() * 100000 + 1);
                // const userid = userid;
                // const password = password;


                const userExist = await User.findOne({ userid: userid });
                if (userExist) {
                    return res.status(400).json({ message: 'Something went wrong try again!' })
                }

                const user = new User({ fname, lname, email, phone, address, gender, dob, refferal_id, reffered_id, Id_No, ID_Card, userType, userid, password });
                await user.save();
                const phone4 = '+' + user.phone
                // SuccessfullRegistrationSms(phone4, { "userid": user.userid, "password": password })
                res.status(201).json({ message: "User registered successfully",
                userid, password
            });


            }

            catch (error) {
                console.log(error);
            }
        }
    }
}

// userLogin

exports.userLogin = async (req, res) => {

    const { userid, password } = req.body;
    if (!userid || !password) {
        return res.status(422).json({ message: "Please fill all details" });
    }
    const userLogin = await User.findOne({ userid: userid });
    console.log(userLogin, '104');

    if (!userLogin) {
        return res.status(404).json({ message: "Invalid Credential1!" });

    }
    const blocked = userLogin.isBlocked;
    if (!blocked) {
        try {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            //const token = await userLogin.generateAuthToken();
            const token = jwt.sign(
                { userId: userLogin._id },
                process.env.SECRET_KEY,
                { expiresIn: 6000 } // Set the token to expire in 1 hour
            );
            console.log(token, '270');
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 20000),
                httpOnly: true
            });
            if (!isMatch) {
                return res.status(404).json({ message: "Invalid Credential2!" })
            } else {
                return res.status(200).json({
                    message: "User Login successfully",
                    token: token,
                    userLogin,
                    expires: new Date().getTime() + 60000
                })
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        return res.status(404).json({ message: "Your account is blocked!" })
    }

}

// userFetchDeatils
exports.userFetchDeatils = async (req, res) => {
    token = req.token;
    verifyToken = req.verifyToken;
    //console.log(token,verifyToken);

    const userFetchDetails = await User.findOne({ token })
    //console.log(userFetchDetails)
    if (userFetchDetails) {
        console.log(userFetchDetails);
        return res.status(200).json({ message: "User Details Fetched" })


    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }


}

// profileVerification
exports.profileVerification = async (req, res) => {


    if (!req.files || !req.files['aadhar_front_side'] || !req.files['aadhar_back_side'] || !req.files['pan_card']) {

        return res.status(422).json({ message: "Please Fill all Details1!" })

    }

    console.log(req.files);
    const userid = req.body.userid;
    const aadhar_front_side = req.files.aadhar_front_side[0].location;
    const aadhar_back_side = req.files.aadhar_back_side[0].location;
    const pan_card = req.files.pan_card[0].location;
    console.log(aadhar_back_side, aadhar_front_side, pan_card, userid, '140');


    if (!aadhar_front_side || !aadhar_back_side || !pan_card) {

        return res.status(422).json({ message: "All field required" })
    }
    // console.log(userid);
    // ------------------------------------------
    const user = await User.find({ userid });
    console.log(user.length, '176');
    if (user.length > 0) {
        User.updateOne({ userid: userid })
            .set({ aadhar_front_side: aadhar_front_side, aadhar_back_side: aadhar_back_side, pan_card: pan_card })
            .then(() => {
                return res.status(201).json({ message: "Document Updated" })

            })
    } else {
        const userdocument = new User({ userid, aadhar_front_side, aadhar_back_side, pan_card });
        const success = await userdocument.save();

        if (success) {
            return res.send({
                code: 200,
                message: "Uploaded Successfully"
            })
        } else {
            return res.send({
                code: 500,
                message: "Service Error"
            })
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
}

// resetPassword
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, token } = req.body;
    console.log(token);
    // console.log(req.token)
    console.log(oldPassword, newPassword, '380');
    if (!oldPassword || !newPassword) {
        return res.status(422).json({ message: "Fields required" })
    }

    // if (newPassword !== confirmPassword) {
    //     return res.status(422).json({ message: "Password Not Matched" })
    // }


    //   const   verifyToken =req.body.verifyToken

    const userFetchDetails = await User.findOne({ token })
    console.log(userFetchDetails);
    if (userFetchDetails) {

        const isMatch = await bcrypt.compare(oldPassword, userFetchDetails.password);
        if (isMatch) {
            userFetchDetails.password = req.body.newPassword;
            await userFetchDetails.save();
            const phone = '+' + userFetchDetails.phone
            ChangePassword(phone, { "userid": userFetchDetails.userid, "password": req.body.newPassword })
            return res.status(201).json({ message: "Password successfully Change" })
        } else {
            return res.status(422).json({ message: "Old Password Is Wrong1" })
        }
        //console.log(isMatch,'198');

    }

}

// forgetPassword
exports.forgetPassword = async (req, res) => {

    const otp = Math.floor(100000 + Math.random() * 900000);
    const phone = req.body;
    //verifyToken = req.verifyToken;
    console.log(otp, '207');

    const userFetchDetails = await User.findOne(phone)
    console.log(userFetchDetails, '210');

    if (userFetchDetails) {
        let phone = '+' + userFetchDetails.phone;

        forgetPasswordSms(phone, { "otp": otp })
        userFetchDetails.otp = otp;
        await userFetchDetails.save();
        return res.status(201).json({ message: "OTP Sent" })
    } else {
        return res.status(404).json({ message: "User not found" })
    }


}

// verifyOtp
exports.verifyOtp = async (req, res) => {
    const { phone } = req.body;
    //verifyToken = req.verifyToken;
    const otp = Number(req.body.otp);
    console.log(typeof (otp));

    const userFetchDetails = await User.findOne({ phone })
    if (userFetchDetails) {

        if (userFetchDetails.otp !== otp) {

            return res.status(400).json({ message: "OTP Invalid" })
        }
        else {
            return res.status(200).json({ message: "OTP matched" })
        }
    }

}

// resetPassword
exports.resetPassword = async (req, res) => {
    const { phone } = req.body;
    const { newPassword, confirmPassword } = req.body;

    console.log(newPassword, confirmPassword);
    if (!newPassword || !confirmPassword) {
        return res.status(422).json({ message: "Fields required" })
    }

    if (newPassword !== confirmPassword) {
        return res.status(422).json({ message: "Password Not Matched" })
    }


    //verifyToken = req.verifyToken;

    const userFetchDetails = await User.findOne({ phone })
    if (userFetchDetails) {
        userFetchDetails.password = req.body.newPassword;
        await userFetchDetails.save();
        const phone = '+' + userFetchDetails.phone
        PasswordReset(phone, { "password": req.body.newPassword })

        return res.status(201).json({ message: "Password Successfully Reset" })
    }

}

// Profile photo Upload
exports.profilePhotoUpload = async (req, res) => {

    //const photo = req.file.filename;
    console.log(req.file, '290');
    if (!req.file) {
        return res.status(400).json({ message: "No File Uploaded" })
    }
    const userid = req.body.userid;
    const imageUrl = req.file.location;

    const result = await ProfilePhoto.find({ userid });
    console.log(result.length);
    if (result.length > 0) {
        ProfilePhoto.updateOne({ userid: userid })
            .set({ imageUrl: imageUrl })
            .then(() => {
                return res.status(201).json({ message: "Profile photo Updated" })
            })
    } else {

        if (!userid || !imageUrl) {
            return res.send({
                code: 400,
                message: "Bad Request"
            })
        }

        const profilePhoto = new ProfilePhoto({ userid: userid, imageUrl: imageUrl })
        const success = await profilePhoto.save()

        if (success) {
            return res.send({
                code: 200,
                message: "Uploaded Successfully"
            })
        } else {
            return res.send({
                code: 500,
                message: "Service Error"
            })
        }
    }

}

exports.fetchUserDetailsUserside = async (req, res) => {
    const _id = req.body;
    User.findById(_id)
        .then(result => {
            res.status(200).json({
                message: "User Details Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// fetchProfilePhotoUser
exports.fetchProfilePhotoUser = async (req, res) => {
    const { userid } = req.body;
    ProfilePhoto.find({ userid })
        .then(result => {
            res.status(200).json({
                message: "User Details Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// fetchUserDocumentUser
exports.fetchUserDocumentUser = async (req, res) => {
    const { userid } = req.body;
    await Userdocument.find({ userid })
        .then(result => {
            res.status(200).json({
                message: "User documents Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// editUserDetails
exports.editUserDetails = async (req, res) => {
    const { userid } = req.body;
    User.find({ userid })
        .then(result => {
            res.status(200).json({
                message: "User Details Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}

// saveEditedUserDetails
exports.saveEditedUserDetails = async (req, res) => {

    const { userWhat, fname, lname, phone, address, gender, dob, aadhar, pan, Id_No, userid } = req.body


    if (userWhat === 'indian') {
        if (!fname || !lname || !phone || !address || !gender || !dob || !aadhar || !pan) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        // const dateString = dob;
        // const parts = dateString.split('/');
        // const year = parseInt(parts[2]);
        // const month = parseInt(parts[1]);
        // const day = parseInt(parts[0]);
        // const dateofbirth = new Date(year, month - 1, day);

        // console.log(dateofbirth.toISOString());
        User.updateOne({ userid: userid })
            .set({ fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dob, aadhar: aadhar, pan: pan })
            .then(() => {
                return res.status(201).json({ message: "User Details Updated" })

            })
    }
    if (userWhat === 'other') {
        if (!fname || !lname || !phone || !address || !gender || !dob || !Id_No) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        User.updateOne({ userid: userid })
            .set({ fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dob, Id_No: Id_No })
            .then(() => {
                return res.status(201).json({ message: "User Details Updated" })

            })
    }


}

// fetchUserNotification
exports.fetchUserNotification = async (req, res) => {
    const { userid } = req.body;
    const allNotitfication = await notificationForAll.find()
    //console.log(allNotitfication);
    if (allNotitfication) {
        const allTraderNotification = await notificationForAllTrader.find()
        if (allTraderNotification) {

            const particularTrader = await notificationForParticularTrader.find({ userid: userid })
            if (particularTrader) {
                res.status(200).json({
                    message: "User notification fetched",
                    allNotitfication,
                    allTraderNotification,
                    particularTrader
                })
            }

        }
    }
}

// paymentUseridVerify
exports.paymentUseridVerify = async (req, res) => {
    const { userid } = req.body;
    let paymentValue = 0;
    if (!userid) {
        res.status(400).json({
            message: "Please enter user ID",

        })
    } else {
        const user = await User.findOne({ userid: userid })

        if (!user) {
            return res.status(400).json({
                message: "Invalid User ID",

            })
        } else {
            paymentValue = user.paymentCount;
        }
        if (paymentValue > 0) {
            return res.status(200).json({
                message: 'Please Login and Renewal',
                statusCode: 200
            })
        } else if (paymentValue === 0) {
            return res.status(200).json({
                message: "User id verified",
                user,
                statusCode: 201
            })
        }
    }

    // if (user) {
    //     res.status(200).json({
    //         message: "User id verified",
    //         user
    //     })
    // } else {
    //     res.status(400).json({
    //         message: "User Id not found",

    //     })
    // }
}

// changeUserPaymentStatus
exports.changeUserPaymentStatus = async (req, res) => {
    const { userid } = req.body;

    const userExist = await User.find({ userid: userid })
    const payment = userExist[0].paymentCount;
    const reffered_id = userExist[0].reffered_id;
    console.log(reffered_id, '582');

    const user = await User.updateOne({ userid: userid }, {
        $set: {
            paymentStatus: true,
            paymentCount: payment + 1,
            doj: new Date()
        }
    })
    if (reffered_id === 'admin@123') {
        return res.status(200).json({ message: "Your paymnet successfull" })
    } else {

        if (user) {
            const findUserFromRefferedId = await User.find({ refferal_id: reffered_id })
            console.log(findUserFromRefferedId, '592');

            if (findUserFromRefferedId.length > 0) {
                const findUserfromUser = await User.find({ refferal_id: reffered_id })
                if (findUserfromUser.length > 0 && payment < 1) {
                    const userid = findUserFromRefferedId[0].userid;
                    let wallet = findUserFromRefferedId[0].wallet;
                    wallet = wallet + 1200;
                    console.log(wallet);
                    const insertUserWalletAmount = await User.updateOne({ userid: userid }, {
                        $set: {
                            wallet: wallet
                        }
                    })
                    if (insertUserWalletAmount) {
                        return res.status(200).json({
                            message: "Payment Successfull"
                        })
                    }
                } else {
                    const userid = findUserFromRefferedId[0].userid;
                    let wallet = findUserFromRefferedId[0].wallet;
                    wallet = wallet + 700;
                    console.log(wallet);
                    const insertUserWalletAmount = await User.updateOne({ userid: userid }, {
                        $set: {
                            wallet: wallet
                        }
                    })
                    if (insertUserWalletAmount) {
                        return res.status(200).json({
                            message: "Payment Successfull"
                        })
                    }
                }

            }
            else {
                const findUserFromMemberRefferedId = await Member.find({ refferal_id: reffered_id })
                if (findUserFromMemberRefferedId.length > 0 && payment < 1) {
                    const memberid = findUserFromMemberRefferedId[0].memberid;
                    let wallet = findUserFromMemberRefferedId[0].wallet;
                    wallet = wallet + 1200;
                    console.log(wallet);
                    const insertWalletAmount = await Member.updateOne({ memberid: memberid }, {
                        $set: {
                            wallet: wallet
                        }
                    })
                    if (insertWalletAmount) {
                        return res.status(200).json({
                            message: "Payment Successfull",
                        })
                    }
                } else {
                    const memberid = findUserFromMemberRefferedId[0].memberid;
                    let wallet = findUserFromMemberRefferedId[0].wallet;
                    wallet = wallet + 700;
                    console.log(wallet);
                    const insertWalletAmount = await Member.updateOne({ memberid: memberid }, {
                        $set: {
                            wallet: wallet
                        }
                    })
                    if (insertWalletAmount) {
                        return res.status(200).json({
                            message: "Payment Successfull",
                        })
                    }
                }

            }

        } else {
            return res.status(500).json({
                message: "Payment failed"
            })
        }
    }



}

// userfetchRefferalPayout
exports.userfetchRefferalPayout = async (req, res) => {
    const { userid } = req.body;


    const userPayoutFetch = await User.findOne({ userid: userid })
    if (userPayoutFetch) {
        const wallet = userPayoutFetch.wallet
        return res.status(200).json({
            message: "User Details Fetched",
            wallet
        })


    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// refferalPayoutRequestUser
exports.refferalPayoutRequestUser = async (req, res) => {
    const { userid, requestAmount } = req.body;
    if (!requestAmount) {
        return res.status(422).json({ message: "Please Enter Amount" })
    }
    const userWalletFetch = await User.findOne({ userid: userid })
    if (userWalletFetch) {
        let walletAmount = userWalletFetch.wallet;
        if (requestAmount > walletAmount) {
            return res.status(400).json({
                message: "Insufficient Balance"
            })
        } else {
            const restAmount = walletAmount - requestAmount
            let requestDate = new Date()
            const requestWithdrawal = new userRefferalPayoutRequest({ userid, walletAmount: requestAmount, requestDate })
            await requestWithdrawal.save();
            if (requestWithdrawal) {
                await User.updateOne({ userid: userid }, {
                    $set: {
                        wallet: restAmount
                    }
                })
                return res.status(201).json({
                    message: "Withdrawal request sent"
                })
            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        }
        // console.log(walletAmount,'694');

    }

}

// userFetchRefferalPayoutWithdrawalRequest
exports.userFetchRefferalPayoutWithdrawalRequest = async (req, res) => {
    const { userid } = req.body;
    let userWithdrawalRequest = await userRefferalPayoutRequest.find({ userid: userid })
    if (userWithdrawalRequest) {
        return res.status(200).json({
            message: "Withdrawal Request fetched",
            userWithdrawalRequest
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// fetchApproveRefferalPayoutUser
exports.fetchApproveRefferalPayoutUser = async (req, res) => {
    const { userid } = req.body;
    let userWithdrawalApprove = await userRefferalPayoutApproveWithdrawal.find({ userid: userid })
    if (userWithdrawalApprove) {
        return res.status(200).json({
            message: "Withdrawal Request fetched",
            userWithdrawalApprove
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// userChat
// exports.userChat(server) = async (req, res) => {



//     const io = new Server(server, {
//         cors: {
//             origin: ["http://localhost:3000", "http://localhost:3001"],
//             methods: ["GET", "POST"]
//         }
//     })

//     io.on("connection", (socket) => {
//         console.log(`User Connnected : ${socket.id}`);

//         socket.on("join_room", (data, type) => {
//             socket.join(data);
//             const data1 = data;
//             console.log(`User with Id: ${socket.id} joined room : ${data}`)
//             console.log(typeof (data), type, '38');
//             if (type === 'USER') {

//                 const exitChat = ChatType.findOne({ userid: data1 })
//                 console.log(exitChat);


//                 //  const user =  ChatType({userid:data1})
//                 //   user.save();
//                 //   socket.emit('userResponse',response)

//             }
//             if (type === "ADMIN") {

//             }
//         })

//         // chatting system
//         socket.on("userMessage", (data) => {
//             socket.to(data.room).emit("admin_receive_message", data);
//         })

//         socket.on("adminMessgae", (data) => {
//             socket.to(data.room).emit("user_receive_message", data);
//         })

//         socket.on("disconnect", () => {
//             console.log(`user ${socket.id} disconnected`);
//         })
//     })


// }

// fetchChatDetailsUser
exports.fetchChatDetailsUser = async (req, res) => {
    const { userid } = req.body;
    let userChatDetails = await ChatType.find({ userid: userid })
    if (userChatDetails) {
        return res.status(200).json({
            message: "Chat details fetched",
            userChatDetails
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


// fetchChatMessageUser
exports.fetchChatMessageUser = async (req, res) => {
    const { room } = req.body;
    let userChatMessage = await chatMessage.find({ room: room })
    if (userChatMessage) {
        return res.status(200).json({
            message: "Chat message fetched",
            userChatMessage
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// AdminOnlineOrNot
exports.AdminOnlineOrNot = async (req, res) => {
    let adminOnline = await Admin.find()
    // console.log(adminOnline[0].isOnline,'964');
    if (adminOnline) {
        const isOnline = adminOnline[0].isOnline
        return res.status(200).json({
            message: "Admin Online status fetched",
            isOnline
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// fetchUserNotificationStatus
exports.fetchUserNotificationStatus = async (req, res) => {
    const { userid } = req.body;
    let notificationStatus = await User.findOne({ userid: userid })
    if (notificationStatus) {
        const isNotification = notificationStatus.notification
        return res.status(200).json({
            message: "Notification status fetched",
            isNotification
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// setNotificationToFalseUser
exports.setNotificationToFalseUser = async (req, res) => {
    const { userid } = req.body;

    let setNotificationStatus = await User.updateOne(
        { userid: userid }, {
        $set: { notification: 0 }

    }
    );
    if (setNotificationStatus) {
        return res.status(201).json({ message: "Notification set to zero " })
    } else {
        return res.status(500).json({ message: "something went wrong" })
    }
}

// otherCountryProfileVerification
exports.otherCountryProfileVerification = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No File Uploaded" })
    }
    const ID_Card = req.file.location;

    if (!ID_Card) {

        return res.status(422).json({ message: "All field required" })
    }
    const userid = req.body.userid;
    // console.log(userid);
    // ------------------------------------------
    const user = await User.find({ userid });
    console.log(user.length, '176');
    if (user.length > 0) {
        User.updateOne({ userid: userid })
            .set({ ID_Card: ID_Card })
            .then(() => {
                return res.status(201).json({ message: "Document Updated" })

            })
    } else {
        const userdocument = new User({ userid, ID_Card });
        const success = await userdocument.save();

        if (success) {
            return res.send({
                code: 200,
                message: "Uploaded Successfully"
            })
        } else {
            return res.send({
                code: 500,
                message: "Service Error"
            })
        }
    }
}

// userTotalWithdrawal
exports.userTotalWithdrawal = async (req, res) => {
    const { userid } = req.body
    userRefferalPayoutRequest.aggregate([
        {
            $match: {
                userid: userid
            }
        },
        {
            $group: {
                _id: null,
                totalDataSum: {
                    $sum: {
                        $add: ['$walletAmount'] // Replace with the fields you want to sum
                    }
                }
            }
        }
    ])
        .then((result) => {
            if (result.length > 0) {
                const totalSum = result[0].totalDataSum;
                //   console.log('Total sum for user:', totalSum);
                return res.status(200).json({
                    message: "Sum of wallet fetched",
                    walletAmount: totalSum
                })
            } else {
                //   console.log('No data found for user');
                return res.status(200).json({
                    message: "No user found",
                    data: 0
                })
            }


        })
        .catch((err) => {
            console.error('Error executing MongoDB aggregation:', err);

        });
}

// userMyTeam
exports.userMyTeam = async (req, res) => {
    const { refferal_id } = req.body;
    // const query = { referral_id:reffered_id };

    const myteam = await User.find({ reffered_id: refferal_id }).select('userid')
    const myteamDetails = myteam.map(user => user.userid)
    console.log(myteamDetails);
    return res.status(200).json({
        message: "My Team fetched",
        teamMembers: myteamDetails
    })

}

// userUpdateWalletAfterAdding
exports.userUpdateWalletAfterAdding = async(req,res) => {
    const {userid,amount} = req.body;
    const userExist = await User.findOne({userid:userid})
    const tradingWallet = userExist.tradingWallet;

    // console.log(amount,'1146');
    const updateWallet = await User.updateOne({ userid: userid }, {
        $set: {
            tradingWallet: tradingWallet + amount,
            
        }
    })
    if(updateWallet){
        return res.status(200).json({
            message:"wallet added",
            tradingWallet
        })
    }else{
        return res.status(400).json({
            message:'Payment failed'
        })
    }
    
}
