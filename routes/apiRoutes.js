const db = require("../models");

module.exports = function(app) {
  /* 
  FORMAT FOR QUESTION POST REQUEST
  {
  "title": "Help me I'm lost with CSS",
  "text": "How do I move this div to the left? No matter what I do, it moves to the right...",
  "UserId": 1
  }
  */
  app.post("/api/questions", (req, res) => {
    db.Question.create(req.body).then(dbQuestion => {
      res.json(dbQuestion);
    });
  });

  /*
  FORMAT FOR USER POST REQUEST
  }
	"username": "Dylan",
	"email": "djthomson88@gmail.com",
	"password": "123456"
  }
  */
  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then(dbUser => {
      res.json(dbUser);
    });
  });
};
