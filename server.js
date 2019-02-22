require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(flash());

// Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUnitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/question-api-routes")(app);
require("./routes/user-api-routes")(app);
require("./routes/answer-api-routes")(app);
require("./routes/question-votes-api-routes")(app);
require("./routes/answer-votes-api-routes")(app);
require("./routes/html-routes")(app);
require("./routes/auth")(app, passport);

const models = require("./models");
require("./config/passport/passport")(passport, models.User);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
