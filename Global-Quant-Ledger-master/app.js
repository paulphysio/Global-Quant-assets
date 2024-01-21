const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const methodOverride = require("method-override");
const sanitizer = require("express-sanitizer");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dotenv = require("dotenv");
const AdminBro = require("admin-bro");
const AdminBroExpressjs = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const User = require("./models/user");
const WalletAddress = require("./models/walletAddress");
const { Email } = require("./utils/email");
const { transporter, notificationMessage } = new Email();
const cron = require("node-cron");
dotenv.config();

const AdminBroOptions = {
  resources: [User, WalletAddress],
};

let ADMIN = {
  email: "admin@globalquantledger.com",
  password: "paranormal4196#",
};

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro(AdminBroOptions);

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    } else if (email === ADMIN2.email && password === ADMIN2.password) {
      return ADMIN2;
    }
    return false;
  },
  cookieName: "admin-bro",
  cookiePassword: "session Key",
});

app.use(adminBro.options.rootPath, router);

// mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "smartgold",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 10000,
    },
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  res.locals.error = req.flash("error");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

const port = 3001 || process.env.PORT;

app.listen(port, () => {
  console.log(`> Global Quant Assets Running On Port ${port}!.....`);
});

app.use(require("./routes/account"));
app.use(require("./routes/auth"));
app.use(require("./routes/fund"));
app.use(require("./routes/forgot"));
app.use(require("./routes/index"));
app.use(require("./routes/reset"));
app.use(require("./routes/withdraw"));

const sendNotification = async () => {
  let users = await User.find({ isNotifSent: false }).limit(4); // Query only users who haven't received notifications

  // LOOP THROUGH THE USERS
  for (const user of users) {
    let { email } = user;
    try {
      await transporter.sendMail({
        from: '"GlobalQuant Ledger" <support@globalquantledger.com>',
        to: email,
        subject:
          "Subject: Exciting News: ALGO, HBAR, QTUM, IOTA, and ADA Now Available on GlobalQuant Ledger Network!",
        text: "",
        html: notificationMessage(),
      });

      console.log(`SUCCESSFULLY SENT NOTIFICATION MESSAGE TO ${email}`);
      user.isNotifSent = true;
      await user.save();
    } catch (err) {
      console.log(`ERROR WHILE SENDING NOTIFICATION MESSAGE TO ${email}`, err);
    }
  }
};

// Schedule the cron job to run every minute
const job = cron.schedule("* * * * *", async () => {
  await sendNotification();

  await stopJob();
});

// You may want to stop the job after all users are processed
const stopJob = async () => {
  let users = await User.find({ isNotifSent: false }).limit(4);
  if (users.length === 0) {
    console.log("completed sending all notification emails and stopped job...");
    job.stop();
  } else {
    return;
  }
};
