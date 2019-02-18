module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define("Question", {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    score: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  Question.associate = models => {
    Question.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Question;
};
