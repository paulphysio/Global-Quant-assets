const async = require("async");
const User = require("../models/user");
const { Email } = require("../utils/email");
const { transporter, passwordResetMessage } = new Email();
const crypto = require("crypto");

exports.PasswordResetView = async (req, res, next) => {
  res.render("reset/forgot");
};

exports.PasswordResetLogic = (req, res, next) => {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, (err, buf) => {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
          if (!user) {
            req.flash(
              "error",
              "No registered account with that email address."
            );
            return res.redirect("back");
          }
          //update user resetPasswordToken
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; //1 hour
          user.save((err) => {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        transporter.sendMail(
          {
            from: '"Global Quant Ledger" <support@globalquantledger.com>',
            to: user.email,
            subject: "Global Quant Ledger - Password Reset Notification",
            text: "",
            html: passwordResetMessage(req, token),
          },
          (err, sent) => {
            if (err) {
              req.flash(
                "error",
                "Something went wrong. Please contact us at support@globalquantledger.com"
              );
              console.log(err);
              return res.redirect("back");
            } else {
              req.flash(
                "success",
                `An email has been sent to ${user.email} with further instructions.`
              );
              console.log("Password Reset Email Sent!");
              return res.redirect("back");
            }
          }
        );
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("back");
    }
  );
};
