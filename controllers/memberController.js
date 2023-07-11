const Member = require('../model/memberSchema')
const multer = require('multer')
const jwt = require('jsonwebtoken');
// const sharp = require('sharp');
const bcrypt = require('bcrypt');
// const forgetPasswordSms = require('../utils/forget-password-otp');
require('dotenv').config();
const MemberProfilePhoto = require('../model/memberProfilePhotoSchema');
const Memberdocument = require('../model/memberDocumentSchema');
const notificationForAll = require('../model/notificationForAllSchema');
const notificationForAllRefferal = require('../model/notificationForAllRefferalSchema');
const notificationForParticularRefferal = require('../model/notificationForParticularRefferalSchema');
const memberRefferalPayoutRequest = require('../model/memberRefferalPayoutRequestSchema');
const memberRefferalPayoutApproveWithdrawal = require('../model/memberRefferalPayoutApproveWithdrawalSchema');
const RefferalChatType = require('../model/refferalChatType');
const ReffrealChatMessage = require('../model/refferalChatMessageSchema');
const Admin = require('../model/adminSchema');
const User = require('../model/userSchema');
const validator = require('validator');

// refferalRegistration
exports.memberRegistration = async (req, res) => {

    if (!req.files || !req.files['aadhar_front_side'] || !req.files['aadhar_back_side'] || !req.files['pan_card']) {

        return res.status(422).json({ message: "Please Fill all Details!" })

    }
    const aadhar_front_side = req.files.aadhar_front_side[0].location;
    const aadhar_back_side = req.files.aadhar_back_side[0].location;
    const pan_card = req.files.pan_card[0].location;

    if (!aadhar_front_side || !aadhar_back_side || !pan_card) {

        return res.status(422).json({ message: "All field required" })
    }


    const { fname, lname, email, phone, address, gender, dob, aadhar, pan, memberid, password } = req.body;


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

    if (!fname || !lname || !phone || !address || !gender || !dob || !aadhar || !pan || !memberid || !password) {

        return res.status(422).json({ message: "Please Fill all Details!" })
    }
    else {

        try {
            //const memberid = fname + Math.floor(Math.random() * 10000 + 1);
            const refferal_id = memberid + Math.floor(Math.random() * 10000 + 1);
            console.log(refferal_id);
            // function makepassword(length) {
            //     let result = '';
            //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%&@#';
            //     const charactersLength = characters.length;
            //     let counter = 0;
            //     while (counter < length) {
            //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
            //         counter += 1;
            //     }
            //     return result;
            // }

            //const password = makepassword(8)
            //const pass = password;
            //console.log(pass, '49');

            const memberExist = await Member.findOne({ memberid: memberid });
            if (memberExist) {
                return res.status(200).json({ message: 'Member already exist!' })
            }

            const member = new Member({ fname, lname, email, phone, address, gender, dob, aadhar, pan, refferal_id, aadhar_front_side, aadhar_back_side, pan_card, memberid, password });
            await member.save();
            res.status(201).json({ message: "Member registered successfully" });


        }

        catch (error) {
            console.log(error);
        }
    }

}

// otherCountryMemberRegistration
exports.otherCountryMemberRegistration = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "No File Uploaded" })
    }

    const ID_Card = req.file.location;

    //console.log(aadhar_back, aadhar_front, pan_card,'140');

    if (!ID_Card) {

        return res.status(422).json({ message: "All field required" })
    }


    // if (!req.files || !req.files['aadhar_front_side'] || !req.files['aadhar_back_side'] || !req.files['pan_card']) {

    //     return res.status(422).json({ message: "Please Fill all Details!" })

    // }
    // const aadhar_front_side = req.files.aadhar_front_side[0].location;
    // const aadhar_back_side = req.files.aadhar_back_side[0].location;
    // const pan_card = req.files.pan_card[0].location;

    // if (!aadhar_front_side || !aadhar_back_side || !pan_card) {

    //     return res.status(422).json({ message: "All field required" })
    // }


    const { fname, lname, email, phone, address, gender, dob, Id_No, memberid, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }



    if (!fname || !lname || !phone || !address || !gender || !dob || !Id_No || !memberid || !password) {

        return res.status(422).json({ message: "Please Fill all Details!" })
    }
    else {

        try {
            //const memberid = fname + Math.floor(Math.random() * 10000 + 1);
            const refferal_id = memberid + Math.floor(Math.random() * 10000 + 1);
            console.log(refferal_id);
            // function makepassword(length) {
            //     let result = '';
            //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%&@#';
            //     const charactersLength = characters.length;
            //     let counter = 0;
            //     while (counter < length) {
            //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
            //         counter += 1;
            //     }
            //     return result;
            // }

            //const password = makepassword(8)
            //const pass = password;
            //console.log(pass, '49');

            const memberExist = await Member.findOne({ memberid: memberid });
            if (memberExist) {
                return res.status(200).json({ message: 'Member already exist' })
            }

            const member = new Member({ fname, lname, email, phone, address, gender, dob, refferal_id, Id_No, ID_Card, memberid, password });
            await member.save();
            res.status(201).json({ message: "Member registered successfully" });


        }

        catch (error) {
            console.log(error);
        }
    }
}

// memberLogin
exports.memberLogin = async (req, res) => {
    const { memberid, password } = req.body;
    if (!memberid || !password) {
        return res.status(422).json({ message: "Please fill all details" });
    }
    const memberLogin = await Member.findOne({ memberid: memberid });

    if (!memberLogin) {
        return res.status(404).json({ message: "Invalid Credential!" });

    }
    const blocked = memberLogin.isBlocked;
    if (!blocked) {
        try {
            const isMatch = await bcrypt.compare(password, memberLogin.password);
            // const token = await memberLogin.generateAuthToken();
            const token = jwt.sign(
                { userId: memberLogin._id },
                process.env.SECRET_KEY,
                { expiresIn: 60 } // Set the token to expire in 1 hour
              );
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 60000),
                httpOnly: true
            });
            if (!isMatch) {
                return res.status(404).json({ message: "Invalid Credential!" })
            } else {
                return res.status(200).json({
                    message: "Member Login successfully",
                    token: token,
                    memberLogin,
                    expires: new Date().getTime() + 60000
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(401).json({ message: "Your Account is blocked!" })
    }

}

// memberProfileVerification
exports.memberProfileVerification = async (req, res) => {
    if (!req.files || !req.files['aadhar_front_side'] || !req.files['aadhar_back_side'] || !req.files['pan_card']) {

        return res.status(422).json({ message: "Please Fill all Details!" })

    }

    //console.log(req.files);
    const { memberid } = req.body;
    const aadhar_front_side = req.files.aadhar_front_side[0].location;
    const aadhar_back_side = req.files.aadhar_back_side[0].location;
    const pan_card = req.files.pan_card[0].location;
    console.log(aadhar_back_side, aadhar_front_side, pan_card, memberid, '140');


    if (!aadhar_front_side || !aadhar_back_side || !pan_card) {

        return res.status(422).json({ message: "All field required" })
    }
    // console.log(userid);
    // ------------------------------------------
    const member = await Member.find({ memberid });

    if (member.length > 0) {
        Member.updateOne({ memberid: memberid })
            .set({ aadhar_front_side: aadhar_front_side, aadhar_back_side: aadhar_back_side, pan_card: pan_card })
            .then(() => {
                return res.status(201).json({ message: "Document Updated" })
            })
    } else {
        const memberdocument = new Member({ memberid, aadhar_front_side, aadhar_back_side, pan_card });
        const success = await memberdocument.save();

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

// fetchMemberDetails
exports.fetchMemberDetailsMemberSide = async (req, res) => {
    const memberid = req.body;
    verifyToken = req.verifyToken;
    //console.log(token,verifyToken);

    const memberFetchDetails = await Member.findOne(memberid)
    //console.log(userFetchDetails)
    if (memberFetchDetails) {

        console.log(memberFetchDetails);
        return res.status(200).json({
            message: "User Details Fetched",
            result: memberFetchDetails
        })


    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// memberProfilePhotoUpload
exports.memberProfilePhotoUpload = async (req, res) => {
    //console.log(req.file, '290');
    if (!req.file) {
        return res.status(400).json({ message: "No File Uploaded" })
    }
    const memberid = req.body.memberid;
    const imageUrl = req.file.location;

    const result = await MemberProfilePhoto.find({ memberid });
    console.log(result.length);
    if (result.length > 0) {
        MemberProfilePhoto.updateOne({ memberid: memberid })
            .set({ imageUrl: imageUrl })
            .then(() => {
                return res.status(201).json({ message: "Profile photo Updated" })
            })
    } else {

        if (!memberid || !imageUrl) {
            return res.send({
                code: 400,
                message: "Bad Request"
            })
        }

        const memberProfilePhoto = new MemberProfilePhoto({ memberid: memberid, imageUrl: imageUrl })
        const success = await memberProfilePhoto.save()

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

// fetchMemberProfilePhoto
exports.fetchMemberProfilePhoto = async (req, res) => {
    const { memberid } = req.body;
    MemberProfilePhoto.find({ memberid })
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

// fetchMemberDocumentMemberSide
exports.fetchMemberDocumentMemberSide = async (req, res) => {
    const { memberid } = req.body;
    await Memberdocument.find({ memberid })
        .then(result => {
            res.status(200).json({
                message: "Member documents Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// memberChangePassword
exports.memberChangePassword = async (req, res) => {
    const { oldPassword, newPassword, token } = req.body;
    console.log(token);
    console.log(req.token)
    if (!oldPassword || !newPassword) {
        return res.status(422).json({ message: "Fields required" })
    }

    verifyToken = req.verifyToken;

    const memberFetchDetails = await Member.findOne({ token })
    console.log(memberFetchDetails);
    if (memberFetchDetails) {

        const isMatch = await bcrypt.compare(oldPassword, memberFetchDetails.password);
        if (isMatch) {
            memberFetchDetails.password = req.body.newPassword;
            await memberFetchDetails.save();
            return res.status(201).json({ message: "Password successfully Change" })
        } else {
            return res.status(422).json({ message: "Old Password Is Wrong" })
        }
        //console.log(isMatch,'198');

    }
}

// memberForgetPassword 
exports.memberForgetPassword = async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const memberid = req.body;
    console.log(otp, '207');

    const memberFetchDetails = await Member.findOne(memberid)
    //console.log(memberFetchDetails, '210');

    if (memberFetchDetails) {
        let phone = '+91' + memberFetchDetails.phone;

        // forgetPasswordSms(phone, {"otp": otp })
        memberFetchDetails.otp = otp;
        await memberFetchDetails.save();
        return res.status(201).json({ message: "OTP Sent" })
    } else {
        return res.status(404).json({ message: "User not found" })
    }
}

// memberVerifyOtp
exports.memberVerifyOtp = async (req, res) => {
    const { memberid } = req.body;
    //verifyToken = req.verifyToken;
    const otp = Number(req.body.otp);
    console.log(typeof (otp));

    const memberFetchDetails = await Member.findOne({ memberid })
    if (memberFetchDetails) {

        if (memberFetchDetails.otp !== otp) {

            return res.status(400).json({ message: "OTP Invalid" })
        }
        else {
            return res.status(200).json({ message: "OTP matched" })
        }
    }

}

// memberResetPassword
exports.memberResetPassword = async (req, res) => {
    const { memberid } = req.body;
    const { newPassword, confirmPassword } = req.body;

    console.log(newPassword, confirmPassword);
    if (!newPassword || !confirmPassword) {
        return res.status(422).json({ message: "Fields required" })
    }

    if (newPassword !== confirmPassword) {
        return res.status(422).json({ message: "Password Not Matched" })
    }


    //verifyToken = req.verifyToken;

    const memberFetchDetails = await Member.findOne({ memberid })
    if (memberFetchDetails) {
        memberFetchDetails.password = req.body.newPassword;
        await memberFetchDetails.save();

        return res.status(201).json({ message: "Password Successfully Reset" })
    }

}

// editMemberDetails
exports.editMemberDetails = async (req, res) => {
    const { memberid } = req.body;
    Member.find({ memberid })
        .then(result => {
            res.status(200).json({
                message: "Member Details Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// saveMemberEditedDetails
exports.saveMemberEditedDetails = async (req, res) => {
    const { fname, lname, phone, address, gender, dob, aadhar, pan, userid } = req.body

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
    Member.updateOne({ userid: userid })
        .set({ fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dob, aadhar: aadhar, pan: pan })
        .then(() => {
            return res.status(201).json({ message: "Member Details Updated" })

        })
}

// fetchRefferalNotification
exports.fetchRefferalNotification = async (req, res) => {
    const { memberid } = req.body;
    const allNotitfication = await notificationForAll.find()
    // console.log(allNotitfication);
    if (allNotitfication) {
        const allRefferalNotification = await notificationForAllRefferal.find()
        if (allRefferalNotification) {

            const particularRefferal = await notificationForParticularRefferal.find({ memberid: memberid })
            if (particularRefferal) {
                res.status(200).json({
                    message: "Member notification fetched",
                    allNotitfication,
                    allRefferalNotification,
                    particularRefferal
                })
            }

        }
    }
}

// memberFetchRefferalPayout
exports.memberFetchRefferalPayout = async (req, res) => {
    const { memberid } = req.body;


    const memberPayoutFetch = await Member.findOne({ memberid: memberid })
    if (memberPayoutFetch) {
        const wallet = memberPayoutFetch.wallet
        return res.status(200).json({
            message: "Member Wallet Fetched",
            wallet
        })


    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// refferalPayoutRequestMember 
exports.refferalPayoutRequestMember = async (req, res) => {
    const { memberid, requestAmount } = req.body;
    if (!requestAmount) {
        return res.status(422).json({ message: "Please Enter Amount" })
    }
    const memberWalletFetch = await Member.findOne({ memberid: memberid })
    if (memberWalletFetch) {
        let walletAmount = memberWalletFetch.wallet;
        if (requestAmount > walletAmount) {
            return res.status(400).json({
                message: "Insufficient Balance"
            })
        } else {
            const restAmount = walletAmount - requestAmount
            let requestDate = new Date()
            const requestWithdrawal = new memberRefferalPayoutRequest({ memberid, walletAmount: requestAmount, requestDate })
            await requestWithdrawal.save();
            if (requestWithdrawal) {
                await Member.updateOne({ memberid: memberid }, {
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

// fetchMemberRefferalPayoutRequestWithdrawal
exports.fetchMemberRefferalPayoutRequestWithdrawal = async (req, res) => {
    const { memberid } = req.body;
    let memberWithdrawalRequest = await memberRefferalPayoutRequest.find({ memberid: memberid })
    if (memberWithdrawalRequest) {
        return res.status(200).json({
            message: "Withdrawal Request fetched",
            memberWithdrawalRequest
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// memberFetchRefferalPayoutApproveWithdrawal
exports.memberFetchRefferalPayoutApproveWithdrawal = async (req, res) => {
    const { memberid } = req.body;
    let memberApproveWithdrawal = await memberRefferalPayoutApproveWithdrawal.find({ memberid: memberid })
    if (memberApproveWithdrawal) {
        return res.status(200).json({
            message: " Approved withdrawal fetched",
            memberApproveWithdrawal
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// fetchMemberNotificationStatus
exports.fetchMemberNotificationStatus = async (req, res) => {
    const { memberid } = req.body;
    let notificationStatus = await Member.findOne({ memberid: memberid })
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

// setNotificationToFalseMember
exports.setNotificationToFalseMember = async (req, res) => {
    const { memberid } = req.body;

    let setNotificationStatus = await Member.updateOne({ memberid: memberid },
        {
            $set: { notification: 0 }
        }
    );
    if (setNotificationStatus) {
        return res.status(201).json({ message: "Notification set to zero " })
    } else {
        return res.status(500).json({ message: "something went wrong" })
    }
}

// fetchChatDetailsRefferal
exports.fetchChatDetailsRefferal = async (req, res) => {
    const { memberid } = req.body;
    let refferalChatDetails = await RefferalChatType.find({ memberid: memberid })
    if (refferalChatDetails) {
        return res.status(200).json({
            message: " Refferal Chat details fetched",
            refferalChatDetails
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// fetchChatMessageRefferal
exports.fetchChatMessageRefferal = async (req, res) => {
    const { room } = req.body;
    let refferalChatMessage = await ReffrealChatMessage.find({ room: room })
    if (refferalChatMessage) {
        return res.status(200).json({
            message: "Chat message fetched",
            refferalChatMessage
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// adminOnlineOrNotRefferal
exports.adminOnlineOrNotRefferal = async (req, res) => {
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

// refferalTotalWithdrawal
exports.refferalTotalWithdrawal = async (req, res) => {
    const { memberid } = req.body
    memberRefferalPayoutRequest.aggregate([
        {
            $match: {
                memberid: memberid
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
                    message: "No Member found",
                    data: 0
                })
            }
        })
        .catch((err) => {
            console.error('Error executing MongoDB aggregation:', err);
        });
}

// refferalMyTeam
exports.refferalMyTeam = async (req, res) => {
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
