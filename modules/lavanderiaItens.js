const Sequelize = require('sequelize')
const db = require('../db/connection')

const LavanderiaItens = db.define('lavanderia_itens', {
    item: Sequelize.TEXT
})

module.exports = LavanderiaItens

LavanderiaItens.sync({alter: true})