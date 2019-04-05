module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      "post",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        body: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      }
    );
  
    Post.associate = (models) => {
      Post.belongsTo(models.User, {
        as: "user",
      });
    
      Post.hasMany(models.Comment, {
        as: "comments",
      });
    }
  
    return Post;
  };