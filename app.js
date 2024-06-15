const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const Sequelize = require('sequelize');
const db = require('./db/connection');
const CozinhaItens = require('./modules/cozinhaItens');
const bodyParser = require('body-parser');

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

// Autenticar conexão com banco de dados
db.authenticate()
.then(() => {
    console.log('Conexão com o banco de dados feita com sucesso!');
}).catch(err => {
    console.log(`Ocorreu o erro ${err} ao conectar com o banco de dados!`);
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota Principal
app.get('/', (req, res) => {
    res.render('index');
});

// Rota enxoval
app.get('/enxoval', (req, res) => {
    CozinhaItens.findAll({ order: [['id', 'DESC']] })
    .then((itensCozinha) => {
        res.render('enxoval/enxoval', { itensCozinha: itensCozinha });
    });
});

// Rota cadastrar
app.get('/cad/enxoval/cozinha', (req, res) => {
    res.render('enxoval/cadEnxovalCozinha');
});

// Rota add
app.post('/add/enxoval/cozinha', (req, res) => {
    CozinhaItens.create({
        item: req.body.item
    })
    .then(() => {
        res.redirect('/enxoval');
    })
    .catch(err => {
        res.send(err);
    });
});

// Rota validar edit
app.get('/validEdit/enxoval/cozinha/:id', (req, res) => {
    CozinhaItens.findByPk(req.params.id)
    .then((itensCozinha) => {
        if (itensCozinha) {
            res.render('enxoval/editEnxovalCozinha', { item: itensCozinha });
        } else {
            res.send('Item não encontrado');
        }
    });
});

// Rota edit
app.post('/edit/enxoval/cozinha/:id', (req, res) => {
    CozinhaItens.update(
        { item: req.body.item },
        { where: { id: req.params.id } }
    )
    .then(() => {
        res.redirect('/enxoval');
    })
    .catch(err => {
        res.send(err);
    });
});
