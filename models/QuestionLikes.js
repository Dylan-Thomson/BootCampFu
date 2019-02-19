module.exports = function(sequelize) {
  const QuestionLikes = sequelize.define("QuestionLikes");

  QuestionLikes.associate = models => {
    QuestionLikes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    QuestionLikes.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return QuestionLikes;
};
