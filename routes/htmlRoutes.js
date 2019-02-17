var db = require("../models");

module.exports = function(app) {
  db.findAll();
  // Load index page
  app.get("/", (req, res) => {
    res.render("index", {
      style: "styles.css"
    });
  });

  app.get("/questions", (req, res) => {
    res.render("question-list", {
      style: "question-list.css"
    });
  });
};
