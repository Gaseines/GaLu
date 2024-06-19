const Sequelize = require('sequelize')

const sequelize = new Sequelize('gasein11_listas_ga_lu', 'gasein11_gsn', 'gaseines2003', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize