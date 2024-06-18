const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const Sequelize = require('sequelize');
const db = require('./db/connection');

const CozinhaItens = require('./modules/cozinhaItens');
const BanheiroItens = require('./modules/banheiroItens')
const QuartoItens = require('./modules/quartoItens')

const bodyParser = require('body-parser');

const PORT = 7077;

// Configuração do Template Engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

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

// Rota enxoval-----------------------------------------------
app.get('/enxoval', (req, res) => {
    Promise.all([
        CozinhaItens.findAll({order: [['id', 'DESC']]}),
        QuartoItens.findAll({order: [['id', 'DESC']]})
    ])
    .then(([itensCozinha, itensQuarto]) => {
        res.render('enxoval/enxoval', {itensCozinha, itensQuarto})
    })
    .catch(err => {
        res.send(err)
    })
});
//-----------------------------------------------------------
//Rotas Cozinha----------------------------------------------

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

// Rota para editar um item
app.get('/edit/enxoval/cozinha/:id', (req, res) => {
    CozinhaItens.findByPk(req.params.id)
        .then(itensCozinha => {
            if (itensCozinha) {
                console.log('Item encontrado:', itensCozinha);
                res.render('enxoval/editEnxovalCozinha', { item: itensCozinha });
            } else {
                console.log('Item não encontrado');
                res.send('Item não encontrado');
            }
        })
        .catch(err => {
            console.log('Erro ao buscar o item:', err);
            res.status(500).send('Erro ao buscar o item');
        });
});

// Rota para atualizar um item
app.post('/edit/enxoval/cozinha/:id', (req, res) => {
    
    CozinhaItens.update(
        { item: req.body.item },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.redirect('/enxoval');
        })
        .catch(err => {
            console.log('Erro ao atualizar o item:', err);
            res.status(500).send('Erro ao atualizar o item');
        });
});

// Rota para deletar um item
app.post('/delete/enxoval/cozinha/:id', (req, res) => {
    CozinhaItens.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        res.redirect('/enxoval');
    })
    .catch(err => {
        res.status(500).send('Erro ao deletar o item');
    });
});
//-------------------------------------------------------------------------

//Rotas Quarto

// Rota cadastrar
app.get('/cad/enxoval/quarto', (req, res) => {
    res.render('enxoval/cadEnxovalQuarto');
});

// Rota add
app.post('/add/enxoval/quarto', (req, res) => {
    QuartoItens.create({
        item: req.body.item
    })
        .then(() => {
            res.redirect('/enxoval');
        })
        .catch(err => {
            res.send(err);
        });
});

// Rota para editar um item
app.get('/edit/enxoval/quarto/:id', (req, res) => {
    QuartoItens.findByPk(req.params.id)
        .then(itensQuarto => {
            if (itensQuarto) {
                console.log('Item encontrado:', itensQuarto);
                res.render('enxoval/editEnxovalQuarto', { item: itensQuarto });
            } else {
                console.log('Item não encontrado');
                res.send('Item não encontrado');
            }
        })
        .catch(err => {
            console.log('Erro ao buscar o item:', err);
            res.status(500).send('Erro ao buscar o item');
        });
});

// Rota para atualizar um item
app.post('/edit/enxoval/quarto/:id', (req, res) => {
    
    QuartoItens.update(
        { item: req.body.item },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.redirect('/enxoval');
        })
        .catch(err => {
            console.log('Erro ao atualizar o item:', err);
            res.status(500).send('Erro ao atualizar o item');
        });
});

// Rota para deletar um item
app.post('/delete/enxoval/quarto/:id', (req, res) => {
    QuartoItens.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        res.redirect('/enxoval');
    })
    .catch(err => {
        res.status(500).send('Erro ao deletar o item');
    });
});

// Abrindo servidor na porta 'PORT'
app.listen(PORT, (req, res) => {
    console.log(`Conectado com sucesso à porta ${PORT}`);
});
