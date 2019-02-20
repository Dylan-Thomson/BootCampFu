var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", (req, res) => {
    console.log(req.originalUrl);
    db.Question.findAll({
      include: db.User,
      order: [["createdAt", "DESC"]],
      limit: 3
    }).then(dbQuestion => {
      res.render("index", {
        style: "styles.css",
        recentQuestions: dbQuestion
      });
    });
  });

  app.get("/questions/topics/:topic", (req, res) => {
    console.log(req.originalUrl);
    db.Question.findAll({
      where: {
        topic: req.params.topic
      },
      include: [db.User],
      order: [["createdAt", "DESC"]]
    }).then(dbQuestion => {
      console.log(dbQuestion);
      res.render("question-list", {
        style: "question-list.css",
        questions: dbQuestion,
        topic: "Html"
      });
    });
  });
};

