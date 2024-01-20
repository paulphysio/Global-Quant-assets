const express = require("express"),
  router = express.Router(),
  { isLoggedIn, isWithdrawalActive } = require("../middleware");
// CONTROLLERS
const {
  RenderWithdrawalView,
  RenderWithdrawalMethod,
  RenderProfitWithdrawalView,
  ProfitWithdrawalLogic,
  RenderReferralWithdrawalView,
  ReferralWithdrawalLogic,
  RenderBalanceWithdrawalView,
  BalanceWithdrawalLogic,
  RenderWithdrawalsView,
} = require("../controllers/Withdraw");

// BALANCE WITHDRAWAL VIEW
router.get(
  "/account/withdrawals",
  isLoggedIn,
  isWithdrawalActive,
  RenderWithdrawalsView
);
// BALANCE WITHDRAWAL VIEW
router.get(
  "/account/withdraw/",
  isLoggedIn,
  isWithdrawalActive,
  RenderBalanceWithdrawalView
);
// BALANCE WITHDRAWAL LOGIC
router.post(
  "/account/withdraw/",
  isLoggedIn,
  isWithdrawalActive,
  BalanceWithdrawalLogic
);

module.exports = router;
