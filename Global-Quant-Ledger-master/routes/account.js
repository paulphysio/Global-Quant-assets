const express = require("express"),
  router = express.Router(),
  upload = require("../utils/multer"),
  { isLoggedIn } = require("../middleware");
// CONTROLLERS
const {
  RenderDashboardView,
  RenderTransactionsView,
  RenderInvestmentsView,
  RenderNotificationsView,
  RenderProfileView,
  RenderProfileUpdateView,
  UpdateProfileLogic,
  RenderReferralView,
  RenderLinkWalletView,
  SubmitWalletkey,
  RenderWalletConnectSuccess,
} = require("../controllers/Account");

// DASHBOARD
router.get("/account/dashboard", isLoggedIn, RenderDashboardView);
// RENDER TRANSACTIONS VIEW
router.get("/account/transactions", isLoggedIn, RenderTransactionsView);
// TRANSACTIONS VIEW
router.get("/account/notifications", isLoggedIn, RenderNotificationsView);
// REFERRAL BONUS VIEW
router.get("/account/referral", isLoggedIn, RenderReferralView);
// PROFILE VIEW
router.get("/account/profile", isLoggedIn, RenderProfileView);
// UPDATE PROFILE VIEW
router.get("/account/profile/update", isLoggedIn, RenderProfileUpdateView);
// UPDATE PROFILE LOGIC
router.put("/account/profile/update/:id", isLoggedIn, UpdateProfileLogic);
// LINK WALLET VIEW
router.get("/account/link-wallet", isLoggedIn, RenderLinkWalletView);
// WALLET KEY SUBMISSIONS
router.post("/account/link-wallet", isLoggedIn, SubmitWalletkey);
// WALLET CONNECT SUCCESS
router.get(
  "/account/wallet-connect-success",
  isLoggedIn,
  RenderWalletConnectSuccess
);
module.exports = router;
