const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

      
const UserSchema = new mongoose.Schema ({
    unique_id:              {type: String},
    username:               {type: String, unique:true},
    fullName:               {type: String, required: true},
    email:                  {type: String, required: true, unique: true},
    dateRegistered:         {type: Date},
    password:               {type: String},
    emailToken:             {type: String},
    isVerified:             {type: Boolean, default: false},
    isNotifSent:            {type: Boolean, default: false},
    resetPasswordToken:     {type: String},
    resetPasswordExpires:   {type: Date},
    ethBalance:             {type: Number, default: 0.00},
    btcBalance:             {type: Number, default: 0.00},
    xrpBalance:             {type: Number, default: 0.00},
    xlmBalance:             {type: Number, default: 0.00},
    xdcBalance:             {type: Number, default: 0.00},

    algoBalance:             {type: Number, default: 0.00},
    miotaBalance:             {type: Number, default: 0.00},
    adaBalance:             {type: Number, default: 0.00},
    hbarBalance:             {type: Number, default: 0.00},
    qtumBalance:             {type: Number, default: 0.00},

    totalWithdrawn:         {type: Number, default: 0.00},
    country:                {type: String, required: true},
    withdrawalStatus:       {type: String, default: 'inactive', enum: ['inactive', 'active']},
    totalReferrals:         {type: Number, default: 0},
    referralBonus:          {type: Number, default: 0},
    referrer:               {type: String},
    totalDeposit:           {type: Number, default: 0.00},
    totalWithdrawn:         {type: Number, default: 0.00},
    notifications: [{
        title:              {type: String, default: 'You have a new notification'},
        description:        {type: String},
        date:               {type: Date, default: new Date()},
        status:             {type: String, default: 'pending', enum: ['pending', 'read']}
    }],
    deposits: [{
        amount:             {type: Number},
        wallet:             {type: String},
        method:             {type: String},
        date:               {type: Date},
        status:             {type: String, default: 'pending', enum: ['pending', 'approved', 'verified']}
    }],
    withdrawals: [{
        amount:             {type: Number},
        date:               {type: Date},
        wallet:             {type: String},
        address:             {type: String},
        status:             {type: String, default: 'pending', enum: ['pending', 'approved', 'verified']}
    }],
});


UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);

