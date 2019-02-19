const db = require("../models");

module.exports = function(app) {
  // Requires UserId in req.body
  app.post("/api/questions/:questionId/likes", (req, res) => {
    req.body.QuestionId = req.params.questionId;
    db.QuestionLikes.create(req.body).then(() => {
      // res.json(dbQuestionLikes);
      db.Question.update(
        { score: db.sequelize.literal("score + 1") },
        { where: { id: req.params.questionId } }
      ).then(dbQuestion => {
        res.json(dbQuestion);
      });
    });
  });

  app.get("/api/questions/:questionId/likes", (req, res) => {
    db.QuestionLikes.findAll({
      where: {
        QuestionId: req.params.questionId
      }
    }).then(dbQuestionLikes => {
      res.json(dbQuestionLikes);
    });
  });

  // app.get("/api/questions", (req, res) => {
  //   db.Question.findAll({
  //     include: [db.User, db.Answer],
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
