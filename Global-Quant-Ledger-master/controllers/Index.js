exports.RenderHomePage = async (req, res, next) => {
  res.render("index");
};

exports.RenderComingSoonPage = async (req, res, next) => {
  res.render("coming-soon");
};
