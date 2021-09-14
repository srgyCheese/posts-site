const Sequelize = require('sequelize')

let sequelize = {}

sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sqlite/database.sqlite'
})

module.exports = sequelize