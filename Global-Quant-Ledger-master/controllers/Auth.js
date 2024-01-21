const { Email } = require("../utils/email");
const { transporter, registrationMessage, adminRegistrationMessage } =
  new Email();
const User = require("../models/user");
const passport = require("passport");
const { validateReferrer } = require("../utils/index");
const { Login, generateUserSecret } = require("../utils/helpers");
const cryptoRandomString = require("crypto-random-string");
const { nanoid } = require("nanoid");

exports.RenderSignUpView = (req, res, next) => {
  let user = req.user;
  let referrer = req.query.r;

  if (user) {
    req.flash("error", `You are already logged in ${user.username}`);
    return res.redirect("/account/dashboard");
  }
  if (req.query) {
    return res.render("auth/signup", {
      referrer: referrer,
    });
  }
  return res.render("auth/signup");
};

exports.RenderSignInView = (req, res, next) => {
  let user = req.user;

  if (user) {
    req.flash("error", `You are already logged in ${user.username}`);
    return res.redirect("/account/dashboard");
  }
  return res.render("auth/signin");
};

exports.SignUpLogic = async (req, res, next) => {
  let { password, confirm, fullName, email, country, referrer } = req.body;
  let username = email.split("@")[0];
  let emailToken = cryptoRandomString(64);
  let unique_id = nanoid();

  try {
    if (password === confirm) {
      // Initialize New User Object
      let newUser = new User({
        unique_id,
        username,
        fullName,
        referrer,
        email,
        country,
        password,
        dateRegistered: new Date(),
        emailToken,
      });
      // Validate Referrer
      await validateReferrer(newUser, referrer);

      await User.register(newUser, password)
        .then(async (user) => {
          console.log("###- REGISTERED NEW USER - ###");

          // ###- SENDING ADMIN EMAIL REGISTRATION MESSAGE -###
          await transporter
            .sendMail({
              from: '"Global Quant Assets" <support@globalquantledger.com>',
              to: ["support@globalquantledger.com"],
              subject:
                "Global Quant Assets - New User Registration On Global Quant Assets",
              text: "",
              html: adminRegistrationMessage(
                newUser.fullName,
                newUser.email,
                newUser._id
              ),
            })
            .then((success) => {
              console.log(
                `SUCCESSFULLY SENT ADMIN EMAIL REGISTRATION MESSAGE TO ${user.email}!`
              );
            })
            .catch((err) => {
              console.log(`ERROR WHILE SENDING ADMIN REGISTRATION MESSAGE`);
              console.log(err);
            });

          // ###- SENDING EMAIL REGISTRATION MESSAGE -###
          await transporter
            .sendMail({
              from: '"Global Quant Assets" <support@globalquantledger.com>',
              to: user.email,
              subject:
                "Global Quant Assets - Thank you for registering on Global Quant Assets",
              text: "",
              html: registrationMessage(user.fullName),
            })
            .then((success) => {
              console.log(
                `SUCCESSFULLY SENT EMAIL REGISTRATION MESSAGE TO ${user.email}!`
              );
              req.flash(
                "success",
                "Thanks for registering, you can now login to your account"
              );
              res.redirect("/u/signin");
            })
            .catch((err) => {
              console.log(`ERROR WHILE SENDING REGISTRATION MESSAGE`);
              console.log(err);
              req.flash(
                "error",
                "something went wrong. Please contact us at support@globalquantledger.com"
              );
              res.redirect("back");
            });
        })
        .catch((err) => {
          console.log(err);
          console.log("Error");
        });
    } else {
      req.flash("error", "The two passwords do not match");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something went wrong");
    return res.redirect("back");
  }
};

exports.SignInLogic = async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      req.flash("error", "something went wrong!");
      return res.redirect("back");
    }
    if (!user) {
      req.flash("error", "The details you entered do not match our records");
      return res.redirect("back");
    }
    req.logIn(user, function (err) {
      if (err) {
        req.flash("error", "something went wrong!");
        res.redirect("back");
        return next(err);
      }
      req.flash("success", "Logged you in successfully!");
      return res.redirect("/account/dashboard");
    });
  })(req, res, next);
};

exports.VerifyOTPView = async (req, res, next) => {
  let { email } = req.query;
  return res.render("auth/verify", { email });
};

exports.VerifyOTP = async (req, res, next) => {
  // GET EMAIL, PASSWORD, VERIFICATION CODE
  let { email, otp } = req.body;
  // FIND USER WITH VERIFICATION CODE AND EMAIL
  let user = await User.findOne({ otp, email: email.toLowerCase() });
  // CHECK IF USER EXISTS
  if (user) {
    // SET OTP TO NULL
    user.otp = null;
    // SAVE USER
    await user.save();
    // LOG USER IN
    return Login(user, req, res);
  }
  // REDIRECT BACK IF USER DOES NOT EXIST
  req.flash("error", "Invalid one time password. Please request another code");
  return res.redirect("back");
};

exports.ResendOTP = async (req, res, next) => {
  // GET EMAIL, PASSWORD, VERIFICATION CODE
  let { email } = req.body;
  // FIND USER WITH VERIFICATION CODE AND EMAIL
  let user = await User.findOne({ email });
  // REGENERATE OTP
  await generateUserSecret(user);

  req.flash("success", "New One-Time password sent to your email");
  return res.redirect("back");
};

exports.LogoutLogic = async (req, res, next) => {
  req.logout();
  req.flash("success", "Logged you out");
  return res.redirect("/");
};
