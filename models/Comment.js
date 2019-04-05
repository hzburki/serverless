module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      "comment",
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
      }
    );
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, {
        as: "user",
      });
    
      Comment.belongsTo(models.Post, {
        as: "post",
      });
    }
  
    return Comment;
  };