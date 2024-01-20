const express = require("express");
const router = express.Router();
// CONTROLLERS
const {
  PasswordResetView,
  PasswordResetLogic,
} = require("../controllers/ForgotPassword");

// RENDER FORGOT PASSWORD VIEW
router.get("/u/forgot", PasswordResetView);

// FORGOT PASSWORD POST HANDLER
router.post("/u/forgot", PasswordResetLogic);

module.exports = router;
