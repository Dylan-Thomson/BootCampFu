const db = require("../models");

module.exports = function(app) {
  app.post("/api/questions", (req, res) => {
    db.Question.create(req.body).then(dbQuestion => {
      res.json(dbQuestion);
    });
  });

  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then(dbUser => {
      res.json(dbUser);
    });
  });

  // // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
