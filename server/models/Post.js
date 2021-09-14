const { Model, DataTypes } = require('sequelize')

class Post extends Model {}

module.exports = sequelize => {
    Post.init({
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, { sequelize, modelName: 'post', timestamps: false })

    return Post
}