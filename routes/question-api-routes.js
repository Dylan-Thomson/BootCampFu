const questionController = require("../controllers/questionController");

module.exports = function(app) {
  // Posts a question if user is logged in, otherwise redirect to signin page
  app.post("/api/questions", questionController.postQuestion);

  // Get all questions and send json object to client
  app.get("/api/questions", questionController.getAll);

  // Get question with specific ID, send json to client
  app.get("/api/questions/:id", questionController.getById);

  // Get questions by topic and send json to client
  app.get("/api/questions/topic/:topic", questionController.getByTopic);

  // Allow user to delete their question
  app.delete("/api/questions/:id", questionController.deleteQuestion);
};
