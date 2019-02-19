module.exports = function(sequelize) {
  const QuestionUpvotes = sequelize.define("QuestionUpvotes");

  QuestionUpvotes.associate = models => {
    QuestionUpvotes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    QuestionUpvotes.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return QuestionUpvotes;
};
