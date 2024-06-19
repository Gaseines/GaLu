const Sequelize = require('sequelize')
const db = require('../db/connection')

const SalaItens = db.define('sala_itens', {
    item: Sequelize.TEXT
})

module.exports = SalaItens

SalaItens.sync({alter: true})