const { Email } = require("../utils/email");
const { transporter, withdrawalMessage, withdrawalMessageAdmin } = new Email();

// RENDER BALANCE WITHDRAWAL VIEW
exports.RenderBalanceWithdrawalView = (req, res, next) => {
  res.render("account/withdraw-balance");
};
// BALANCE WITHDRAWAL LOGIC
exports.BalanceWithdrawalLogic = async (req, res, next) => {
  let { address, wallet } = req.body;
  // WITHDRAWAL AMOUNT
  let amount = Number(req.body.amount);
  // USER OBJECT
  let { user } = req;
  // WITHDRAWAL
  let withdrawal = amount;
  // BALANCE
  let balance = 0;

  if (wallet === "btc") {
    balance = user.btcBalance;
  } else if (wallet === "eth") {
    balance = user.ethBalance;
  } else if (wallet === "xrp") {
    balance = user.xrpBalance;
  } else if (wallet === "xlm") {
    balance = user.xlmBalance;
  }
  try {
    // IF PROFIT IS GREATER THAN OR EQUAL TO amount
    if (balance >= withdrawal) {
      user.withdrawals.push({
        amount,
        date: new Date(),
        address,
        wallet,
        status: "pending",
      });
      // SUBSTRACT WITHDRAWAL AMOUNT + TRANSACTION FEES FROM BALANCE

      if (wallet === "btc") {
        user.btcBalance -= withdrawal;
      } else if (wallet === "eth") {
        user.ethBalance -= withdrawal;
      } else if (wallet === "xrp") {
        user.xrpBalance -= withdrawal;
      } else if (wallet === "xlm") {
        user.xlmBalance -= withdrawal;
      } else if (wallet === "xdc") {
        user.xdcBalance -= withdrawal;
      }

      // ADD WITHDRAWN AMOUNT TO TOTAL WITHDRAWN
      // user.totalWithdrawn += amount;
      // SAVE USER
      user.save();

      await transporter.sendMail(
        {
          from: '"Global Quant Assets"  <support@globalquantledger.com>',
          to: user.email,
          subject: "Global Quant Assets - Withdrawal Request Received",
          text: "",
          html: withdrawalMessage(
            user.fullName,
            `${amount} ${wallet.toUpperCase()}`,
            address,
            wallet
          ),
        },
        (err, sent) => {
          if (err) {
            console.log(
              `SOMETHING WENT WRONG WHILE TRYING TO SEND WITHDRAWAL EMAIL`
            );
            console.log(err);
          } else {
            console.log("WITHDRAWAL EMAIL SUCCESSFULLY SENT TO " + user.email);
          }
        }
      );

      await transporter.sendMail(
        {
          from: '"Global Quant Assets" <support@globalquantledger.com>',
          to: ["support@globalquantledger.com"],
          subject: "Global Quant Assets - Withdrawal Request",
          text: "",
          html: withdrawalMessageAdmin(
            user.fullName,
            `${amount} ${wallet.toUpperCase()}`,
            address,
            wallet
          ),
        },
        (err, sent) => {
          if (err) {
            console.log(
              `SOMETHING WENT WRONG WHILE TRYING TO SEND WITHDRAWAL EMAIL`
            );
            console.log(err);
          } else {
            console.log("WITHDRAWAL EMAIL SUCCESSFULLY SENT TO ADMINS");
          }
        }
      );

      req.flash("success", "Your Withdrawal request is being processed");
      return res.redirect("/account/withdrawals");
    } else {
      req.flash(
        "error",
        `You do not have enough ${wallet} balance to withdraw`
      );
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something went wrong, please try again");
    return res.redirect("back");
  }
};
exports.RenderWithdrawalsView = (req, res, next) => {
  res.render("account/withdrawals");
};
