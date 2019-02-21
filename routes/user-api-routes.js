const userController = require("../controllers/userController");

module.exports = function(app) {
  app.get("/api/users", userController.getUsers);

  app.get("/api/users/:id", userController.getUserById);

  app.delete("/api/users/:id", userController.deleteUser);
};
