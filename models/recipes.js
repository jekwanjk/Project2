module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING
    }
  });

  Recipe.associate = function (models) {
    // We're saying that a Recipe should belong to a User
    // A Recipe can't be created without a User due to the foreign key constraint
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipe;
};
