//const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./database/conn");
const path = require("path");
const cors = require("cors");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const userRegistration = require("./routes/users/userRegistration");
const userLogin = require("./routes/users/userLogin");
const userFetchDeatils = require("./routes/users/userFetchDetails");
const changePassword = require("./routes/users/changePassword");
const forgetPassword = require("./routes/users/forgetPassword");
const verifyOtp = require("./routes/users/verifyOtp");
const resetPassword = require("./routes/users/resetPassword");
const profileVerification = require("./routes/users/profileVerification");
const profilePhotoUpload = require("./routes/users/profilePhotoUpload");
const fetchUserDetailsUserside = require("./routes/users/fetch-user-details-userside");
const adminLogin = require("./routes/adminLogin");
const verifyUser = require("./routes/verify-user");
const fetchUserDetails = require("./routes/fetch-user-details");
const fetchParticularUserDetails = require("./routes/fetch-particular-user-details");
const fetchProfilePhotoUser = require("./routes/users/fetch-profile-photo-user");
const fetchUserDocumentUser = require("./routes/users/fetch-user-document-user");
const fetchUserDocumentAdmin = require("./routes/fetch-user-document-adminside");
const editUserDetails = require("./routes/users/edit-user-details");
const saveEditedUserDetails = require("./routes/users/save-user-edited-details");
const userDetailsEditAdmin = require("./routes/user-details-edit-admin");
const memberDetailsEditAdmin = require("./routes/member-details-edit-admin");
const deleteUserAdmin = require("./routes/delete-user-admin");
const blockMember = require("./routes/block-member");
const userRegistrationByAdmin = require("./routes/user-registration-by-admin");
const blockUser = require("./routes/block-user");
const userCreatePayment = require("./routes/users/user-create-payment");
const verifyPayment = require("./routes/users/verify-payment");
const notificationForAll = require("./routes/notification-for-all");
const notificationForAllTraders = require("./routes/notification-for-all-traders");
const notificationForAllRefferal = require("./routes/notification-for-all-refferal");
const notificationForParticularTrader = require("./routes/notification-for-particular-trader");
const notificationForParticularRefferal = require("./routes/notification-for-particular-refferal");
const fetchUserNotification = require("./routes/users/fetch-user-notification");

const paymentUseridVerify = require("./routes/users/payment-userid-verify");
const changeUserPaymentStatus = require("./routes/users/change-user-payment-status");
const fetchRefferalPayoutUser = require("./routes/fetch-refferal-payout-user");
const fetchRefferalPayoutMember = require("./routes/fetch-refferal-payout-member");
const userfetchRefferalPayout = require("./routes/users/user-fetch-refferal-payout");
const refferalPayoutRequestUser = require("./routes/users/refferal-payout-request-user");
const fetchRefferalPayoutWithdrawalRequest = require("./routes/fetch-refferal-payout-withdrawal-request");
const userFetchRefferalPayoutWithdrawalRequest = require("./routes/users/user-fetch-refferal-payout-withdrawal-request");
const approveUserRefferalPayout = require("./routes/approve-user-refferal-payout");
const fetchApproveRefferalPayoutUser = require("./routes/users/fetch-approve-refferal-payout-user");
const fetchUserRefferalPayoutApproveWithdrawal = require("./routes/fetch-user-refferal-payout-approve-withdrawal");
const adminFetchMemberRefferalPayoutRequest = require("./routes/admin-fetch-member-refferal-payout-request");
const approveMemberRefferalPayout = require("./routes/approve-member-refferal-payout");
const fetchMemberRefferalPayoutApproveWithdrawal = require("./routes/fetch-member-refferal-payout-approve-withdrawal");
const fetchUserChatCount = require("./routes/fetch-user-chat-count");
const fetchChatDetailsUser = require("./routes/users/fetch-chat-details-user");
const fetchChatMessageUser = require("./routes/users/fetch-chat-message-user");
const fetchChatMessageAdmin = require("./routes/fetch-chat-message-admin");
const otherCountryUserRegistration = require("./routes/users/other-country-user-registration");
const UserOnlineOrNot = require("./routes/user-online-or-not");
const AdminOnlineOrNot = require("./routes/users/admin-online-or-not");
const fetchUserNotificationStatus = require("./routes/users/fetch-user-notification-status");
const setNotificationToFalseUser = require("./routes/users/set-notification-to-false-user");
const fetchRefferalChatCount = require("./routes/fetch-refferal-chat-count");
const refferalOnlineOrNot = require("./routes/refferal-online-or-not");
const fetchRefferalChatMessageAdmin = require("./routes/fetch-refferal-chat-message-admin");
const otherCountryProfileVerification = require("./routes/users/other-country-profile-verification");
const userTotalWithdrawal = require("./routes/users/user-total-withdrawal");
const userMyTeam = require("./routes/users/user-my-team");
const userAddingWalletCreatePayment = require("./routes/users/user-adding-wallet-create-payment");
const userAddingWalletVerifyPayment = require("./routes/users/user-adding-wallet-verify-payment");
const userUpdateWalletAfterAdding = require("./routes/users/user-update-wallet-after-adding");
const updateDayCount = require("./routes/users/update-day-count");
const updateExpire = require("./routes/users/update-expire");
const addingAmountToTradingWallet = require("./routes/users/adding-amount-to-trading-wallet");
const withdrawlAmountFromTradingWallet = require("./routes/users/withdrawl-Amount-From-Tranding-Wallet");
const fetchParticularUserDetailsFromAdminUsingUserid = require("./routes/fetch-particular-user-details-from-admin-using-userid");
const filterTransactionsWithYearMonthWeek = require("./routes/filter-Transactions-With-Year-Month-Week");
const userTotalWithdrawalFromTradingWallet = require("./routes/users/user-total-withdrawal-from-trading-wallet");
const adminFetchAllRenewalUser = require("./routes/admin-fetch-all-renewal-user");
const fetchAllNewPaidUser = require("./routes/fetch-all-new-paid-user");
const changePaymentStatusForRenewal = require("./routes/users/change-payment-status-for-renewal");
const adminSumOfAllNewRenewalUserAmount = require("./routes/admin-sum-of-all-new-renewal-user-amount");
const filterTransactionsForWithdrawlWithYearMonth = require("./routes/filter-Transactions-For-Withdrawl-With-Year-Month");
const tradingWalletTransferFromOneUserToAnother = require("./routes/users/trading-wallet-transfer-from-one-user-to-another");
const totalWithdrawalMoney = require("./routes/total-Withdrawal-Money");
const deleteVideo = require("./routes/delete-video");
const adminLogout = require("./routes/adminLogout");
const getVideo = require("./routes/users/fetch_one_video_details");
const getvideos = require("./routes/users/user-fetch-all-videos");
const subAdminLogin = require("./routes/sub_Admin_Login");
const interactWithVideoForAdmin = require("./routes/admin_interact_with_video");

const fetchOneVideoDetail = require("./routes/users/fetch_one_video_details");
const createSubAdminInsideAdmin = require("./routes/create-sub-admin-inside-admin");
const fetchUserOneVideoLike = require("./routes/users/fetch-User-One-Video-Like");
const fetchUserOneVideoDisLike = require("./routes/users/fetch-User-One-Video-DisLike");
const createStateHandler = require("./routes/create_State_Handler");
const createFrenchise = require("./routes/create-frenchise");

const verifyFranchieBeforeRegistration = require("./routes/verify-franchie-before-registration");
const verifyBuisnessDeveloperBeforeRegistration = require("./routes/verify-buisness-developer-before-registration");
const fetchRefferalPayoutOnRoleBasis = require("./routes/fetch-refferal-payout-on-role-basis");
const fetchBusinessDeveloperCreditwalletTransactionDetails = require("./routes/fetch_business_Developer_Credit_wallet_Transaction_Details")
const fetchFranchiseCreditwalletTransactionDetails = require("./routes/fetch-Franchise-Credit-wallet-Transaction-Details")
const fetchStateHandlerCreditwalletTransactionDetails = require("./routes/fetch-State-Handler-Credit-wallet-Transaction-Details");
const stateOnlineOrNot = require('./routes/admin-state-online-or-not');
const fetchStateChatMessageAdmin = require('./routes/fetch-state-chat-message-admin');
const fetchStateChatCount = require('./routes/fetch-state-chat-count');
const fetchFrenchiseChatCount = require('./routes/fetch-frenchise-chat-count');
const fethcFrenchiseChatMessageAdmin = require('./routes/fetch-frenchise-chat-message-admin');
const adminFrenchiseOnlineOrNot = require('./routes/admin-frenchise-online-or-not');
// refferal
const memberRegistration = require("./routes/refferal/member-registration");
const memberLogin = require("./routes/refferal/member-login");
const fetchMemberDetails = require("./routes/fetch-member-details");
const fetchParticularMemberDetails = require("./routes/fetch-particular-member-details");
const verifyMember = require("./routes/verify-member");
const memberProfileVerification = require("./routes/refferal/member-profile-verification");
const fetchMemberDocumentAdminside = require("./routes/fetch-member-document-adminside");
const fetchMemberDetailsMemberSide = require("./routes/refferal/fetch-member-details-member-side");
const memberProfilePhotoUpload = require("./routes/refferal/member-profile-photo-upload");
const fetchMemberProfilePhoto = require("./routes/refferal/fetch-member-profile-photo");
const fetchMemberDocumentMemberSide = require("./routes/refferal/fetch-member-document-member-side");
const memberChangePassword = require("./routes/refferal/member-change-password");
const memberForgetPassword = require("./routes/refferal/member-forget-password");
const memberVerifyOtp = require("./routes/refferal/member-verify-otp");
const memberResetPassword = require("./routes/refferal/member-reset-password");
const editMemberDetails = require("./routes/refferal/edit-member-details");
const saveMemberEditedDetails = require("./routes/refferal/save-member-edited-details");
const fetchRefferalNotification = require("./routes/refferal/fetch-refferal-notification");
const memberFetchRefferalPayout = require("./routes/refferal/member-fetch-refferal-payout");
const refferalPayoutRequestMember = require("./routes/refferal/refferal-payout-request-member");
const fetchMemberRefferalPayoutRequestWithdrawal = require("./routes/refferal/fetch-member-refferal-payout-request-withdrawal");
const memberFetchRefferalPayoutApproveWithdrawal = require("./routes/refferal/member-fetch-refferal-payout-approve-withdrawal");
const otherCountryMemberRegistration = require("./routes/refferal/other-country-member-registration");
const fetchMemberNotificationStatus = require("./routes/refferal/fetch-member-notification-status");
const setNotificationToFalseMember = require("./routes/refferal/set-notification-to-false-member");
const fetchChatDetailsRefferal = require("./routes/refferal/fetch-chat-details-refferal");
const fetchChatMessageRefferal = require("./routes/refferal/fetch-chat-message-refferal");
const adminOnlineOrNotRefferal = require("./routes/refferal/admin-online-or-not-refferal");
const refferalTotalWithdrawal = require("./routes/refferal/refferal-total-withdrawal");
const refferalMyTeam = require("./routes/refferal/refferal-my-team");

const videoUpload = require("./routes/adminVideo");

const withdrawlFromWalletAndTradingWallet = require("./routes/users/withdrawl-From-Wallet-And-TradingWallet");
const fetchWalletWithdrawalHistory = require("./routes/users/fetch-Wallet-Withdrawal-History");

const fetchWalletHistory = require("./routes/users/fetch-Wallet-History");
const userFetchAllVideo = require("./routes/users/user-fetch-all-videos");

const fetchParticularUserPaymentStatus = require("./routes/fetch_Particular_User_Payment_Status");

const createBusinnesDeveloper = require("./routes/create-business-developer");
const stateHandlerLogin = require("./routes/state_handler-login");
const frenchiseLogin = require("./routes/frenchise_login");
const businessDeveloperLogin = require("./routes/business-developer-login");
const fetchAllSubAdminDetails = require("./routes/fetch-all-sub-admin-details");
const fetchOnecomment = require("./routes/users/fetch_one_comment");
const interactWithVideo = require("./routes/users/interact_with_video");
const getVideos = require("./routes/get_all_video");
const findAllState = require("./routes/fetch-all-state");
const findAllFrenchise = require("./routes/fetch-all-frenchise");
const findAllBusinessDeveloper = require("./routes/fetch-all-businessDeveloper");
const totalCountOfPaymentStatusOfUser = require("./routes/total_Count_Of_Payment_Status_Of_User");
const totalCountOfPaymentStatusOfUseruser = require("./routes/users/total_Count_Of_Payment_Status_Of_User_user");
const blockStateByAdmin = require("./routes/block-state-by-admin");
const blockFranchiseByAdmin = require("./routes/block-franchise-by-admin");
const blockBusinessDeveloperByAdmin = require("./routes/block-business-developer-by-admin");
const updateFranchise = require("./routes/update-franchise");
const updateStateHandler = require("./routes/update-state-handler");
const updateBusinessDeveloper = require("./routes/update-business-developer");
const getOneFranchiseDetails = require("./routes/get-one-franchise-details")
const getOneBDDetails = require("./routes/get-one-business-developer") 
const getOneStateDetails = require("./routes/get-one-state-details")
const getOneMemberDetails = require("./routes/get-one-member-details") 
const updateAdharcardFranchise = require("./routes/update-adhar-card-franchise")
const updatePanCardFranchise = require("./routes/update-pan-card-franchise")

 
//=======================State=================================================

const getFranchisesByReferralId = require("./routes/state/fetch-frenchise-in-state");

const getBusinessDevelopersInState = require("./routes/state/fetch-business-developers-in-state");

const getAllMembersInState = require("./routes/state/fetch-members-in-state");
const getAllUsersInState = require("./routes/state/fetch-users-in-state");
const blockFranchiseForState = require("./routes/state/block-franchise-for-state");
const deleteFranchiseForState = require("./routes/state/delete-franchise-for-state");

const getFranchiseForState = require("./routes/state/get-franchise-for-state")
const getBusinessDeveloperForState = require("./routes/state/get-business-developer-for-state");
const adminOnlineOrNot = require('./routes/state/admin-online-or-not');
const fetchChatMessageState = require('./routes/state/fetch-chat-message-state');
const fetchChatDetailsState = require('./routes/state/fetch-chat-details-state');
const updateStateDetails = require("./routes/state/update-state-details")
const getOwnStateDetails = require("./routes/state/get-own-state-details")
//======================Frenchise==============================================
const getBusinessDevelopersInFranchise = require("./routes/frenchise/fetch-bdeveloper-in-franchise");
const getMembersInFranchise = require("./routes/frenchise/fetch-members-in-franchise");
const fetchChatDetailsFrenchisee = require('./routes/frenchise/fetch-chat-details-frenchisee');
const fetchChatMessage = require('./routes/frenchise/fetch-chat-message');
const adminOnlineOrNotFrench = require('./routes/frenchise/admin-online-or-not-french');
;
const getUsersInFranchise = require("./routes/frenchise/fetch-user-in-franchise");

//=========================Business developer======================================
const getAllMembersInBusinessDeveloper = require("./routes/businessDeveloper/fetch-all-members-in-business-developer");
const blockMemberByBusinessDeveloper = require("./routes/businessDeveloper/block-member-by-business-developer");
const getOneMemberByIdByBusinessDeveloper = require("./routes/businessDeveloper/get-one-member-by-id-by-business-developer");
const getAllUsersInBusinessDeveloper = require("./routes/businessDeveloper/fetch -all-users-in-bd");
const getOwnBusinessDeveloperDetails = require("./routes/businessDeveloper/get-own-business-developer-details");
const updateOwnBusinessDeveloperDetails = require("./routes/businessDeveloper/update-own-business-developer-details");
//===========================================================================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminLogin);
app.use("/admin", adminLogout);
app.use("/user", userRegistration);
app.use("/user", userLogin);
app.use("/user", userFetchDeatils);
app.use("/user", changePassword);
app.use("/user", forgetPassword);
app.use("/user", verifyOtp);
app.use("/user", resetPassword);
app.use("/user", profileVerification);
app.use("/user", profilePhotoUpload);
app.use("/user", fetchUserDetailsUserside);
app.use("/admin", verifyUser);
app.use("/admin", fetchUserDetails);
app.use("/admin", fetchParticularUserDetails);
app.use("/user", fetchProfilePhotoUser);
app.use("/user", fetchUserDocumentUser);
app.use("/admin", fetchUserDocumentAdmin);
app.use("/user", editUserDetails);
app.use("/user", saveEditedUserDetails);
app.use("/admin", userDetailsEditAdmin);
app.use("/admin", memberDetailsEditAdmin);
app.use("/admin", deleteUserAdmin);
app.use("/admin", blockMember);
app.use("/admin", userRegistrationByAdmin);
app.use("/admin", blockUser);
app.use("/user", userCreatePayment);
app.use("/user", verifyPayment);
app.use("/admin", notificationForAll);
app.use("/admin", notificationForAllTraders);
app.use("/admin", notificationForAllRefferal);
app.use("/admin", notificationForParticularTrader);
app.use("/admin", notificationForParticularRefferal);
app.use("/user", fetchUserNotification);
app.use("/user", paymentUseridVerify);
app.use("/user", changeUserPaymentStatus);
app.use("/admin", fetchRefferalPayoutUser);
app.use("/admin", fetchRefferalPayoutMember);
app.use("/user", userfetchRefferalPayout);
app.use("/user", refferalPayoutRequestUser);
app.use("/admin", fetchRefferalPayoutWithdrawalRequest);
app.use("/user", userFetchRefferalPayoutWithdrawalRequest);
app.use("/admin", approveUserRefferalPayout);
app.use("/user", fetchApproveRefferalPayoutUser);
app.use("/admin", fetchUserRefferalPayoutApproveWithdrawal);
app.use("/admin", adminFetchMemberRefferalPayoutRequest);
app.use("/admin", approveMemberRefferalPayout);
app.use("/admin", fetchMemberRefferalPayoutApproveWithdrawal);
app.use("/admin", fetchUserChatCount);
app.use("/user", fetchChatDetailsUser);
app.use("/user", fetchChatMessageUser);
app.use("/admin", fetchChatMessageAdmin);
app.use("/user", otherCountryUserRegistration);
app.use("/admin", UserOnlineOrNot);
app.use("/user", AdminOnlineOrNot);
app.use("/user", fetchUserNotificationStatus);
app.use("/user", setNotificationToFalseUser);
app.use("/admin", fetchRefferalChatCount);
app.use("/admin", refferalOnlineOrNot);
app.use("/admin", fetchRefferalChatMessageAdmin);
app.use("/user", otherCountryProfileVerification);
app.use("/user", userTotalWithdrawal);
app.use("/user", userMyTeam);
app.use("/user", userAddingWalletCreatePayment);
app.use("/user", userAddingWalletVerifyPayment);
app.use("/user", userUpdateWalletAfterAdding);
app.use("/user", updateDayCount);
app.use("/user", updateExpire);
app.use("/admin", videoUpload);
app.use("/user", getVideo);
app.use("/user", addingAmountToTradingWallet);
app.use("/user", withdrawlAmountFromTradingWallet);
app.use("/admin", fetchParticularUserDetailsFromAdminUsingUserid);
app.use("/admin", filterTransactionsWithYearMonthWeek);
app.use("/user", userTotalWithdrawalFromTradingWallet);
app.use("/admin", adminFetchAllRenewalUser);
app.use("/admin", fetchAllNewPaidUser);
app.use("/user", changePaymentStatusForRenewal);
app.use("/admin", adminSumOfAllNewRenewalUserAmount);
app.use("/admin", filterTransactionsForWithdrawlWithYearMonth);
app.use("/user", tradingWalletTransferFromOneUserToAnother);
app.use("/user", withdrawlFromWalletAndTradingWallet);
app.use("/user", fetchWalletWithdrawalHistory);
app.use("/user", fetchWalletHistory);
app.use("/admin", totalWithdrawalMoney);
app.use("/admin", deleteVideo);
app.use("/admin", getVideos);
app.use("/admin", interactWithVideoForAdmin);
app.use("/admin", fetchRefferalPayoutOnRoleBasis);
app.use("/admin", fetchBusinessDeveloperCreditwalletTransactionDetails);
app.use("/admin", fetchFranchiseCreditwalletTransactionDetails);

app.use("/admin", fetchStateHandlerCreditwalletTransactionDetails);
app.use("/admin", totalCountOfPaymentStatusOfUser);
app.use("/user", totalCountOfPaymentStatusOfUseruser);
app.use('/admin',stateOnlineOrNot);
app.use('/admin',fetchStateChatMessageAdmin);
app.use('/admin',fetchStateChatCount);
app.use('/admin',fetchFrenchiseChatCount);
app.use('/admin',fethcFrenchiseChatMessageAdmin);
app.use('/admin',adminFrenchiseOnlineOrNot);;
app.use("/admin", getOneFranchiseDetails)

app.use("/admin",getOneBDDetails )
app.use("/admin", getOneStateDetails)
app.use("/admin", getOneMemberDetails)
app.use("/admin", updateAdharcardFranchise)
app.use("/admin",updatePanCardFranchise)

// refferal
app.use("/member", memberRegistration);
app.use("/member", memberLogin);
app.use("/admin", fetchMemberDetails);
app.use("/admin", fetchParticularMemberDetails);
app.use("/admin", verifyMember);
app.use("/member", memberProfileVerification);
app.use("/admin", fetchMemberDocumentAdminside);
app.use("/member", fetchMemberDetailsMemberSide);
app.use("/member", memberProfilePhotoUpload);
app.use("/member", fetchMemberProfilePhoto);
app.use("/member", fetchMemberDocumentMemberSide);
app.use("/member", memberChangePassword);
app.use("/member", memberForgetPassword);
app.use("/member", memberVerifyOtp);
app.use("/member", memberResetPassword);
app.use("/member", editMemberDetails);
app.use("/member", saveMemberEditedDetails);
app.use("/member", fetchRefferalNotification);
app.use("/member", memberFetchRefferalPayout);
app.use("/member", refferalPayoutRequestMember);
app.use("/member", fetchMemberRefferalPayoutRequestWithdrawal);
app.use("/member", memberFetchRefferalPayoutApproveWithdrawal);
app.use("/member", otherCountryMemberRegistration);
app.use("/member", fetchMemberNotificationStatus);
app.use("/member", setNotificationToFalseMember);
app.use("/member", fetchChatDetailsRefferal);
app.use("/member", fetchChatMessageRefferal);
app.use("/member", adminOnlineOrNotRefferal);
app.use("/member", refferalTotalWithdrawal);
app.use("/member", refferalMyTeam);

app.use("/admin", getvideos);

app.use("/admin", subAdminLogin);
app.use("/user", fetchOneVideoDetail);
app.use("/admin", createSubAdminInsideAdmin);
app.use("/admin", fetchAllSubAdminDetails);
app.use("/user", fetchUserOneVideoLike);
app.use("/user", fetchUserOneVideoDisLike);
app.use("/admin", createStateHandler);
app.use("/admin", createFrenchise);
app.use("/admin", createBusinnesDeveloper);
app.use("/admin", stateHandlerLogin);
app.use("/admin", businessDeveloperLogin);
app.use("/admin", frenchiseLogin);
app.use("/user", fetchOnecomment);
app.use("/user", userFetchAllVideo);
app.use("/user", interactWithVideo);
app.use("/admin", verifyFranchieBeforeRegistration);
app.use("/admin", verifyBuisnessDeveloperBeforeRegistration);
app.use("/admin", findAllState);
app.use("/admin", findAllFrenchise);
app.use("/admin", findAllBusinessDeveloper);
app.use("/admin", blockStateByAdmin);
app.use("/admin", blockFranchiseByAdmin);
app.use("/admin", blockBusinessDeveloperByAdmin);
app.use("/admin", updateFranchise);
app.use("/admin", updateStateHandler);
app.use("/admin", updateBusinessDeveloper);
// refferalin
app.use("/member", memberLogin);
app.use("/admin", fetchMemberDetails);
app.use("/admin", fetchParticularMemberDetails);
app.use("/admin", verifyMember);
app.use("/member", memberProfileVerification);
app.use("/admin", fetchMemberDocumentAdminside);
app.use("/member", fetchMemberDetailsMemberSide);
app.use("/member", memberProfilePhotoUpload);
app.use("/member", fetchMemberProfilePhoto);
app.use("/member", fetchMemberDocumentMemberSide);
app.use("/member", memberChangePassword);
app.use("/member", memberForgetPassword);
app.use("/member", memberVerifyOtp);
app.use("/member", memberResetPassword);
app.use("/member", editMemberDetails);
app.use("/member", saveMemberEditedDetails);
app.use("/member", fetchRefferalNotification);
app.use("/member", memberFetchRefferalPayout);
app.use("/member", refferalPayoutRequestMember);
app.use("/member", fetchMemberRefferalPayoutRequestWithdrawal);
app.use("/member", memberFetchRefferalPayoutApproveWithdrawal);
app.use("/member", otherCountryMemberRegistration);
app.use("/member", fetchMemberNotificationStatus);
app.use("/member", setNotificationToFalseMember);
app.use("/member", fetchChatDetailsRefferal);
app.use("/member", fetchChatMessageRefferal);
app.use("/member", adminOnlineOrNotRefferal);
app.use("/member", refferalTotalWithdrawal);
app.use("/member", refferalMyTeam);

//===============================State=============================================
app.use("/state", getFranchisesByReferralId);
app.use("/state", getBusinessDevelopersInState);
app.use("/state", getAllMembersInState);
app.use("/state", getAllUsersInState);
app.use("/state", blockFranchiseForState);
app.use("/state", deleteFranchiseForState);
app.use("/state", getFranchiseForState);
app.use("/state", getBusinessDeveloperForState);
app.use('/state',adminOnlineOrNot);
app.use('/state',fetchChatMessageState);
app.use('/state',fetchChatDetailsState);;
app.use("/state", updateStateDetails);
app.use("/state", getOwnStateDetails);
//============================Franchise=============================================

app.use("/franchise", getBusinessDevelopersInFranchise);;
app.use("/franchise", getMembersInFranchise);
app.use('/franchise',fetchChatDetailsFrenchisee);
app.use('/franchise',fetchChatMessage);
app.use('/franchise',adminOnlineOrNotFrench);;
app.use("/franchise", getUsersInFranchise);

//============================Business developer===========================
app.use("/businessDeveloper", getAllMembersInBusinessDeveloper);
app.use("/businessDeveloper", blockMemberByBusinessDeveloper);
app.use("/businessDeveloper", getOneMemberByIdByBusinessDeveloper);
app.use("/businessDeveloper", getAllUsersInBusinessDeveloper);
app.use("/businessDeveloper", getOwnBusinessDeveloperDetails);
app.use("/businessDeveloper", updateOwnBusinessDeveloperDetails);

//=========================================================================

module.exports = app;
