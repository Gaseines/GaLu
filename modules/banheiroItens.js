const Sequelize = require('sequelize')
const db = require('../db/connection')

const BanheiroItens = db.define('banheiro_itens', {
    item: Sequelize.TEXT
})

module.exports = BanheiroItens

BanheiroItens.sync({alter: true})