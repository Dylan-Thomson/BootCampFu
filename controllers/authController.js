let authRoutes = module.exports;

authRoutes.signup = (req, res) => {
  res.render("signup", { style: "signup.css" });
};

authRoutes.signin = (req, res) => {
  res.render("signin", { style: "signin.css" });
};

authRoutes.dashboard = (req, res) => {
  res.render("dashboard");
};

authRoutes.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
