
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const Sequelize = require('sequelize');
const db = require('./db/connection');

//Importar Modulos
const CozinhaItens = require('./modules/cozinhaItens');
const BanheiroItens = require('./modules/banheiroItens')
const QuartoItens = require('./modules/quartoItens')
const LavanderiaItens = require('./modules/lavanderiaItens')
const SalaItens = require('./modules/salaItens')

//Importar Rotas
const cozinhaRoutes = require('./routes/enxoval/cozinha')
const quartoRoutes = require('./routes/enxoval/quarto')
const banheiroRoutes = require('./routes/enxoval/banheiro')
const lavanderiaRoutes = require('./routes/enxoval/lavanderia')
const salaRoutes = require('./routes/enxoval/sala')

const bodyParser = require('body-parser');


const PORT = 7077;


// Configuração do Template Engine-------------------------------------------
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configurar para servir arquivos estáticos---------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// Autenticar conexão com banco de dados--------------------------------------
db.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados feita com sucesso!');
    }).catch(err => {
        console.log(`Ocorreu o erro ${err} ao conectar com o banco de dados!`);
    });

// Body Parser----------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota Principal-------------------------------------------------------------
app.get('/', (req, res) => {
    res.render('index');
});

// Rota enxoval e importação das listas---------------------------------------
app.get('/enxoval', (req, res) => {
    Promise.all([
        CozinhaItens.findAll({order: [['id', 'ASC']]}),
        QuartoItens.findAll({order: [['id', 'ASC']]}),
        BanheiroItens.findAll({order: [['id', 'ASC']]}),
        LavanderiaItens.findAll({order: [['id', 'ASC']]}),
        SalaItens.findAll({order: [['id', 'ASC']]})
    ])
    .then(([itensCozinha, itensQuarto, itensBanheiro, itensLavanderia, itensSala]) => {
        res.render('enxoval/enxoval', {itensCozinha, itensQuarto, itensBanheiro, itensLavanderia, itensSala})
    })
    .catch(err => {
        res.send(err)
    })
});
//Usar Rotas-----------------------------------------------------------------
app.use('/', cozinhaRoutes)
app.use('/', quartoRoutes)
app.use('/', banheiroRoutes)
app.use('/', lavanderiaRoutes)
app.use('/', salaRoutes)


// Abrindo servidor na porta 'PORT'-----------------------------------------
app.listen(PORT, (req, res) => {
    console.log(`Conectado com sucesso à porta ${PORT}`);
});
