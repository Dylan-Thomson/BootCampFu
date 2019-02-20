var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", (req, res) => {
    db.Question.findAll({
      include: db.User,
      order: [["updatedAt", "DESC"]],
      limit: 3
    }).then(dbQuestion => {
      res.render("index", {
        style: "styles.css",
        recentQuestions: dbQuestion
      });
    });
  });

  app.get("/questions/:topic", (req, res) => {
    console.log(req.params.topic);
    db.Question.findAll({
      where: {
        topic: req.params.topic
      }
      // include: [db.User],
      // order: [["updatedAt", "DESC"]]
    }).then(dbQuestion => {
      console.log(dbQuestion);
      res.render("question-list", {
        style: "question-list.css",
        topic: dbQuestion
      });
    });
  });
};
