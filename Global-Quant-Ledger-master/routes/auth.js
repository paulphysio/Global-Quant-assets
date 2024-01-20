const express = require("express"),
  router = express.Router();

const {
  RenderSignUpView,
  RenderSignInView,
  SignUpLogic,
  SignInLogic,
  LogoutLogic,
  VerifyOTPView,
  VerifyOTP,
  ResendOTP
} = require("../controllers/Auth");
const { isLoggedIn } = require("../middleware");

router.get("/u/signup", RenderSignUpView);

router.get("/u/signin", RenderSignInView);

router.post("/u/signup", SignUpLogic);

router.post("/u/signin", SignInLogic);

router.get('/u/signin/verify', VerifyOTPView);

router.post('/u/signin/verify', VerifyOTP);

router.post('/u/signin/resend-otp', ResendOTP);

router.get("/logout", isLoggedIn, LogoutLogic);

module.exports = router;
