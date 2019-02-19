const db = require("../models");

module.exports = function(app) {
  // Requires UserId in req.body
  app.post("/api/questions/:questionId/upvotes", (req, res) => {
    hasUserVoted(
      req.body.UserId,
      req.params.questionId,
      "QuestionUpvotes"
    ).then(isUpvoted => {
      if (isUpvoted) {
        res.send(false);
      } else {
        hasUserVoted(
          req.body.UserId,
          req.params.questionId,
          "QuestionDownvotes"
        ).then(isDownvoted => {
          if (isDownvoted) {
            // remove from QuestionDownVotes, update score
            db.QuestionDownvotes.destroy({
              where: {
                QuestionId: req.params.questionId,
                UserId: req.body.UserId
              }
            }).then(() => {
              db.Question.update(
                { score: db.sequelize.literal("score + 1") },
                { where: { id: req.params.questionId } }
              ).then(dbQuestion => {
                res.json(dbQuestion);
              });
            });
          } else {
            // add to QuestionUpvotes, update score
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
