const db = require("../models");
let answerController = module.exports;

answerController.postAnswer = (req, res) => {
  if (req.user) {
    req.body.QuestionId = req.params.questionId;
    req.body.UserId = req.user.id;
    db.Answer.create(req.body).then(() => {
      res.redirect("/questions/" + req.params.questionId);
    });
  } else {
    res.redirect("/signin");
  }
};

answerController.getAnswers = (req, res) => {
  db.Answer.findAll({
    where: {
      QuestionId: req.params.questionId
    },
    include: [
      {
        model: db.User,
        attributes: ["username", "email"]
      },
      {
        model: db.Question
      }
    ]
  }).then(dbAnswer => {
    res.json(dbAnswer);
  });
};

answerController.getAnswerById = (req, res) => {
  db.Answer.findOne({
    where: {
      id: req.params.answerId
    },
    include: [
      {
        model: db.User,
        attributes: ["username", "email"]
      },
      {
        model: db.Question
      }
    ]
  }).then(dbAnswer => {
    res.json(dbAnswer);
  });
};
