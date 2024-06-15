const Sequelize = require('sequelize')
const db = require('../db/connection')
const sequelize = require('../db/connection')

const CozinhaItens = sequelize.define('cozinha_itens', {
    item: Sequelize.TEXT
})

module.exports = CozinhaItens

CozinhaItens.sync({alter: true})

