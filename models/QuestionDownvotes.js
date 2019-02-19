module.exports = function(sequelize) {
  const QuestionDownvotes = sequelize.define("QuestionDownvotes");

  QuestionDownvotes.associate = models => {
    QuestionDownvotes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    QuestionDownvotes.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return QuestionDownvotes;
};
