const answerVoteController = require("../controllers/answerVoteController");

module.exports = function(app) {
  app.post(
    "/api/questions/:questionId/answers/:answerId/upvotes",
    answerVoteController.upvote
  );

  app.get(
    "/api/questions/:questionId/answers/:answerId/upvotes",
    answerVoteController.getUpvotes
  );

  app.post(
    "/api/questions/:questionId/answers/:answerId/downvotes",
    answerVoteController.downvote
  );

  app.get(
    "/api/questions/:questionId/answers/:answerId/downvotes",
    answerVoteController.getDownvotes
  );
};
