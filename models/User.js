module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastLogin: DataTypes.DATE
  });

  User.associate = models => {
    User.hasMany(models.Question, {
      onDelete: "cascade"
    });
  };

  return User;
};
