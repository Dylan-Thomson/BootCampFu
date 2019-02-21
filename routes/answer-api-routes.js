const answerController = require("../controllers/answerController");

module.exports = function(app) {
  app.post("/api/questions/:questionId/answers", answerController.postAnswer);
  // app.post("/api/questions/:questionId/answers", (req, res) => {
  //   if (req.user) {
  //     req.body.QuestionId = req.params.questionId;
  //     req.body.UserId = req.user.id;
  //     db.Answer.create(req.body).then(dbAnswer => {
  //       res.json(dbAnswer);
  //     });
  //   } else {
  //     res.redirect("/signin");
  //   }
  // });

  app.get("/api/questions/:questionId/answers", answerController.getAnswers);
  // app.get("/api/questions/:questionId/answers", (req, res) => {
  //   db.Answer.findAll({
  //     where: {
  //       QuestionId: req.params.questionId
  //     },
  //     include: [db.User, db.Question]
  //   }).then(dbAnswer => {
  //     res.json(dbAnswer);
  //   });
  // });
};
