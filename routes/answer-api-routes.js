const answerController = require("../controllers/answerController");

module.exports = function(app) {
  app.post("/api/questions/:questionId/answers", answerController.postAnswer);

  app.get("/api/questions/:questionId/answers", answerController.getAnswers);
};
