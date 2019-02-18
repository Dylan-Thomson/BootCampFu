module.exports = function(sequelize, DataTypes) {
  const Answer = sequelize.define("Answer", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  Answer.associate = models => {
    Answer.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
    Answer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};
