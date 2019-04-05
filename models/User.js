module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        gender: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      }
    );
  
    User.associate = (models) => {
      User.hasMany(models.Post, {
        as: "posts",
      });

      User.hasMany(models.Comment, {
        as: "comments",
      });
    }
  
    return User;
  };