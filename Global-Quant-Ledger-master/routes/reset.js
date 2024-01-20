const express = require("express");
const router = express.Router();
// CONTROLLERS
const {
  RenderResetView,
  ResetPasswordLogic,
} = require("../controllers/ResetPassword");

// RENDER RESET PASSWORD VIEW
router.get("/u/reset/:token", RenderResetView);

// RESET PASSWORD POST HANDLER
router.post("/u/reset/:token", ResetPasswordLogic);

module.exports = router;
