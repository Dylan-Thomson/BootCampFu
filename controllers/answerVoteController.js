const db = require("../models");
let answerVoteController = module.exports;

answerVoteController.upvote = (req, res) => {
  if (req.user) {
    hasUserVoted(req.user.id, req.params.answerId, "AnswerUpvotes").then(
      isUpvoted => {
        if (isUpvoted) {
          res.send(false);
        } else {
          hasUserVoted(
            req.user.id,
            req.params.answerId,
            "AnswerDownvotes"
          ).then(isDownvoted => {
            if (isDownvoted) {
              // remove from AnswerDownVotes, update score
              db.AnswerDownvotes.destroy({
                where: {
                  AnswerId: req.params.answerId,
                  UserId: req.user.id
                }
              }).then(() => {
                db.Answer.update(
                  { score: db.sequelize.literal("score + 1") },
                  { where: { id: req.params.answerId } }
                ).then(dbAnswer => {
                  res.json(dbAnswer);
                });
              });
            } else {
              // add to AnswerUpvotes, update score
              req.body.AnswerId = req.params.answerId;
              db.AnswerUpvotes.create(req.body).then(() => {
                db.Answer.update(
                  { score: db.sequelize.literal("score + 1") },
                  { where: { id: req.params.answerId } }
                ).then(dbAnswer => {
                  res.json(dbAnswer);
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

answerVoteController.getUpvotes = (req, res) => {
  db.AnswerUpvotes.findAll({
    where: {
      AnswerId: req.params.answerId
    }
  }).then(dbAnswerUpvotes => {
    res.json(dbAnswerUpvotes);
  });
};

answerVoteController.downvote = (req, res) => {
  if (req.user) {
    hasUserVoted(req.user.id, req.params.answerId, "AnswerDownvotes").then(
      isDownvoted => {
        if (isDownvoted) {
          res.send(false);
        } else {
          hasUserVoted(req.user.id, req.params.answerId, "AnswerUpvotes").then(
            isUpvoted => {
              if (isUpvoted) {
                // remove from upvotes, update score
                db.AnswerUpvotes.destroy({
                  where: {
                    AnswerId: req.params.answerId,
                    UserId: req.user.id
                  }
                }).then(() => {
                  db.Answer.update(
                    { score: db.sequelize.literal("score - 1") },
                    { where: { id: req.params.answerId } }
                  ).then(dbAnswer => {
                    res.json(dbAnswer);
                  });
                });
              } else {
                // add to downvotes, update score
                req.body.AnswerId = req.params.answerId;
                db.AnswerDownvotes.create(req.body).then(() => {
                  db.Answer.update(
                    { score: db.sequelize.literal("score - 1") },
                    { where: { id: req.params.answerId } }
                  ).then(dbAnswer => {
                    res.json(dbAnswer);
                  });
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.redirect("/signin");
  }
};

answerVoteController.getDownvotes = (req, res) => {
  db.AnswerDownvotes.findAll({
    where: {
      AnswerId: req.params.answerId
    }
  }).then(dbAnswerDownvotes => {
    res.json(dbAnswerDownvotes);
  });
};

function hasUserVoted(userId, answerId, model) {
  return db[model]
    .count({
      where: { UserId: userId, AnswerId: answerId }
    })
    .then(count => {
      return count !== 0;
    });
}
