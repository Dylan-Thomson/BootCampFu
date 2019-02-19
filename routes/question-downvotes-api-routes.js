const db = require("../models");

module.exports = function(app) {
  // Requires UserId in req.body
  app.post("/api/questions/:questionId/downvotes", (req, res) => {
    hasUserVoted(
      req.body.UserId,
      req.params.questionId,
      "QuestionDownvotes"
    ).then(isDownvoted => {
      if (isDownvoted) {
        res.send(false);
      } else {
        hasUserVoted(
          req.body.UserId,
          req.params.questionId,
          "QuestionUpvotes"
        ).then(isUpvoted => {
          if (isUpvoted) {
            // remove from upvotes, update score
            db.QuestionUpvotes.destroy({
              where: {
                QuestionId: req.params.questionId,
                UserId: req.body.UserId
              }
            }).then(() => {
              db.Question.update(
                { score: db.sequelize.literal("score - 1") },
                { where: { id: req.params.questionId } }
              ).then(dbQuestion => {
                res.json(dbQuestion);
              });
            });
          } else {
            // add to downvotes, update score
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
      }
    });
  });

  app.get("/api/questions/:questionId/downvotes", (req, res) => {
    db.QuestionDownvotes.findAll({
      where: {
        QuestionId: req.params.questionId
      }
    }).then(dbQuestionDownvotes => {
      res.json(dbQuestionDownvotes);
    });
  });

  // TODO: Migrate to export file, probably in Models somewhere
  function hasUserVoted(userId, questionId, model) {
    return db[model]
      .count({
        where: { UserId: userId, QuestionId: questionId }
      })
      .then(count => {
        return count !== 0;
      });
  }
};
