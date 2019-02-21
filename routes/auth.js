const authController = require("../controllers/authController");

module.exports = (app, passport) => {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  app.get("/logout", authController.logout);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      // failureRedirect: "/",
      failureFlash: true
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
