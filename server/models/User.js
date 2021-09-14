const { Model, DataTypes } = require('sequelize')

class User extends Model {}

module.exports = sequelize => {
    User.init({
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, { sequelize, modelName: 'user', timestamps: false })

    return User
}