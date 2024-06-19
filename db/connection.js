const Sequelize = require('sequelize')

// const sequelize = new Sequelize('gasein11_listas_ga_lu', 'gasein11_gsn', 'gaseines2003', {
//     dialect: 'mysql',
//     host: 'localhost'
// })

 const sequelize = new 
 Sequelize(process.env.DATABASE_URL, {
     dialect: 'postgres',
     protocol: 'postgres',
     logging: false
    
 })

module.exports = sequelize