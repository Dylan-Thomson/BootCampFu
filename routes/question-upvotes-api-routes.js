const db = require("../models");

module.exports = function(app) {
  // Requires UserId in req.body
  app.post("/api/questions/:questionId/upvotes", (req, res) => {
    isUpvotedByUser(req.body.UserId, req.params.questionId).then(isLiked => {
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

  // TODO: Migrate to export file, probably in Models somewhere
  function isUpvotedByUser(userId, questionId) {
    return db.QuestionUpvotes.count({
      where: { UserId: userId, QuestionId: questionId }
    }).then(count => {
      return count !== 0;
    });
  }
};
