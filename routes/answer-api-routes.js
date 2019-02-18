const db = require("../models");

module.exports = function(app) {
  /* 
  FORMAT FOR ANSWER POST REQUEST
  {
    "text": "Why can't I move this div to the left ARRRRGH",
    "UserId": 1,
    "QuestonId": 1
  }
  */
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
  // app.get("/api/questions", (req, res) => {
  //   db.Question.findAll({
  //     include: [db.User],
  //     order: [["updatedAt", "DESC"]]
  //   }).then(dbQuestion => {
  //     res.json(dbQuestion);
  //   });
  // });
  // app.get("/api/questions/:id", (req, res) => {
  //   db.Question.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.User]
  //   }).then(dbQuestion => {
  //     res.json(dbQuestion);
  //   });
  // });
  // app.get("/api/questions/:topic", (req, res) => {
  //   db.Question.findAll({
  //     where: {
  //       topic: req.params.topic
  //     },
  //     include: [db.User],
  //     order: [["updatedAt", "DESC"]]
  //   }).then(dbQuestion => {
  //     res.json(dbQuestion);
  //   });
  // });
  // app.delete("/api/questions/:id", (req, res) => {
  //   db.Question.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(dbQuestion => {
  //     res.json(dbQuestion);
  //   });
  // });
};
