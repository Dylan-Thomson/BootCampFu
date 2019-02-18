var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", (req, res) => {
    res.render("index", {
      style: "styles.css"
    });
  });

  app.get("/questions", (req, res) => {
    db.Question.findAll({
      include: db.User,
      order: [["updatedAt", "DESC"]]
    }).then(dbQuestion => {
      res.render("question-list", {
        style: "question-list.css",
        questions: dbQuestion
      });
    });
  });
};
