const nodemailer = require("nodemailer");

const numberWithCommas = (amount) => {
  if (amount !== null) {
    return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } else {
    return "";
  }
};

// STYLES
const bodyStyles = "background-color: #fff; border: #010b27 2px solid;";
const headerStyles =
  "background-color: #010b27; padding: 2rem 1.5rem; display: flex; justify-content: center; color: #fff";
const contentStyles = "padding: 2rem 1.5rem;";
const footerStyles =
  "color: #eee; display: flex; justify-content: space-around; align-items: center; padding: 0 0 .5rem 0";
const logoStyles = "width: 30%;";
const iconStyles = "height: 25%";
const bgSecondary =
  "padding: 2rem 1.5rem; background-color: #010b27; text-align: center;";
const footerDivStyle = "flex-basis: 33%;";
const linkStyles = "text-decoration: none; color: #fff";

const footerContent = `    
<div style="${bgSecondary}">
  <div style="${footerStyles}">
    <div style="${footerDivStyle}">
      <img style="${iconStyles}" src="https://img.icons8.com/wired/64/000000/dashboard.png"/>
      <p>Simple Interface</p>
    </div>
    <div style="${footerDivStyle}">
      <img style="${iconStyles}" src="https://img.icons8.com/wired/50/000000/security-checked.png"/>
      <p>Safe & Secure</p>
    </div>
    <div style="${footerDivStyle}">
      <img style="${iconStyles}" src="https://img.icons8.com/wired/64/000000/online-support--v1.png"/>
      <p>24/7 Customer Support</p>
    </div>
  </div>

  <p style="color: white;">&copy; Global Quant Ledger 2023</p>
</div>`;

class Email {
  constructor() {
    this.host = "mail.privateemail.com";
    this.port = 465;
    this.user = "support@globalquantledger.com";
    this.pass = "paranormal4196#";
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: this.user, // generated ethereal user
        pass: this.pass, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
    });
  }

  notificationMessage() {
    return `
    <div style="${bodyStyles}">
      <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
      </div>
      <div style="${contentStyles}">
      <h2>Dear Valued Customer,</h2>
      <p>
        We hope this message finds you well. We're thrilled to announce that we have expanded our token offerings on the GlobalQuant Ledger Network to include ALGO, HBAR, QTUM, IOTA, and ADA.
      </p>
      <br>
      <p>
        These exciting additions provide you with more opportunities to diversify your ISO20022 assets and explore promising blockchain projects. To enhance the security of your holdings, we strongly recommend purchasing these tokens and backing them up on the GlobalQuant Ledger.
      </p>
      <br>
      <p>
        Taking this step will not only optimize your portfolio but also fortify your assets against potential cyber and malicious attacks. Your security is our top priority, and by utilizing the GlobalQuant Ledger, you're ensuring a robust and resilient defense against threats in the ever-evolving digital landscape.
      </p>
      <br>
      <p>
       To get started, simply log in to your GlobalQuant account, explore the new tokens, and make your purchases with confidence. Thank you for choosing GlobalQuant, where innovation meets security.
      </p>
      <br>
      <p>
        If you have any questions or require assistance, our dedicated support team is ready to help.
      </p>
      <br>
      <p>Best regards,</p>
      <p>GlobalQuant Support Team</p>
      </div>
      ${footerContent}
    </div>
    `;
  }

  registrationMessage(fullName) {
    return `
    <div style="${bodyStyles}">
      <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
      </div>
      <div style="${contentStyles}">
      <h2>Thank you for registering on Global Quant Ledger</h2>
        <p>Hello ${fullName}, thanks for registering on Global Quant Ledger, you can now sign in with your email & password</p>
        <p>Sign In Here
        <a href="http://globalquantledger.com/u/signin">Sign In</a></p>
        
        <a href="https://globalquantledger.com">globalquantledger.com</a>
        <p>Thank you</p>
      </div>
      ${footerContent}
    </div>
    `;
  }

  adminRegistrationMessage(fullName, email, id) {
    return `
    <div style="${bodyStyles}">
      <div style="${headerStyles}">
       <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
      </div>
      <div style="${contentStyles}">
      <h2>Hello Admin,</h2>
        <p>A new user just registered on Global Quant Ledger</p>
        <p>Email: ${email}</p>
        <p>FullName: ${fullName}</p>
        <p>You can view and edit user details here
        
        <a href="https://globalquantledger.com/admin/Resources/User/${id}">View User In Admin Panel</a>
        <p>Thank you</p>
      </div>
      ${footerContent}
    </div>
    `;
  }

  verificationMessage(headers, emailToken) {
    return `
      <div style="${bodyStyles}">
      <div style="${headerStyles}">
        <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
      </div>
      <div style="${contentStyles}">
        <h3>Login To Your New Account</h3>
        <p>Hello thanks for registering on Global Quant Ledger</p>
        
        <p>Please click the link to verify your email</p>
        <a href="http://${headers}/verify-email/?token=${emailToken}">Verify Account</a>
        <a href="${headers}/u/signin">Sign In</a>
        <p>Thank you</p>
      </div>
        ${footerContent}
      </div>
    `;
  }

  depositMessage(fullName, depositAmount) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <h3>Hello ${fullName}</h3>
      <p>Your deposit of ${depositAmount} is yet to be received and is subject to approval.
      Ensure to submit your transaction hash at the deposit page for validation of your deposit
      </p>
      <p>Amount: ${depositAmount}</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
    </div>
      ${footerContent}
    </div>
  `;
  }

  depositMessageAdmin(fullName, depositAmount, method, imgSrc) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <h3>Hello Admin,</h3>
      <p>${fullName} just submitted a deposit of ${depositAmount}.
      Ensure to confirm and approve the deposit</p>
      <p>Amount: ${depositAmount}</p>
      <p>Wallet: ${method}</p>
      <img src="${imgSrc}" alt="proof of payment image" width="100%" height="100%" />

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
    </div>
      ${footerContent}
    </div>
  `;
  }

  planMessage(fullName, planName, amount) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>Hello, ${fullName}</p>
      <p>Your plan susbscription is still pending, please submit your proof of payment for approval of deposit</p>
      <p>Amount: ${amount}</p>
      <p>Plan: ${planName}</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
        `;
  }

  planMessageAdmin(fullName, planName, amount) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>${fullName} just subscribed to a ${planName}</p>
      <p>Amount: ${amount}</p>
      <p>Plan: ${planName}</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
  `;
  }
  withdrawalMessage(fullName, withdrawalAmount, address, crypto) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>Dear ${fullName}</p>
      <p>You have requested to withdraw ${withdrawalAmount}</p>.
      <br>
      <p>Your withdrawal request is currently being processed.</p>
      <p>Wallet Address - ${address}</p>
      <p>Wallet - ${crypto}</p>
      <p>Your withdrawal request is currently being processed.</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
  `;
  }

  withdrawalMessageAdmin(fullName, withdrawalAmount, address, crypto) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>${fullName} has requested to withdraw ${withdrawalAmount}</p>
      <p>Do well to verify the withdrawal request</p>
      <p>Wallet Address - ${address}</p>
      <p>Wallet - ${crypto}</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
  `;
  }

  compoundingMessage(fullName, amount, method, balance) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>Dear ${fullName}</p>
      <p>You have requested to compound $${amount}</p>.
      <br>
      <p>Your withdrawal request is currently being processed.</p>
      <p>Compounded From - ${method}</p>
      <p>Your current balance - $${balance}</p>
      <p>Your compounding request has been fully processed.</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
  `;
  }

  compoundingMessageAdmin(fullName, amount, method, balance) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>${fullName} has compounded $${amount}</p>
      <p>Compounded From - ${method}</p>
      <p>Their current balance - $${balance}</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
  `;
  }

  profitReinvestedMessage(fullName, amount, plan) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>Dear ${fullName}</p>
      <p>You have reinvested $${amount}</p>.
      <br>
      <p>Plan - ${plan}</p>
      <p>Amount - $${amount}</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
  `;
  }

  profitReinvestedMessageAdmin(fullName, amount, plan) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>${fullName} has reinvested $${amount}</p>
      <p>Plan - ${plan}</p>
      <p>Amount - $${amount}</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
  `;
  }

  referralMessage(fullName, username) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>Dear ${fullName} you have a new direct signup on <a href="https://globalquantledger.com">globalquantledger.com</a></p>
      <p>Referral Username - ${username}</p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
    `;
  }

  confirmationMessage(fullName, secret) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>Verification Needed</p>
      <p>Please confirm your sign-in request</p>
      <p>Name: ${fullName}</p>
      <p>When: ${new Date()}</p>
      <p><strong>${secret}</strong></p>

      <a href="https://globalquantledger.com">https://globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
    `;
  }

  passwordResetMessage(req, token) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>You are recieving this email because you (or someone else) has requested the reset of the password to the Global Quant Ledger account connected to this email. Please click on the following link or paste it into your browser to complete the password reset. If you did not request this, please ignore this email and your password will remain unchanged</p>
      <p><a href="http://${req.headers.host}/u/reset/${token}">Reset Password</a></p>
    </div>
      ${footerContent}
    </div>
    `;
  }

  successfulResetMessage(fullName) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>Hello ${fullName}, this is a confirmation that the password for your account on <a href="https://globalquantledger.com">globalquantledger.com</a> has just been changed</p>
      <br>

      <a href="https://globalquantledger.com">globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
    `;
  }

  kycMessage(fullName) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>Hello ${fullName}</p>
      <br>
      <p>Your image file has been submitted for verification of your identity. You will be notified once this process is complete.</p>

      <a href="https://globalquantledger.com">globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
    `;
  }

  kycMessageAdmin(fullName, imgSrc) {
    return `
    <div style="${bodyStyles}">
    <div style="${headerStyles}">
      <img src='https://globalquantledger.com/images/logo.png' style="${logoStyles}"/>
    </div>
    <div style="${contentStyles}">
      <p>${fullName} just submitted an image file for verification of identity. View Below</p>
      <br>
      <img src="${imgSrc}" alt="Identity" width="100%" height="100%">

      <a href="https://globalquantledger.com">globalquantledger.com</a>
      <p>Thank you</p>
    </div>
      ${footerContent}
    </div>
    `;
  }
}

module.exports = { Email };
