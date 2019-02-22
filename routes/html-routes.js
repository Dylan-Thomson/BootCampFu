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
    db.Question.findAll({
      where: {
        topic: req.params.topic
      },
      include: [db.User],
      order: [["createdAt", "DESC"]]
    }).then(dbQuestion => {
      res.render("question-list", {
        style: "question-list.css",
        questions: dbQuestion,
        topic: req.params.topic
      });
    });
  });

  app.get("/questions/:id", (req, res) => {
    db.Question.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User, db.Answer]
    }).then(dbQuestion => {
      console.log(dbQuestion);
      db.Answer.findAll({
        where: { QuestionId: req.params.id },
        include: [db.User]
      }).then(dbAnswers => {
        res.render("question", {
          style: "question.css",
          question: dbQuestion,
          answers: dbAnswers
        });
      });
    });
  });
};
