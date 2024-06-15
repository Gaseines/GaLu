const Sequelize = require('sequelize')

const sequelize = new Sequelize('listas_ga_lu', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize