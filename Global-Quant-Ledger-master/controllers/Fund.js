const { Email } = require("../utils/email");
const WalletAddress = require("../models/walletAddress");
const { transporter, depositMessage, depositMessageAdmin } = new Email();
const fs = require("fs");

exports.RenderFundAccountView = async (req, res, next) => {
  let wallet_addresses = await WalletAddress.find({});
  let wallets;

  if (wallet_addresses.length >= 1) {
    wallets = wallet_addresses[0].wallets;
  } else {
    wallets = [];
  }

  res.render("account/fund", { wallet_address: wallets });
};

exports.FundAccountLogic = async (req, res, next) => {
  let { amount, wallet, address, method } = req.body;

  let { user } = req;

  let imageString;

  function base64_encode(filePath) {
    imageString = fs.readFileSync(filePath, "base64");
    let image = "data:image/png;base64," + imageString;
    return image;
  }

  let proofOfPaymentFilePath;
  if (req.file !== undefined) {
    proofOfPaymentFilePath = base64_encode(req.file.path);
  } else {
    proofOfPaymentFilePath = "";
  }

  try {
    if (amount !== "" && wallet !== "" && address !== "" && method !== "") {
      // fund wallet// add new deposit to user
      user.deposits.push({
        amount,
        wallet,
        method,
        date: new Date(),
        status: "pending",
      });

      await user.save();

      transporter.sendMail(
        {
          from: '"Global Quant Assets" <support@globalquantledger.com>',
          to: user.email,
          subject: "Global Quant Assets - Deposit request submitted",
          text: "",
          html: depositMessage(
            user.fullName,
            `${amount} ${wallet.toUpperCase()}`
          ),
        },
        (err, sent) => {
          if (err) {
            console.log(err);
            req.flash("success", "Successfully submitted deposit request.");
            return res.redirect("/account/transactions");
          } else {
            console.log(
              `SUCCESSFULLY SENT DEPOSIT EMAIL FOR $${amount} to ${user.email}`
            );
            req.flash("success", "Successfully submitted deposit request.");
            return res.redirect("/account/transactions#deposits");
          }
        }
      );

      transporter.sendMail(
        {
          from: '"Global Quant Assets" <support@globalquantledger.com>',
          to: "support@globalquantledger.com",
          subject: "Global Quant Assets - Deposit request submitted",
          text: "",
          html: depositMessageAdmin(
            user.fullName,
            `${amount} ${wallet.toUpperCase()}`,
            method,
            proofOfPaymentFilePath
          ),
        },
        (err, sent) => {
          if (err) {
            console.log(err);
            req.flash("success", "Successfully submitted deposit request.");
            return res.redirect("/account/transactions");
          } else {
            console.log(
              `SUCCESSFULLY SENT DEPOSIT EMAIL FOR $${amount} to ADMIN`
            );
            req.flash("success", "Successfully submitted deposit request.");
            return res.redirect("/account/transactions#deposits");
          }
        }
      );

      return;
    }

    req.flash("error", "Please fill out the form correctly and continue");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong, please try again");
    return res.redirect("back");
  }
};
