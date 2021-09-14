const sequelize = require('./db')
const fs = require('fs')

const models = {}

fs.readdirSync('./models').forEach(file => {
    if (file == 'index.js' || file == 'db.js') {
        return 
    }

    models[file.substring(0, file.length - 3)] = require('./' + file)(sequelize)
})

models.User.hasMany(models.Post)
models.Post.belongsTo(models.User)

module.exports = models