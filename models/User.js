module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
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
      },
      {
        tableName: "users",
        timestamps: true,
      }
    );
  
    User.associate = (models) => {
      models.User.hasMany(models.Posts, {
        as: "posts",
      });
    }
  
    return User;
  };