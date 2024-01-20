const User = require("../models/user");
const { Email } = require("../utils/email");
const { transporter, successfulResetMessage } = new Email();

exports.RenderResetView = async (req, res, next) => {
  let { token } = req.params;
  let user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (user) {
    return res.render("reset/reset", { token });
  }
  console.log("Couldnt find user with current password reset token");
  req.flash(
    "error",
    "Token invalid or expired. Please enter your email to request another password reset token"
  );
  return res.redirect("/u/forgot");
};

exports.ResetPasswordLogic = async (req, res, next) => {
  let { password, confirm } = req.body;
  let { token } = req.params;

  let user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  try {
    if (user) {
      if (password === confirm) {
        await user.setPassword(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        req.logIn(user, function (err) {
          if (err) {
            req.flash("error", "something went wrong!");
            res.redirect("back");
            return next(err);
          }
          req.flash("success", "Password reset successful");
          return res.redirect("/account/dashboard");
        });

        console.log(`${req.user.email} has reset their password`);

        await transporter.sendMail(
          {
            from: '"Global Quant Ledger" <support@globalquantledger.com>',
            to: req.user.email,
            subject: "Global Quant Ledger - Password Successfully Changed",
            text: "",
            html: successfulResetMessage(user.fullName),
          },
          (err, sent) => {
            if (err) {
              req.flash(
                "error",
                "You can now login with your new password. Something went wrong while trying to send successful password reset message"
              );
              console.log(
                "Something went wrong while trying to reset paswsword",
                err
              );
              return res.redirect("back");
            } else {
              console.log("Successful Password Reset Email Sent!");
            }
          }
        );
        return;
      }
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    } else {
      console.log("Couldnt find user with current password reset token");
      req.flash(
        "error",
        "Token invalid or expired. Please enter your email to request another password reset token"
      );
      return res.redirect("/u/forgot");
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while trying to reset password");
    return res.redirect("back");
  }
};
