module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      "Post",
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
      },
      {
        tableName: "users",
        paranoid: true,
        timestamps: true,
        underscored: true
      }
    );
  
    User.associate = (models) => {
      models.Post.belongsTo(models.User, {
        as: "user",
      });
    
      models.Post.hasMany(models.Comment, {
        as: "comments",
      });
    }
  
    return Post;
  };