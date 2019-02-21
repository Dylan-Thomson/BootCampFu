const db = require("../models");

module.exports = function(app) {
  // Posts a question if user is logged in, otherwise redirect to signin page
  app.post("/api/questions", (req, res) => {
    if (req.user) {
      req.body.UserId = req.user.id;
      db.Question.create(req.body).then(() => {
        res.redirect("/");
      });
    } else {
      res.redirect("/signin");
    }
  });

  // Get all questions and send json object to client
  app.get("/api/questions", (req, res) => {
    db.Question.findAll({
      include: [db.User, db.Answer],
      order: [["createdAt", "DESC"]]
    }).then(dbQuestion => {
      res.json(dbQuestion);
    });
  });

  // Get question with specific ID, send json to client
  app.get("/api/questions/:id", (req, res) => {
    db.Question.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(dbQuestion => {
      res.json(dbQuestion);
    });
  });

  // Get questions by topic and send json to client
  app.get("/api/questions/topics/:topic", (req, res) => {
    db.Question.findAll({
      where: {
        topic: req.params.topic
      },
      include: [db.User],
      order: [["createdAt", "DESC"]]
    }).then(dbQuestion => {
      res.json(dbQuestion);
    });
  });

  // Allow user to delete their question
  app.delete("/api/questions/:id", (req, res) => {
    if (req.user) {
      db.Question.destroy({
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
      }).then(dbQuestion => {
        res.json(dbQuestion);
      });
    } else {
      res.redirect("/signin");
    }
  });
};
