//const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
require('./database/conn');
const path = require('path');
const cors = require('cors');


const adminLogin = require('./routes/adminLogin');
const adminLogout = require('./routes/adminLogout');
const userRegistration = require('./routes/users/userRegistration');
const userLogin = require('./routes/users/userLogin');
const userFetchDeatils = require('./routes/users/userFetchDetails');
const changePassword = require('./routes/users/changePassword');
const forgetPassword = require('./routes/users/forgetPassword');
const verifyOtp = require('./routes/users/verifyOtp');
const resetPassword = require('./routes/users/resetPassword');
const profileVerification = require('./routes/users/profileVerification');
const profilePhotoUpload = require('./routes/users/profilePhotoUpload')
const fetchUserDetailsUserside = require('./routes/users/fetch-user-details-userside');
const verifyUser = require('./routes/verify-user');
const fetchUserDetails = require('./routes/fetch-user-details');
const fetchParticularUserDetails = require('./routes/fetch-particular-user-details');
const fetchProfilePhotoUser = require('./routes/users/fetch-profile-photo-user');
const fetchUserDocumentUser = require('./routes/users/fetch-user-document-user');
const fetchUserDocumentAdmin = require('./routes/fetch-user-document-adminside');
const editUserDetails = require('./routes/users/edit-user-details');
const saveEditedUserDetails = require('./routes/users/save-user-edited-details');
const userDetailsEditAdmin = require('./routes/user-details-edit-admin');
const memberDetailsEditAdmin = require('./routes/member-details-edit-admin');
const deleteUserAdmin = require('./routes/delete-user-admin');
const blockMember = require('./routes/block-member');
const userRegistrationByAdmin = require('./routes/user-registration-by-admin');
const blockUser = require('./routes/block-user');
const userCreatePayment = require('./routes/users/user-create-payment');
const verifyPayment = require('./routes/users/verify-payment');
const notificationForAll = require('./routes/notification-for-all');
const notificationForAllTraders = require('./routes/notification-for-all-traders');
const notificationForAllRefferal = require('./routes/notification-for-all-refferal');
const notificationForParticularTrader = require('./routes/notification-for-particular-trader');
const notificationForParticularRefferal = require('./routes/notification-for-particular-refferal');
const fetchUserNotification = require('./routes/users/fetch-user-notification');

const paymentUseridVerify = require('./routes/users/payment-userid-verify');
const changeUserPaymentStatus = require('./routes/users/change-user-payment-status');
const fetchRefferalPayoutUser = require('./routes/fetch-refferal-payout-user');
const fetchRefferalPayoutMember = require('./routes/fetch-refferal-payout-member');
const userfetchRefferalPayout = require('./routes/users/user-fetch-refferal-payout');
const refferalPayoutRequestUser = require('./routes/users/refferal-payout-request-user');
const fetchRefferalPayoutWithdrawalRequest = require('./routes/fetch-refferal-payout-withdrawal-request');
const userFetchRefferalPayoutWithdrawalRequest = require('./routes/users/user-fetch-refferal-payout-withdrawal-request');
const approveUserRefferalPayout = require('./routes/approve-user-refferal-payout');
const fetchApproveRefferalPayoutUser = require('./routes/users/fetch-approve-refferal-payout-user');
const fetchUserRefferalPayoutApproveWithdrawal = require('./routes/fetch-user-refferal-payout-approve-withdrawal');
const adminFetchMemberRefferalPayoutRequest = require('./routes/admin-fetch-member-refferal-payout-request');
const approveMemberRefferalPayout = require('./routes/approve-member-refferal-payout');
const fetchMemberRefferalPayoutApproveWithdrawal = require('./routes/fetch-member-refferal-payout-approve-withdrawal');
const fetchUserChatCount = require('./routes/fetch-user-chat-count');
const fetchChatDetailsUser = require('./routes/users/fetch-chat-details-user');
const fetchChatMessageUser = require('./routes/users/fetch-chat-message-user');
const fetchChatMessageAdmin = require('./routes/fetch-chat-message-admin');
const otherCountryUserRegistration = require('./routes/users/other-country-user-registration');
const UserOnlineOrNot = require('./routes/user-online-or-not');
const AdminOnlineOrNot = require('./routes/users/admin-online-or-not');
const fetchUserNotificationStatus = require('./routes/users/fetch-user-notification-status');
const setNotificationToFalseUser = require('./routes/users/set-notification-to-false-user');
const fetchRefferalChatCount = require('./routes/fetch-refferal-chat-count');
const refferalOnlineOrNot = require('./routes/refferal-online-or-not');
const fetchRefferalChatMessageAdmin = require('./routes/fetch-refferal-chat-message-admin');
const otherCountryProfileVerification = require('./routes/users/other-country-profile-verification');
const userTotalWithdrawal = require('./routes/users/user-total-withdrawal');
const userMyTeam = require('./routes/users/user-my-team');
const userAddingWalletCreatePayment = require('./routes/users/user-adding-wallet-create-payment');
const userAddingWalletVerifyPayment = require('./routes/users/user-adding-wallet-verify-payment');
const userUpdateWalletAfterAdding = require('./routes/users/user-update-wallet-after-adding');
const updateDayCount = require('./routes/users/update-day-count');
const updateExpire = require('./routes/users/update-expire');
const addingAmountToTradingWallet = require('./routes/users/adding-amount-to-trading-wallet');
 



// refferal
const memberRegistration = require('./routes/refferal/member-registration');
const memberLogin = require('./routes/refferal/member-login');
const fetchMemberDetails = require('./routes/fetch-member-details');
const fetchParticularMemberDetails = require('./routes/fetch-particular-member-details');
const verifyMember = require('./routes/verify-member');
const memberProfileVerification = require('./routes/refferal/member-profile-verification');
const fetchMemberDocumentAdminside = require('./routes/fetch-member-document-adminside');
const fetchMemberDetailsMemberSide = require('./routes/refferal/fetch-member-details-member-side');
const memberProfilePhotoUpload = require('./routes/refferal/member-profile-photo-upload');
const fetchMemberProfilePhoto = require('./routes/refferal/fetch-member-profile-photo');
const fetchMemberDocumentMemberSide = require('./routes/refferal/fetch-member-document-member-side');
const memberChangePassword = require('./routes/refferal/member-change-password');
const memberForgetPassword = require('./routes/refferal/member-forget-password');
const memberVerifyOtp = require('./routes/refferal/member-verify-otp');
const memberResetPassword = require('./routes/refferal/member-reset-password')
const editMemberDetails = require('./routes/refferal/edit-member-details');
const saveMemberEditedDetails = require('./routes/refferal/save-member-edited-details');
const fetchRefferalNotification = require('./routes/refferal/fetch-refferal-notification');
const memberFetchRefferalPayout = require('./routes/refferal/member-fetch-refferal-payout');
const refferalPayoutRequestMember = require('./routes/refferal/refferal-payout-request-member');
const fetchMemberRefferalPayoutRequestWithdrawal = require('./routes/refferal/fetch-member-refferal-payout-request-withdrawal');
const memberFetchRefferalPayoutApproveWithdrawal = require('./routes/refferal/member-fetch-refferal-payout-approve-withdrawal');
const otherCountryMemberRegistration = require('./routes/refferal/other-country-member-registration');
const fetchMemberNotificationStatus = require('./routes/refferal/fetch-member-notification-status');
const setNotificationToFalseMember = require('./routes/refferal/set-notification-to-false-member');
const fetchChatDetailsRefferal = require('./routes/refferal/fetch-chat-details-refferal');
const fetchChatMessageRefferal = require('./routes/refferal/fetch-chat-message-refferal');
const adminOnlineOrNotRefferal = require('./routes/refferal/admin-online-or-not-refferal');
const refferalTotalWithdrawal = require('./routes/refferal/refferal-total-withdrawal');
const refferalMyTeam = require('./routes/refferal/refferal-my-team');


const videoUpload = require('./routes/adminVideo')
const getVideo = require("./routes/users/video")


 



const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(
//   cors({
//     origin:"http://trader.jettradefx.in",
//     methods:["GET","POST","PUT","DELETE"]
//   })
// );





app.use(express.static(path.join(__dirname, 'public')));
  //app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use('/admin',adminLogin);
app.use('/admin',adminLogout);
app.use('/user',userRegistration);
app.use('/user',userLogin);
app.use('/user',userFetchDeatils);
app.use('/user',changePassword);
app.use('/user',forgetPassword);
app.use('/user',verifyOtp);
app.use('/user',resetPassword);
app.use('/user',profileVerification);
app.use('/user',profilePhotoUpload);
app.use('/user',fetchUserDetailsUserside);
app.use('/admin',verifyUser);
app.use('/admin',fetchUserDetails);
app.use('/admin',fetchParticularUserDetails);
app.use('/user',fetchProfilePhotoUser);
app.use('/user',fetchUserDocumentUser);
app.use('/admin',fetchUserDocumentAdmin);
app.use('/user',editUserDetails);
app.use('/user',saveEditedUserDetails)
app.use('/admin',userDetailsEditAdmin);
app.use('/admin',memberDetailsEditAdmin);
app.use('/admin',deleteUserAdmin);
app.use('/admin',blockMember);
app.use('/admin',userRegistrationByAdmin);
app.use('/admin',blockUser);
app.use('/user',userCreatePayment);
app.use('/user',verifyPayment);
app.use('/admin',notificationForAll);
app.use('/admin',notificationForAllTraders);
app.use('/admin',notificationForAllRefferal);
app.use('/admin',notificationForParticularTrader);
app.use('/admin',notificationForParticularRefferal);
app.use('/user',fetchUserNotification);
app.use('/user',paymentUseridVerify);
app.use('/user',changeUserPaymentStatus);
app.use('/admin',fetchRefferalPayoutUser);
app.use('/admin',fetchRefferalPayoutMember)
app.use('/user',userfetchRefferalPayout);
app.use('/user',refferalPayoutRequestUser);
app.use('/admin',fetchRefferalPayoutWithdrawalRequest);
app.use('/user',userFetchRefferalPayoutWithdrawalRequest);
app.use('/admin',approveUserRefferalPayout);
app.use('/user',fetchApproveRefferalPayoutUser);
app.use('/admin',fetchUserRefferalPayoutApproveWithdrawal);
app.use('/admin',adminFetchMemberRefferalPayoutRequest);
app.use('/admin',approveMemberRefferalPayout);
app.use('/admin',fetchMemberRefferalPayoutApproveWithdrawal);
app.use('/admin',fetchUserChatCount);
app.use('/user',fetchChatDetailsUser);
app.use('/user',fetchChatMessageUser);
app.use('/admin',fetchChatMessageAdmin);
app.use('/user',otherCountryUserRegistration);
app.use('/admin',UserOnlineOrNot);
app.use('/user',AdminOnlineOrNot);
app.use('/user',fetchUserNotificationStatus);
app.use('/user',setNotificationToFalseUser);
app.use('/admin',fetchRefferalChatCount);
app.use('/admin',refferalOnlineOrNot);
app.use('/admin',fetchRefferalChatMessageAdmin);
app.use('/user',otherCountryProfileVerification);
app.use('/user',userTotalWithdrawal);
app.use('/user',userMyTeam);
app.use('/user',userAddingWalletCreatePayment);
app.use('/user',userAddingWalletVerifyPayment);
app.use('/user',userUpdateWalletAfterAdding);
app.use('/user',updateDayCount);
app.use('/user',updateExpire);
app.use('/admin', videoUpload);
app.use('/user', getVideo);
app.use('/user',addingAmountToTradingWallet);


// refferal
app.use('/member',memberRegistration);
app.use('/member',memberLogin);
app.use('/admin',fetchMemberDetails)
app.use('/admin',fetchParticularMemberDetails);
app.use('/admin',verifyMember);
app.use('/member',memberProfileVerification);
app.use('/admin',fetchMemberDocumentAdminside);
app.use('/member',fetchMemberDetailsMemberSide);
app.use('/member',memberProfilePhotoUpload);
app.use('/member',fetchMemberProfilePhoto);
app.use('/member',fetchMemberDocumentMemberSide);
app.use('/member',memberChangePassword);
app.use('/member',memberForgetPassword);
app.use('/member',memberVerifyOtp);
app.use('/member',memberResetPassword);
app.use('/member',editMemberDetails);
app.use('/member',saveMemberEditedDetails);
app.use('/member',fetchRefferalNotification)
app.use('/member',memberFetchRefferalPayout);
app.use('/member',refferalPayoutRequestMember);
app.use('/member',fetchMemberRefferalPayoutRequestWithdrawal);
app.use('/member',memberFetchRefferalPayoutApproveWithdrawal);
app.use('/member',otherCountryMemberRegistration);
app.use('/member',fetchMemberNotificationStatus);
app.use('/member',setNotificationToFalseMember);
app.use('/member',fetchChatDetailsRefferal);
app.use('/member',fetchChatMessageRefferal);
app.use('/member',adminOnlineOrNotRefferal);
app.use('/member',refferalTotalWithdrawal);
app.use('/member',refferalMyTeam);



module.exports = app;