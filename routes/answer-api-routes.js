const db = require("../models");

module.exports = function(app) {
  app.post("/api/questions/:questionId/answers", (req, res) => {
    req.body.QuestionId = req.params.questionId;
    db.Answer.create(req.body).then(dbAnswer => {
      res.json(dbAnswer);
    });
  });
  app.get("/api/questions/:questionId/answers", (req, res) => {
    db.Answer.findAll({
      where: {
        QuestionId: req.params.questionId
      },
      include: [db.User, db.Question]
    }).then(dbAnswer => {
      res.json(dbAnswer);
    });
  });
};
