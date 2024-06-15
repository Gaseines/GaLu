const Sequelize = require('sequelize')
const db = require('../db/connection')
const sequelize = require('../db/connection')

const ListaEnxoval = sequelize.define('lista_enxoval', {
    item: Sequelize.TEXT
})

ListaEnxoval.sync({alter: true})

