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
const getOwnTraderCreditWalletTransactionDetails = require("./routes/users/get-Own-Trader-Credit-Wallet-Transaction-Details");
const createUserBankAccountHolder = require("./routes/users/create-user-bank-account-holder")
const createUserUpiHolder = require("./routes/users/create-user-upi-holder")

//admin
const adminFetchBusinessDeveloperApproveWithdrawal = require("./routes/admin-Fetch-Business-Developer-Approve-Withdrawal");
const adminFetchBusinessDeveloperPaymentWithdrawalRequest = require("./routes/admin-Fetch-Business-Developer-Payment-Withdrawal-Request");
const adminFetchParticularBusinessDeveloperDetails = require("./routes/admin-Fetch-Particular-Business-Developer-Details");
const adminFetchFranchiseApproveWithdrawal = require("./routes/admin-Fetch-Franchise-Approve-Withdrawal");
const adminFetchFranchisePaymentWithdrawalRequest = require("./routes/admin-Fetch-Franchise-Payment-Withdrawal-Request");
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
const fetchBusinessDeveloperCreditwalletTransactionDetails = require("./routes/fetch_business_Developer_Credit_wallet_Transaction_Details");
const fetchFranchiseCreditwalletTransactionDetails = require("./routes/fetch-Franchise-Credit-wallet-Transaction-Details");
const fetchStateHandlerCreditwalletTransactionDetails = require("./routes/fetch-State-Handler-Credit-wallet-Transaction-Details");
const stateOnlineOrNot = require("./routes/admin-state-online-or-not");
const fetchStateChatMessageAdmin = require("./routes/fetch-state-chat-message-admin");
const fetchStateChatCount = require("./routes/fetch-state-chat-count");
const fetchFrenchiseChatCount = require("./routes/fetch-frenchise-chat-count");
const fethcFrenchiseChatMessageAdmin = require("./routes/fetch-frenchise-chat-message-admin");
const adminFrenchiseOnlineOrNot = require("./routes/admin-frenchise-online-or-not");
const fetchBusinessChatCount = require("./routes/fetch-business-chat-count");
const fetchBusinessChatMessageAdmin = require("./routes/fetch-business-chat-message-admin");
const adminBusinessOnlineOrNot = require("./routes/admin-business-online-or-not");
const fetchAdmin = require("./routes/fetch-admin");
const fetchCityByReferralIdInFranchise = require("./routes/fetch-city-by-referralId-infranchise");
const fetchAdminCreditwalletTransactionDetails = require("./routes/fetch-admin-credit-wallet-transaction-details");
const deleteState = require("./routes/delete-State");
const deleteFranchise = require("./routes/delete-Franchise");
const deleteBusinessDeveloper = require("./routes/delete-business-developer");
const updateAdharCardStateHandler = require("./routes/update-adhar-card-state-handler");
const updatePanCardStateHandler = require("./routes/update-pan-card-state-handler");
const blockSubAdminByAdmin = require("./routes/block-subAdmin-by-Admin");

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

const getOwnMemberCreditWalletTransactionDetails = require("./routes/refferal/get-Member-Credit-Wallet-Transaction-Details");
const getOwnTradersInsideMemberCreditWalletTransactionDetails = require("./routes/refferal/get-Own-Traders-Inside-Member-Credit-Wallet-Transaction-Details");
const createMemberBankAccountHolder = require("./routes/refferal/create-member-bank-account-holder");
const createMemberUpiHolder = require("./routes/refferal/create-member-upi-holder")
const getMemberOwnBankDetails = require("./routes/refferal/get-member-own-bank-details")
const getMemberOwnUpi = require('./routes/refferal/get-member-own-upi')
const getMemberBankAndUpiDetails = require('./routes/get-member-bank-and-upi-details')
//admin
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
const getOneFranchiseDetails = require("./routes/get-one-franchise-details");
const getOneBDDetails = require("./routes/get-one-business-developer");
const getOneStateDetails = require("./routes/get-one-state-details");
const getOneMemberDetails = require("./routes/get-one-member-details");
const updateAdharcardFranchise = require("./routes/update-adhar-card-franchise");
const updatePanCardFranchise = require("./routes/update-pan-card-franchise");
const updatePanCardBusinessDeveloper = require("./routes/update-pan-card-business-developer");
const updateAdharcardBusinessDeveloper = require("./routes/update-adhar-card-business-developer");
const approvePaymentRequestOfState = require("./routes/approve-payment-requet-of-state");
const approvePaymentRequestOfFranchise = require("./routes/approve-Payment-Request-Of-Franchise");
const approvePaymentRequestOfBusinessDeveloper = require("./routes/approve-Payment-Request-Of-Business-Developer");
const adminFetchParticularStateHandlerDetails = require("./routes/admin-fetch-particular-state-handler-details");
const adminFetchStateHandlerPaymentWithdrawalRequest = require("./routes/admin-fetch-state-handler-payment-withdrawal-request");
const adminFetchStateHandlerApproveWithdrawal = require("./routes/admin-fetch-state-handler-approve-withdrawal");
const adminFetchParticularFranchiseDetails = require("./routes/admin-Fetch-Particular-Franchise-Details");
const searchRenewalUsers = require("./routes/search-renewal-users");
const searchNewUsers = require("./routes/search-new-users");
const findUsersOnTheBasisOfPaymentStatus = require("./routes/find_Users_On_The_Basis_Of_Payment_Status");
const searchRefferalPayoutByRefferUserid = require("./routes/search-refferal-payout-by-reffer-userid");
const filterCreditWalletTransactionByUserId = require("./routes/filter-Credit-Wallet-Transaction-By-UserId");
const fetchMemberCreditwalletTransactionDetails = require("./routes/fetch-Member-Credit-wallet-Transaction-Details");
const fetchUserCreditwalletTransactionDetails = require("./routes/fetch-User-Credit-wallet-Transaction-Details");
const verifyState = require("./routes/verify-State");
const verifyBusinessDeveloper = require("./routes/verify-Business-Developer");
const verifyFranchise = require("./routes/verify-Franchise");
const fetchParticularMemberDetailsUsingMemberid = require('./routes/fetch-particular-member-details-using-memberid');

//=======================State=================================================

const getFranchisesByReferralId = require("./routes/state/fetch-frenchise-in-state");

const getBusinessDevelopersInState = require("./routes/state/fetch-business-developers-in-state");

const getAllMembersInState = require("./routes/state/fetch-members-in-state");
const getAllUsersInState = require("./routes/state/fetch-users-in-state");
const blockFranchiseForState = require("./routes/state/block-franchise-for-state");
const deleteFranchiseForState = require("./routes/state/delete-franchise-for-state");

const getFranchiseForState = require("./routes/state/get-franchise-for-state");
const getBusinessDeveloperForState = require("./routes/state/get-business-developer-for-state");
const adminOnlineOrNot = require("./routes/state/admin-online-or-not");
const fetchChatMessageState = require("./routes/state/fetch-chat-message-state");
const fetchChatDetailsState = require("./routes/state/fetch-chat-details-state");
const updateStateDetails = require("./routes/state/update-state-details");
const getOwnStateDetails = require("./routes/state/get-own-state-details");
const fetchFrenchiseChatCountWithState = require("./routes/state/fetch-frenchise-chat-count-with-state");
const stateFetchFrenchChatMessage = require("./routes/state/state-fetch-french-chat-message");
const stateFrenchiseOnlineOrNot = require("./routes/state/state-frenchise-online-or-not");

const getOwnStateCreditWalletTransactionDetails = require("./routes/state/get-own-state-credit-wallet-transaction-details");
const getOwnFranchiseInsideStateCreditWalletTransactionDetails = require("./routes/state/get-own-franchise-inside-state-credit-wallet-transaction-details");
const getOwnBusinessDeveloperInsideStateCreditWalletTransactionDetails = require("./routes/state/get-Own-Business-Developer-Inside-State-Credit-Wallet-Transaction-Details");
const getOwnMemberInsideStateCreditWalletTransactionDetails = require("./routes/state/get-Own-Member-Inside-State-Credit-Wallet-Transaction-Details");
const getOwnTraderInsideStateCreditWalletTransactionDetails = require("./routes/state/get-Own-Trader-Inside-State-Credit-Wallet-Transaction-Details");
const createStatePaymentRequest = require("./routes/state/create-state-payment-request");
const createStateBankAccountHolder = require("./routes/state/create-State-Bank-Account-Holder");
const createStateUpiHolder = require("./routes/state/create-state-upi-holder");
const getStateOwnBankDetails = require("./routes/state/get-state-own-bank-details");
const getStateOwnUpi = require("./routes/state/get-state-own-upi");
const eligibleStateForWithdrawal = require("./routes/state/eligible-State-For-Withdrawal");
//======================Frenchise==============================================
const getBusinessDevelopersInFranchise = require("./routes/frenchise/fetch-bdeveloper-in-franchise");
const getMembersInFranchise = require("./routes/frenchise/fetch-members-in-franchise");
const fetchChatDetailsFrenchisee = require("./routes/frenchise/fetch-chat-details-frenchisee");
const fetchChatMessage = require("./routes/frenchise/fetch-chat-message");
const adminOnlineOrNotFrench = require("./routes/frenchise/admin-online-or-not-french");
const getUsersInFranchise = require("./routes/frenchise/fetch-user-in-franchise");
const fetchChatDetailsFrenchiseWithSHO = require("./routes/frenchise/fetch-chat-details-frechise-with-sho");
const fetchChatWithSHOMessage = require("./routes/frenchise/fetch-chat-with-SHO-message");
const SHOonlineOrNotFrench = require("./routes/frenchise/SHO-online-or-not-french");
const getOwnFranchiseDetails = require("./routes/frenchise/get-own-franchise-details");
const updateOwnFranchiseDetails = require("./routes/frenchise/update-own-franchise-details");

const frenchiseFetchBusinessChatMessage = require("./routes/frenchise/frenchise-fetch-business-chat-message");
const frenchiseBusinessOnlineOrNot = require("./routes/frenchise/frenchise-business-online-or-not");
const getBusinessChatCountWithFrenchise = require("./routes/frenchise/get-business-chat-count-with-frenchise");

const getOwnFranchiseCreditWalletTransactionDetails = require("./routes/frenchise/get-Own-Franchise-Credit-Wallet-Transaction-Details");
const getOwnBusinessDeveloperInsideFranchiseCreditWalletTransactionDetails = require("./routes/frenchise/get-Own-Business-Developer-Inside-Franchise-Credit-Wallet-Transaction-Details");
const getOwnMembersInsideFranchiseCreditWalletTransactionDetails = require("./routes/frenchise/get-Own-Members-Inside-Franchise-Credit-Wallet-Transaction-Details");
const getOwnTradersInsideFranchiseCreditWalletTransactionDetails = require("./routes/frenchise/get-own-traders-franchise-credit-wallet-transaction-details");
const createFranchisePaymentRequest = require("./routes/frenchise/create-franchise-payment-request");
const createFranchiseBankAccountHolder = require("./routes/frenchise/create-franchise-bank-account-holder");
const createFranchiseUpiHolder = require("./routes/frenchise/create-franchise-upi-holder");
const getFranchiseOwnBankDetails = require("./routes/frenchise/get-franchise-own-bank-details");
const getFranchiseOwnUpi = require("./routes/frenchise/get-Franchise-Own-Upi");
const eligibleFranchiseForWithdrawal = require("./routes/frenchise/eligible.franchise.for.withdrawal");
//=========================Business developer======================================
const getAllMembersInBusinessDeveloper = require("./routes/businessDeveloper/fetch-all-members-in-business-developer");
const blockMemberByBusinessDeveloper = require("./routes/businessDeveloper/block-member-by-business-developer");
const getOneMemberByIdByBusinessDeveloper = require("./routes/businessDeveloper/get-one-member-by-id-by-business-developer");
const getAllUsersInBusinessDeveloper = require("./routes/businessDeveloper/fetch -all-users-in-bd");
const fetchChatDetailsBusiness = require("./routes/businessDeveloper/fetch-chat-details-business");
const fetchChatMessageBusiness = require("./routes/businessDeveloper/fetch-chat-message-business");
const adminOnlineOrNotBusiness = require("./routes/businessDeveloper/admin-online-or-not-business");
const getOwnBusinessDeveloperDetails = require("./routes/businessDeveloper/get-own-business-developer-details");
const updateOwnBusinessDeveloperDetails = require("./routes/businessDeveloper/update-own-business-developer-details");
const businessDFetchChatDetailsWithFrench = require("./routes/businessDeveloper/businessD-fetch-chat-details-with-french");
const businessDFetchChatMessageWithFrench = require("./routes/businessDeveloper/businessD-fetch-chat-message-with-french");
const frenchiseOnlineOrNotForBusiness = require("./routes/businessDeveloper/Frenchise-online-or-not-for-businessD");
const getOwnBusinessDeveloperWalletTransactionDetails = require("./routes/businessDeveloper/get-Own-Business-Developer-Wallet-Transaction-Details");
const getOwnMembersInsideBusinessDeveloperCreditWalletTransactionDetails = require("./routes/businessDeveloper/get-Own-Members-Inside-Business-Developer-Credit-Wallet-Transaction-Details");
const getOwnTradersInsideBusinessDeveloperCreditWalletTransactionDetails = require("./routes/businessDeveloper/get-Own-Traders-Inside-Business-Developer-Credit-Wallet-Transaction-Details");
const createBusinessDeveloperPaymentRequest = require("./routes/businessDeveloper/create-Business-Developer-Payment-Request");
const createBusinessDeveloperBankAccountHolder = require("./routes/businessDeveloper/creat-business-developer-bank-account-holder");
const createBusinessDeveloperUpiHolder = require("./routes/businessDeveloper/create-business-developer-upi-holder");
const getBusinessDeveloperOwnBankDetails = require("./routes/businessDeveloper/get-Business-Developer-Own-Bank-Details");
const getBusinessDeveloperOwnUpi = require("./routes/businessDeveloper/get-Business-Developer-Own-Upi");
const eligibleBusinessDeveloperForWithdrawal = require("./routes/businessDeveloper/eligible-business-developer-for-withdrawal");
//==============================SubAdmin====================================
const getOwnSubAdminDetails = require("./routes/subAdmin/get-own-sub-admin-details");
const updateOwnSubAdminDetails = require("./routes/subAdmin/update-own-sub-admin-details");

//==========================Video creator===================================
const videoCreatorLogin = require("./routes/videoCreator/videoCreatorLogin");

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

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
app.use("/user", createUserBankAccountHolder)
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
app.use("/admin", stateOnlineOrNot);
app.use("/admin", fetchStateChatMessageAdmin);
app.use("/admin", fetchStateChatCount);
app.use("/admin", fetchFrenchiseChatCount);
app.use("/admin", fethcFrenchiseChatMessageAdmin);
app.use("/admin", adminFrenchiseOnlineOrNot);
app.use("/admin", getOneFranchiseDetails);

app.use("/admin", getOneBDDetails);
app.use("/admin", getOneStateDetails);
app.use("/admin", getOneMemberDetails);
app.use("/admin", updateAdharcardFranchise);
app.use("/admin", updatePanCardFranchise);
app.use("/admin", fetchBusinessChatCount);
app.use("/admin", adminBusinessOnlineOrNot);
app.use("/admin", deleteState);
app.use("/admin", deleteFranchise);
app.use("/admin", deleteBusinessDeveloper);
app.use("/admin", adminFetchFranchiseApproveWithdrawal);
app.use("/admin", adminFetchParticularBusinessDeveloperDetails);
app.use("/admin", adminFetchBusinessDeveloperPaymentWithdrawalRequest);
app.use("/admin", adminFetchBusinessDeveloperApproveWithdrawal);

app.use("/user", getOwnTraderCreditWalletTransactionDetails);
app.use("/admin", filterCreditWalletTransactionByUserId);
app.use("/admin", fetchMemberCreditwalletTransactionDetails);
app.use("/admin", fetchUserCreditwalletTransactionDetails);
app.use("/admin", updateAdharCardStateHandler);
app.use("/admin", updatePanCardStateHandler);
app.use("/user", createUserUpiHolder)
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
app.use("/member", getOwnMemberCreditWalletTransactionDetails);
app.use("/member", getOwnTradersInsideMemberCreditWalletTransactionDetails);
app.use("/member", createMemberUpiHolder)

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
app.use("/admin", fetchBusinessChatMessageAdmin);
app.use("/admin", fetchAdmin);
app.use("/admin", fetchCityByReferralIdInFranchise);
app.use("/admin", updateAdharcardBusinessDeveloper);

app.use("/admin", updatePanCardBusinessDeveloper);
app.use("/admin", fetchAdminCreditwalletTransactionDetails);
app.use("/admin", approvePaymentRequestOfState);
app.use("/admin", approvePaymentRequestOfFranchise);
app.use("/admin", approvePaymentRequestOfBusinessDeveloper);
app.use("/admin", adminFetchParticularStateHandlerDetails);
app.use("/admin", adminFetchStateHandlerPaymentWithdrawalRequest);
app.use("/admin", adminFetchStateHandlerApproveWithdrawal);
app.use("/admin", adminFetchParticularFranchiseDetails);
app.use("/admin", adminFetchFranchisePaymentWithdrawalRequest);
app.use("/admin", searchRenewalUsers);
app.use("/admin", searchNewUsers);
app.use("/admin", fetchParticularUserPaymentStatus);
app.use("/admin", findUsersOnTheBasisOfPaymentStatus);
app.use("/admin", searchRefferalPayoutByRefferUserid);
app.use("/admin", blockSubAdminByAdmin);
app.use('/admin', getMemberBankAndUpiDetails)

app.use("/admin", verifyState);
app.use("/admin", verifyBusinessDeveloper);
app.use("/admin", verifyFranchise);
app.use('/admin',fetchParticularMemberDetailsUsingMemberid);
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
app.use("/member", createMemberBankAccountHolder);
app.use("/member", getMemberOwnBankDetails)
app.use("/member", getMemberOwnUpi)

//===============================State=============================================
app.use("/state", getFranchisesByReferralId);
app.use("/state", getBusinessDevelopersInState);
app.use("/state", getAllMembersInState);
app.use("/state", getAllUsersInState);
app.use("/state", blockFranchiseForState);
app.use("/state", deleteFranchiseForState);
app.use("/state", getFranchiseForState);
app.use("/state", getBusinessDeveloperForState);
app.use("/state", adminOnlineOrNot);
app.use("/state", fetchChatMessageState);
app.use("/state", fetchChatDetailsState);
app.use("/state", updateStateDetails);
app.use("/state", getOwnStateDetails);
app.use("/state", fetchFrenchiseChatCountWithState);
app.use("/state", stateFetchFrenchChatMessage);
app.use("/state", stateFrenchiseOnlineOrNot);
app.use("/state", getOwnStateCreditWalletTransactionDetails);
app.use("/state", getOwnFranchiseInsideStateCreditWalletTransactionDetails);
app.use(
  "/state",
  getOwnBusinessDeveloperInsideStateCreditWalletTransactionDetails
);
app.use("/state", getOwnMemberInsideStateCreditWalletTransactionDetails);
app.use("/state", getOwnTraderInsideStateCreditWalletTransactionDetails);
app.use("/state", createStatePaymentRequest);
app.use("/state", createStateBankAccountHolder);
app.use("/state", createStateUpiHolder);
app.use("/state", getStateOwnBankDetails);
app.use("/state", getStateOwnUpi);
app.use("/state", eligibleStateForWithdrawal);
//============================Franchise=============================================

app.use("/franchise", getBusinessDevelopersInFranchise);
app.use("/franchise", getMembersInFranchise);
app.use("/franchise", fetchChatDetailsFrenchisee);
app.use("/franchise", fetchChatMessage);
app.use("/franchise", adminOnlineOrNotFrench);
app.use("/franchise", getUsersInFranchise);
app.use("/frenchise", fetchChatDetailsFrenchiseWithSHO);
app.use("/frenchise", fetchChatWithSHOMessage);
app.use("/frenchise", SHOonlineOrNotFrench);
app.use("/franchise", getOwnFranchiseDetails);
app.use("/franchise", updateOwnFranchiseDetails);
// app.use('/frenchise',fetchBusinessChatCountWithFrenchise);
app.use("/frenchise", frenchiseFetchBusinessChatMessage);
app.use("/frenchise", frenchiseBusinessOnlineOrNot);
app.use("/franchise", getOwnFranchiseCreditWalletTransactionDetails);
app.use(
  "/franchise",
  getOwnBusinessDeveloperInsideFranchiseCreditWalletTransactionDetails
);
app.use(
  "/franchise",
  getOwnMembersInsideFranchiseCreditWalletTransactionDetails
);
app.use("/frenchise", getBusinessChatCountWithFrenchise);
app.use(
  "/franchise",
  getOwnTradersInsideFranchiseCreditWalletTransactionDetails
);
app.use("/franchise", createFranchisePaymentRequest);
app.use("/franchise", createFranchiseBankAccountHolder);
app.use("/franchise", createFranchiseUpiHolder);
app.use("/franchise", getFranchiseOwnBankDetails);
app.use("/franchise", getFranchiseOwnUpi);
app.use("/franchise", eligibleFranchiseForWithdrawal);
//============================Business developer===========================
app.use("/businessDeveloper", getAllMembersInBusinessDeveloper);
app.use("/businessDeveloper", blockMemberByBusinessDeveloper);
app.use("/businessDeveloper", getOneMemberByIdByBusinessDeveloper);
app.use("/businessDeveloper", getAllUsersInBusinessDeveloper);
app.use("/businessDeveloper", getOwnBusinessDeveloperDetails);
app.use("/businessDeveloper", updateOwnBusinessDeveloperDetails);
app.use("/businessDeveloper", fetchChatDetailsBusiness);
app.use("/businessDeveloper", fetchChatMessageBusiness);
app.use("/businessDeveloper", adminOnlineOrNotBusiness);
app.use("/businessDeveloper", businessDFetchChatDetailsWithFrench);
app.use("/businessDeveloper", businessDFetchChatMessageWithFrench);
app.use("/businessDeveloper", frenchiseOnlineOrNotForBusiness);
app.use("/businessDeveloper", getOwnBusinessDeveloperWalletTransactionDetails);
app.use(
  "/businessDeveloper",
  getOwnMembersInsideBusinessDeveloperCreditWalletTransactionDetails
);
app.use(
  "/businessDeveloper",
  getOwnTradersInsideBusinessDeveloperCreditWalletTransactionDetails
);
app.use("/businessDeveloper", createBusinessDeveloperPaymentRequest);
app.use("/businessDeveloper", createBusinessDeveloperBankAccountHolder);
app.use("/businessDeveloper", createBusinessDeveloperUpiHolder);
app.use("/businessDeveloper", getBusinessDeveloperOwnBankDetails);
app.use("/businessDeveloper", getBusinessDeveloperOwnUpi);
app.use("/businessDeveloper", eligibleBusinessDeveloperForWithdrawal);
//=============================Sub- Admin======================================
app.use("/subAdmin", getOwnSubAdminDetails);
app.use("/subAdmin", updateOwnSubAdminDetails);

//=====================Video Creator============================
app.use("/videoCreator", videoCreatorLogin);

module.exports = app;
