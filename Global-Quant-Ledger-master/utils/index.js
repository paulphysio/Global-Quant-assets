const { Email } = require("../utils/email");
const { transporter, referralMessage } = new Email();
const User = require("../models/user");
exports.sendEmailAsync = async (email, template, subject, type) => {
  await transporter
    .sendMail({
      from: '"Global Quant Assets" <support@globalquantledger.com>',
      to: email,
      subject: `Global Quant Assets - ${subject}`,
      text: "",
      html: template,
    })
    .then(() => {
      console.log(`### - SUCCESSFULLY SENT ${type} TO ${email} - ###`);
    })
    .catch((err) => {
      console.log(`### - ERROR WHILE SENDING ${type} - ###`);
      console.log(err);
    });
};

exports.validateReferrer = async (newUser, referrer) => {
  if (referrer !== "") {
    let referrer$ = await User.findOne({ unique_id: referrer });

    if (referrer$) {
      console.log(`${referrer$.fullName} is valid`);
      // INCREMENT REFERRER TOTAL REFERRALS BY 1
      referrer$.totalReferrals += 1;
      // SAVE REFERRER
      referrer$.save();
      // SAVE NEW USER REFERRER AS REFERRER'S USERNAME
      newUser.referrer = referrer$.username;

      transporter.sendMail(
        {
          from: '"Global Quant Assets" <support@globalquantledger.com>',
          to: referrer$.email,
          subject: "Global Quant Assets - Referral Notification",
          text: "",
          html: referralMessage(referrer$.fullName, newUser.fullName),
        },
        (err, sent) => {
          if (err) {
            console.log(`ERROR WHILE SENDING REFERRAL NOTIFICATION MESSAGE`);
            console.log(err);
          } else {
            console.log(
              `SUCCESSFULLY SENT REFERRAL NOTIFICATION MESSAGE TO ${referrer$.email}!`
            );
          }
        }
      );
    }
    if (!referrer$) {
      console.log(`Referrer is invalid`);
      newUser.referrer = "";
    }
  }
};
