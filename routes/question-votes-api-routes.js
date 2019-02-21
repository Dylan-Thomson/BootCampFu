const questionVoteController = require("../controllers/questionVoteController");

module.exports = function(app) {
  app.post("/api/questions/:questionId/upvotes", questionVoteController.upvote);

  app.get(
    "/api/questions/:questionId/upvotes",
    questionVoteController.getUpvotes
  );

  app.post(
    "/api/questions/:questionId/downvotes",
    questionVoteController.downvote
  );

  app.get(
    "/api/questions/:questionId/downvotes",
    questionVoteController.getDownvotes
  );
};
