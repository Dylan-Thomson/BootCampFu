const db = require("../models");

module.exports = function(app) {
  // Requires UserId in req.body
  app.post("/api/questions/:questionId/upvotes", (req, res) => {
    isLikedByUser(req.body.UserId, req.params.questionId).then(isLiked => {
      if (isLiked) {
        res.send(false);
      } else {
        req.body.QuestionId = req.params.questionId;
        db.QuestionUpvotes.create(req.body).then(() => {
          db.Question.update(
            { score: db.sequelize.literal("score + 1") },
            { where: { id: req.params.questionId } }
          ).then(dbQuestion => {
            res.json(dbQuestion);
          });
        });
      }
    });
  });

  app.get("/api/questions/:questionId/upvotes", (req, res) => {
    db.QuestionUpvotes.findAll({
      where: {
        QuestionId: req.params.questionId
      }
    }).then(dbQuestionUpvotes => {
      res.json(dbQuestionUpvotes);
    });
  });

  function isLikedByUser(userId, questionId) {
    return db.QuestionUpvotes.count({
      where: { UserId: userId, QuestionId: questionId }
    }).then(count => {
      return count !== 0;
    });
  }

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
