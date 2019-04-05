module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      "Comment",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        body: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "users",
        paranoid: true,
        timestamps: true,
        underscored: true
      }
    );
  
    User.associate = (models) => {
      models.Comment.belongsTo(models.User, {
        as: "user",
      });
    
      models.Comment.belongsTo(models.Post, {
        as: "post",
      });
    }
  
    return Comment;
  };