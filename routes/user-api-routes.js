const db = require("../models");

module.exports = function(app) {
  /*
  FORMAT FOR USER POST REQUEST
  }
    "username": "Dylan",
    "email": "djthomson88@gmail.com",
    "password": "123456"
  }
  */
  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then(dbUser => {
      res.json(dbUser);
    });
  });

  app.get("/api/users", (req, res) => {
    db.User.findAll({
      include: [db.Question]
    }).then(dbUser => {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Question]
    }).then(dbUser => {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbUser => {
      res.json(dbUser);
    });
  });
};
