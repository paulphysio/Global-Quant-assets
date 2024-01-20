const otpGenerator = require("otp-generator");
const { otpOptions, otpLength } = require("./constants");
const { Email } = require("../utils/email");
const { transporter, confirmationMessage } = new Email();

exports.Login = (user, req, res) => {
  req.logIn(user, function (err) {
    if (err) {
      req.flash("error", "something went wrong!");
      res.redirect("back");
      return next(err);
    }
    req.flash("success", "Successfully logged you in");
    return res.redirect("/account/dashboard");
  });
};

exports.generateUserSecret = async (user) => {
  let { fullName, email } = user;
  const secret = otpGenerator.generate(otpLength, otpOptions);
  user.otp = secret;
  user.save();
  console.log(user.otp);

  await transporter.sendMail(
    {
      from: '"Global Quant Ledger" <support@globalquantledger.com>',
      to: email,
      subject: "Global Quant Ledger - Your confirmation code",
      text: "",
      html: confirmationMessage(fullName, secret),
    },
    (err, sent) => {
      if (err) {
        console.log(`ERROR WHILE SENDING OTP MESSAGE`);
        console.log(err);
      } else {
        console.log(`SUCCESSFULLY SENT OTP MESSAGE TO ${email}!`);
      }
    }
  );

  return secret;
};
