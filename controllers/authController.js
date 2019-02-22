let authController = module.exports;

authController.signup = (req, res) => {
  // console.log(req.flash("error"));
  res.render("signup", { style: "signup.css", message: req.flash("error") });
};

authController.signin = (req, res) => {
  res.render("signin", { style: "signin.css", message: req.flash("error") });
};

authController.dashboard = (req, res) => {
  res.render("dashboard", { style: "dashboard.css" });
};

authController.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
