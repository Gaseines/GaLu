const express    = require('express');
const app        = express();
const handlebars = require('express-handlebars');
const path       = require('path');
const Sequelize  = require('sequelize')
const db         = require('./db/connection')

const PORT = 7077;

// Abrindo servidor na porta 'PORT'
app.listen(PORT, (req, res) => {
    console.log(`Conectado com sucesso à porta ${PORT}`);
});

// Configuração do Template Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Configurar para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Autenticar conexão com banco de dados
db
.authenticate()
.then(() => {
    console.log('Conexão com o banco de dados feita com sucesso!')
}).catch(err => {
    console.log(`Ocorreu o erro ${err} ao conectar com o banco de dados!`)
})

// Rota Principal
app.get('/', (req, res) => {
    res.render('index');
});

//Rota enxoval
app.get('/enxoval', (req, res) => {
    res.render('enxoval')
})

