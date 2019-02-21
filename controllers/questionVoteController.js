const db = require("../models");
let questionVoteController = module.exports;

questionVoteController.upvote = (req, res) => {
  if (req.user) {
    hasUserVoted(req.user.id, req.params.questionId, "QuestionUpvotes").then(
      isUpvoted => {
        if (isUpvoted) {
          res.send(false);
        } else {
          hasUserVoted(
            req.user.id,
            req.params.questionId,
            "QuestionDownvotes"
          ).then(isDownvoted => {
            if (isDownvoted) {
              // remove from QuestionDownVotes, update score
              db.QuestionDownvotes.destroy({
                where: {
                  QuestionId: req.params.questionId,
                  UserId: req.user.id
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
      }
    );
  } else {
    res.redirect("/signin");
  }
};

questionVoteController.getUpvotes = (req, res) => {
  db.QuestionUpvotes.findAll({
    where: {
      QuestionId: req.params.questionId
    }
  }).then(dbQuestionUpvotes => {
    res.json(dbQuestionUpvotes);
  });
};

questionVoteController.downvote = (req, res) => {
  if (req.user) {
    hasUserVoted(req.user.id, req.params.questionId, "QuestionDownvotes").then(
      isDownvoted => {
        if (isDownvoted) {
          res.send(false);
        } else {
          hasUserVoted(
            req.user.id,
            req.params.questionId,
            "QuestionUpvotes"
          ).then(isUpvoted => {
            if (isUpvoted) {
              // remove from upvotes, update score
              db.QuestionUpvotes.destroy({
                where: {
                  QuestionId: req.params.questionId,
                  UserId: req.user.id
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
      }
    );
  } else {
    res.redirect("/signin");
  }
};

questionVoteController.getDownvotes = (req, res) => {
  db.QuestionDownvotes.findAll({
    where: {
      QuestionId: req.params.questionId
    }
  }).then(dbQuestionDownvotes => {
    res.json(dbQuestionDownvotes);
  });
};

function hasUserVoted(userId, questionId, model) {
  return db[model]
    .count({
      where: { UserId: userId, QuestionId: questionId }
    })
    .then(count => {
      return count !== 0;
    });
}
