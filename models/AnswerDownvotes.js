module.exports = function(sequelize) {
  const AnswerDownvotes = sequelize.define("AnswerDownvotes");

  AnswerDownvotes.associate = models => {
    AnswerDownvotes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    AnswerDownvotes.belongsTo(models.Answer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return AnswerDownvotes;
};
