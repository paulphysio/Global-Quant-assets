exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("error", "Please Login First");
    res.redirect("/u/signin");
  }
};

exports.isWithdrawalActive = (req, res, next) => {
  if (req.user.withdrawalStatus === "active") {
    next();
  } else {
    req.flash("error", "This account is yet to be activated for withdrawal");
    res.redirect("back");
  }
};
