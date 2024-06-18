const Sequelize = require('sequelize')
const db = require('../db/connection')

const QuartoItens = db.define('quarto_itens', {
    item: Sequelize.TEXT
})

module.exports = QuartoItens

QuartoItens.sync({alter: true})