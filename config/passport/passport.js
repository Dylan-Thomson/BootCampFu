//load bcrypt
const bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  const User = user;

  const LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",

        passwordField: "password",

        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, email, password, done) {
        const generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            const userPassword = generateHash(password);

            const data = {
              email: email,

              password: userPassword,

              username: req.body.username
            };

            User.create(data).then(function(newUser) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        const User = user;
        const isValidPassword = (userpass, password) => {
          return bCrypt.compareSync(password, userpass);
        };
        User.findOne({
          where: {
            email: email
          }
        })
          .then(user => {
            if (!user || !isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Invalid email or password"
              });
            }

            const userInfo = user.get();
            return done(null, userInfo);
          })
          .catch(err => {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with you sign in attempt."
            });
          });
      }
    )
  );
};
