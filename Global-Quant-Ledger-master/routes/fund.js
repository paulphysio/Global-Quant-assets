const express = require("express"),
  router = express.Router(),
  upload = require("../utils/multer"),
  { isLoggedIn } = require("../middleware");
// CONTROLLERS
const {
  RenderFundAccountView,
  FundAccountLogic,
} = require("../controllers/Fund");

//RENDER FUND WALLET VIEW
router.get("/account/fund-account", isLoggedIn, RenderFundAccountView);
// FUND WALLET LOGIC
router.post(
  "/account/fund-account",
  isLoggedIn,
  upload.single("proof"),
  FundAccountLogic
);

module.exports = router;
