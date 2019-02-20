let authRoutes = module.exports;

authRoutes.signup = (req, res) => {
  res.render("signup");
};

authRoutes.signin = (req, res) => {
  res.render("signin");
};

authRoutes.dashboard = (req, res) => {
  res.render("dashboard");
};

authRoutes.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
