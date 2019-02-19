const db = require("../models");

module.exports = function(app) {
  // Requires UserId in req.body
  app.post("/api/questions/:questionId/downvotes", (req, res) => {
    isDownvotedByUser(req.body.UserId, req.params.questionId).then(isLiked => {
      if (isLiked) {
        res.send(false);
      } else {
        req.body.QuestionId = req.params.questionId;
        db.QuestionDownvotes.create(req.body).then(() => {
          db.Question.update(
            { score: db.sequelize.literal("score - 1") },
            { where: { id: req.params.questionId } }
          ).then(dbQuestion => {
            res.json(dbQuestion);
          });
        });
      }
    });
  });

  app.get("/api/questions/:questionId/upvotes", (req, res) => {
    db.QuestionDownvotes.findAll({
      where: {
        QuestionId: req.params.questionId
      }
    }).then(dbQuestionDownvotes => {
      res.json(dbQuestionDownvotes);
    });
  });

  // TODO: Migrate to export file, probably in Models somewhere
  function isDownvotedByUser(userId, questionId) {
    return db.QuestionDownvotes.count({
      where: { UserId: userId, QuestionId: questionId }
    }).then(count => {
      return count !== 0;
    });
  }
};
