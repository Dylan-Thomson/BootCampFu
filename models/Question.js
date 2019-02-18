module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define("Question", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
    topic: {
      type: DataTypes.ENUM(
        "HTML/CSS",
        "JavaScript",
        "Firebase",
        "Node",
        "Express",
        "React"
      ),
      allowNull: false
    }
  });

  Question.associate = models => {
    Question.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Question.hasMany(models.Answer, {
      onDelete: "cascade"
    });
  };

  return Question;
};
