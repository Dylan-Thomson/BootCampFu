module.exports = function(sequelize) {
  const AnswerUpvotes = sequelize.define("AnswerUpvotes");

  AnswerUpvotes.associate = models => {
    AnswerUpvotes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    AnswerUpvotes.belongsTo(models.Answer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return AnswerUpvotes;
};
