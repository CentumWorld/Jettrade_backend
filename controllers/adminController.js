const Admin = require('../model/adminSchema')
const User = require('../model/userSchema')
const jwt = require('jsonwebtoken');
const Userdocument = require('../model/userDocumentSchema');
const Member = require('../model/memberSchema');
const Memberdocument = require('../model/memberDocumentSchema');
const notificationForAll = require('../model/notificationForAllSchema');
const notificationForAllTrader = require('../model/notificationForAllTraderSchema');
const notificationForAllRefferal = require('../model/notificationForAllRefferalSchema');
const notificationForParticularTrader = require('../model/notificationForParticularTraderSchema');
const notificationForParticularRefferal = require('../model/notificationForParticularRefferalSchema');
const userRefferalPayoutRequest = require('../model/userRefferalPayoutRequest');
const userRefferalPayoutApproveWithdrawal = require('../model/userRefferalPayoutApproveWithdrawalSchema');
const memberRefferalPayoutRequest = require('../model/memberRefferalPayoutRequestSchema');
const memberRefferalPayoutApproveWithdrawal = require('../model/memberRefferalPayoutApproveWithdrawalSchema');
const ChatType = require('../model/chatType');
const chatMessage = require('../model/chatMessageSchema');
const RefferalChatType = require('../model/refferalChatType');
const RefferalChatMessage = require('../model/refferalChatMessageSchema');

require('dotenv').config();

// admin Login

exports.adminLogin = async (req, res) => {
    try {
        const { admin_id, password } = req.body;
        if (!admin_id || !password) {
            return res.status(422).json({ message: "Please fill credentials to login" })
        }
        const adminLogin = await Admin.findOne({ admin_id: admin_id })

        //console.log(adminLogin);
        if (!adminLogin) {
            res.status(404).json({ message: "Invalid Credentials" })
        } else {
            if (password === adminLogin.password) {
                //console.log('login');
                // const token = await adminLogin.generateAuthToken();
                const token = jwt.sign(
                    { userId: adminLogin._id },
                    process.env.SECRET_KEY,
                    { expiresIn: 6000 } // Set the token to expire in 1 hour
                  );

                // console.log(token);
                // res.cookie("jwtoken", token, {
                //     expires: new Date(Date.now() + 2880000000),
                //     httpOnly: true
                // });
                
                const admin_id = adminLogin.admin_id
                res.status(201).json({ message: "Admin Login Successfully", 
                token: token,
                admin_id ,
                expires: new Date().getTime() + 60000 });
            } else {
                return res.status(404).json({ error: "Invalid Credentials" })
            }
        }

    } catch (error) {
        console.log(error);
    }
}

// admin logout
exports.adminLogout = (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: "Logged out" });
}


// fetchUserDetails
exports.fetchUserDetails = (req, res) => {
    User.find((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({ result });
        }
    })

}

// fetchParticularUserDetails
exports.fetchParticularUserDetails = (req, res) => {
    const _id = req.body;
    User.findById(_id)
        .then(result => {
            res.status(200).json({
                message: "Details Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })


}

// verifyUser
exports.verifyUser = async (req, res) => {
    const { status, id } = req.body;
    let result = await User.updateOne(
        { _id: id }, {
        $set: { status: status }

    }
    );
    if (result.modifiedCount > 0) {
        return res.status(200).json({
            message: "Verified Successfully"
        })
    } else {
        return res.status(404).json({
            message: "Something Went wrong"
        })
    }

}

// fetchUserDocumentAdmin
exports.fetchUserDocumentAdmin = async (req, res) => {
    const { userid } = req.body;
    await User.find({ userid })
        .then(result => {
            res.status(200).json({
                message: "Details Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// fetchMemberDetails
exports.fetchMemberDetails = async (req, res) => {
    Member.find((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({ result });
        }
    })

}

// fetchParticularMemberDetails
exports.fetchParticularMemberDetails = async (req, res) => {
    const _id = req.body;
    Member.findById(_id)
        .then(result => {
            res.status(200).json({
                message: "Member details Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// verifyMember
exports.verifyMember = async (req, res) => {
    const { status, id } = req.body;
    let result = await Member.updateOne(
        { _id: id }, {
        $set: { status: status }

    }
    );
    if (result.modifiedCount > 0) {
        return res.status(200).json({
            message: "Verified Successfully"
        })
    } else {
        return res.status(404).json({
            message: "Something Went wrong"
        })
    }
}

// fetchMemberDocumentAdminside
exports.fetchMemberDocumentAdminside = async (req, res) => {
    const { memberid } = req.body;
    await Memberdocument.find({ memberid })
        .then(result => {
            res.status(200).json({
                message: " Member Documents Fetched",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// userDetailsEditAdmin 
exports.userDetailsEditAdmin = async (req, res) => {
    const { userWhat, fname, lname, phone, address, gender, dob, aadhar, pan, id, Id_No } = req.body

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

        // User.updateOne({ _id: 'id' })
        //     .set({ fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dateofbirth, aadhar: aadhar, pan: pan })
        User.updateOne({ _id: id }, { $set: { fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dob, aadhar: aadhar, pan: pan } })
            .then(() => {
                return res.status(201).json({ message: "User Details Updated" })

            })
    }
    if (userWhat === 'otherCountry') {

        if (!fname || !lname || !phone || !address || !gender || !dob || !Id_No) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }


        User.updateOne({ _id: id }, { $set: { fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dob, Id_No: Id_No } })
            .then(() => {
                return res.status(201).json({ message: "User Details Updated" })

            })
    }

}

// memberDetailsEditAdmin
exports.memberDetailsEditAdmin = async (req, res) => {
    const { userWhat, fname, lname, phone, address, gender, dob, aadhar, pan, id, Id_No } = req.body;

    if (userWhat === 'indian') {
        if (!fname || !lname || !phone || !address || !gender || !dob || !aadhar || !pan) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
    
    
        Member.updateOne({ _id: id }, { $set: { fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dob, aadhar: aadhar, pan: pan } })
            .then(() => {
                return res.status(201).json({ message: "User Details Updated" })
    
            })
    }
    if(userWhat === 'otherCountry'){
        if (!fname || !lname || !phone || !address || !gender || !dob || !Id_No) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
    
    
        Member.updateOne({ _id: id }, { $set: { fname: fname, lname: lname, address: address, gender: gender, phone: phone, dob: dob,Id_No:Id_No } })
            .then(() => {
                return res.status(201).json({ message: "User Details Updated" })
    
            })
    }

    

}

// deleteUserAdmin
exports.deleteUserAdmin = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    const success = User.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            console.log('hiii');
        } else {
            return res.status(201).json({ message: "User Deleted" })
        }
    })
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
}
// blockMember
exports.blockMember = async (req, res) => {
    const { block, id } = req.body;
    console.log(block);
    let result = await Member.updateOne(
        { _id: id }, {
        $set: { isBlocked: block }

    }
    );
    if (result.modifiedCount > 0) {
        if (block) {
            return res.status(200).json({
                message: "Member Blocked"
            })
        } else {
            return res.status(200).json({
                message: "Member Unblocked"
            })
        }
    } else {
        return res.status(404).json({
            message: "Something Went wrong"
        })
    }
}

// userRegistrationByAdmin
exports.userRegistrationByAdmin = async (req, res) => {
    if (!req.files || !req.files['aadhar_front_side'] || !req.files['aadhar_back_side'] || !req.files['pan_card']) {

        return res.status(422).json({ message: "Please Fill all Details!" })

    }

    const aadhar_front_side = req.files.aadhar_front_side[0].location;
    const aadhar_back_side = req.files.aadhar_back_side[0].location;
    const pan_card = req.files.pan_card[0].location;
    //console.log(aadhar_back, aadhar_front, pan_card,'140');

    if (!aadhar_front_side || !aadhar_back_side || !pan_card) {

        return res.status(422).json({ message: "All field required" })
    }

    const { fname, lname, email, phone, address, gender, dob, aadhar, pan, reffered_id, userid, password } = req.body;


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

            return res.status(422).json({ message: "Please Fill all Details!" })
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
                    return res.status(400).json({ message: 'Something went wrong try again!' })
                }

                const user = new User({ fname, lname, email, phone, address, gender, dob, aadhar, pan, refferal_id, reffered_id, aadhar_front_side, aadhar_back_side, pan_card, userid, password });
                await user.save();
                res.status(201).json({ message: "User registered successfully" });


            }

            catch (error) {
                console.log(error);
            }
        }
    } else {
        if (!fname || !lname || !phone || !address || !gender || !dob || !aadhar || !pan || !reffered_id || !userid || !password) {

            return res.status(422).json({ message: "Please Fill all Details!" })
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

                const user = new User({ fname, lname, email, phone, address, gender, dob, aadhar, pan, refferal_id, reffered_id, aadhar_front_side, aadhar_back_side, pan_card, userid, password });
                await user.save();
                res.status(201).json({ message: "User registered successfully" });


            }

            catch (error) {
                console.log(error);
            }
        }
    }


}

// blockUser
exports.blockUser = async (req, res) => {
    const { block, id } = req.body;
    // console.log(block);
    let result = await User.updateOne(
        { _id: id }, {
        $set: { isBlocked: block }

    }
    );
    if (result.modifiedCount > 0) {
        if (block) {
            return res.status(200).json({
                message: "User Blocked"
            })
        } else {
            return res.status(200).json({
                message: "User Unblocked"
            })
        }
    } else {
        return res.status(404).json({
            message: "Something Went wrong"
        })
    }
}

// notificationForAll
exports.notificationForAll = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({
            message: "Please provide message"
        })
    }
    const notification = new notificationForAll({ message: message })
    await notification.save();
    console.log(notification, '431');
    if (notification) {
        User.updateMany({}, { notification: 1 })
            .then(() => {
                Member.updateMany({}, { notification: 1 })
                    .then(() => {
                        return res.status(201).json({ message: "Notification pushed successfully" })
                    }).catch((error) => {
                        console.error('Error updating notification for member', error);
                    })
            })
            .catch((error) => {
                console.error('Error Updating notification', error)
            })
    }


}

// notificationForAllTraders
exports.notificationForAllTraders = async (req, res) => {
    const { investerType, message } = req.body;
    if (!investerType || !message) {
        return res.status(400).json({
            message: "Please provide type and message"
        })
    }
    const notification = new notificationForAllTrader({ investerType: investerType, message: message })
    await notification.save();
    if (notification) {
        User.updateMany({}, { $inc: { notification: 1 } })
            .then(() => {
                return res.status(200).json({ message: "Notification pushed successfully" })
            })
            .catch((error) => {
                console.error('Error Updating notification', error)
            })
    }
    // const users = await User.find({},'notification')
    // const notificationValues =  users.map((user) => user.notification);
    // console.log('notification values:',notificationValues);
}

// notificationForAllRefferal
exports.notificationForAllRefferal = async (req, res) => {
    const { investerType, message } = req.body;
    if (!investerType || !message) {
        return res.status(400).json({
            message: "Please provide type and message"
        })
    }
    const notification = new notificationForAllRefferal({ investerType: investerType, message: message })
    await notification.save();
    if (notification) {

        Member.updateMany({}, { $inc: { notification: 1 } })
            .then(() => {
                return res.status(201).json({ message: "Notification pushed successfully" })
            }).catch((error) => {
                console.error('Error updating notification for member', error);
            })
    }

}


// notificationForParticularTrader
exports.notificationForParticularTrader = async (req, res) => {
    const { userid, message } = req.body;
    if (!userid || !message) {
        return res.status(400).json({
            message: "Please provide user ID and message"
        })
    }
    const userExist = await User.findOne({ userid: userid });
    if (!userExist) {
        return res.status(400).json({ message: 'Invalid User ID' })
    }
    const notification = new notificationForParticularTrader({ userid: userid, message: message })
    await notification.save();
    if (notification) {

        User.updateOne({ userid: userid }, { $inc: { notification: 1 } })
            .then(() => {
                return res.status(201).json({ message: "Notification pushed successfully" })
            }).catch((error) => {
                console.error('Error updating notification for member', error);
            })
    }

}


// notificationForParticularRefferal
exports.notificationForParticularRefferal = async (req, res) => {
    const { memberid, message } = req.body;
    if (!memberid || !message) {
        return res.status(400).json({
            message: "Please provide member ID and message"
        })
    }
    const memberExist = await Member.findOne({ memberid: memberid });
    if (!memberExist) {
        return res.status(400).json({ message: 'Invalid Member ID' })
    }
    const notification = new notificationForParticularRefferal({ memberid: memberid, message: message })
    await notification.save();
    if (notification) {

        Member.updateOne({ memberid: memberid }, { $inc: { notification: 1 } })
            .then(() => {
                return res.status(201).json({ message: "Notification pushed successfully" })
            }).catch((error) => {
                console.error('Error updating notification for member', error);
            })
    }
}


// fetchRefferalPayoutUser
exports.fetchRefferalPayoutUser = async (req, res) => {

    User.find((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        } else {
            return res.status(200).json({ result });
        }
    })

}

// fetchRefferalPayoutMember
exports.fetchRefferalPayoutMember = async (req, res) => {
    Member.find((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        } else {
            return res.status(200).json({ result });
        }
    })
}

// fetchRefferalPayoutWithdrawalRequest
exports.fetchRefferalPayoutWithdrawalRequest = async (req, res) => {
    userRefferalPayoutRequest.find((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        } else {
            return res.status(200).json({ message: "Withdrawal Request fetched", result });
        }
    })
}

// approveUserRefferalPayout
exports.approveUserRefferalPayout = async (req, res) => {
    const { id } = req.body
    const user = await userRefferalPayoutRequest.findOne({ _id: id })
    if (!user) {
        return res.status(400).json({
            message: "User not Found"
        })
    } else {
        // console.log(user.userid);
        let userid = user.userid;
        let walletAmount = user.walletAmount;
        let requestDate = user.requestDate
        console.log(userid, walletAmount, requestDate, '548');
        const approveRequestAmount = new userRefferalPayoutApproveWithdrawal({ userid: userid, walletAmount: walletAmount, requestDate: requestDate, approveDate: new Date() })
        approveRequestAmount.save()
        const deleteRequestUserRefferalPayout = await userRefferalPayoutRequest.deleteOne({ _id: id })
        if (deleteRequestUserRefferalPayout) {
            return res.status(200).json({
                message: "Request Approved"
            })
        } else {
            return res.status(500).json({
                message: "Something went wrong"
            })
        }
    }

}

// fetchUserRefferalPayoutApproveWithdrawal
exports.fetchUserRefferalPayoutApproveWithdrawal = async (req, res) => {
    userRefferalPayoutApproveWithdrawal.find((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        } else {
            return res.status(200).json({ message: "Withdrawal Request fetched", result });
        }
    })
}

// adminFetchMemberRefferalPayoutRequest
exports.adminFetchMemberRefferalPayoutRequest = async (req, res) => {
    memberRefferalPayoutRequest.find((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        } else {
            return res.status(200).json({ message: "Withdrawal Request fetched", result });
        }
    })
}

// approveMemberRefferalPayout
exports.approveMemberRefferalPayout = async (req, res) => {
    const { id } = req.body
    const member = await memberRefferalPayoutRequest.findOne({ _id: id })
    if (!member) {
        return res.status(400).json({
            message: "Member not Found"
        })
    } else {
        // console.log(user.userid);
        let memberid = member.memberid;
        let walletAmount = member.walletAmount;
        let requestDate = member.requestDate
        console.log(memberid, walletAmount, requestDate, '548');
        const approveRequestAmount = new memberRefferalPayoutApproveWithdrawal({ memberid: memberid, walletAmount: walletAmount, requestDate: requestDate, approveDate: new Date() })
        approveRequestAmount.save()
        const deleteRequestMemberRefferalPayout = await memberRefferalPayoutRequest.deleteOne({ _id: id })
        if (deleteRequestMemberRefferalPayout) {
            return res.status(200).json({
                message: "Request Approved"
            })
        } else {
            return res.status(500).json({
                message: "Something went wrong"
            })
        }
    }
}

// fetchMemberRefferalPayoutApproveWithdrawal
exports.fetchMemberRefferalPayoutApproveWithdrawal = async (req, res) => {
    memberRefferalPayoutApproveWithdrawal.find((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        } else {
            return res.status(200).json({ message: "Withdrawal Request fetched", result });
        }
    })
}

// fetchUserChatCount
exports.fetchUserChatCount = async (req, res) => {
    ChatType.find((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        } else {
            return res.status(200).json({ message: "Use Chat details fetched", result });
        }
    })
}

// fetchChatMessageAdmin
exports.fetchChatMessageAdmin = async (req, res) => {
    const { room } = req.body;
    let adminChatMessage = await chatMessage.find({ room: room })
    if (adminChatMessage) {
        return res.status(200).json({
            message: "Chat message fetched",
            adminChatMessage
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// UserOnlineOrNot
exports.UserOnlineOrNot = async (req, res) => {
    const { userid } = req.body;
    let userOnlineOrNot = await User.findOne({ userid: userid })
    if (userOnlineOrNot) {
        const isOnline = userOnlineOrNot.isOnline
        return res.status(200).json({
            message: "User Online status fetched",
            isOnline
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// fetchRefferalChatCount
exports.fetchRefferalChatCount = async (req, res) => {
    RefferalChatType.find((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        } else {
            return res.status(200).json({ message: "Refferal Chat details fetched", result });
        }
    })
}

// refferalOnlineOrNot
exports.refferalOnlineOrNot = async (req, res) => {
    const { memberid } = req.body;
    let refferalOnlineOrNot = await Member.findOne({ memberid: memberid })
    if (refferalOnlineOrNot) {
        const isOnline = refferalOnlineOrNot.isOnline
        return res.status(200).json({
            message: "Member Online status fetched",
            isOnline
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

// fetchRefferalChatMessageAdmin
exports.fetchRefferalChatMessageAdmin = async (req, res) => {
    const { room } = req.body;
    let adminChatMessage = await RefferalChatMessage.find({ room: room })
    if (adminChatMessage) {
        return res.status(200).json({
            message: "Chat message fetched",
            adminChatMessage
        })
    } else {
        return res.status(500).json({ message: "Something went wrong" })
    }
}