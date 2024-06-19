const express = require('express')
const router = express.Router()
const SalaItens = require('../../modules/salaItens')


//Rotas Sala
// Rota cadastrar
router.get('/cad/enxoval/sala', (req, res) => {
    res.render('enxoval/sala/cadEnxovalSala');
});

// Rota add
router.post('/add/enxoval/sala', (req, res) => {
    SalaItens.create({
        item: req.body.item
    })
        .then(() => {
            res.redirect('/enxoval#sala');
        })
        .catch(err => {
            res.send(err);
        });
});

// Rota para editar um item
router.get('/edit/enxoval/sala/:id', (req, res) => {
    SalaItens.findByPk(req.params.id)
        .then(itensSala => {
            if (itensSala) {
                console.log('Item encontrado:', itensSala);
                res.render('enxoval/sala/editEnxovalSala', { item: itensSala });
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
router.post('/edit/enxoval/sala/:id', (req, res) => {
    
    SalaItens.update(
        { item: req.body.item },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.redirect('/enxoval#sala');
        })
        .catch(err => {
            console.log('Erro ao atualizar o item:', err);
            res.status(500).send('Erro ao atualizar o item');
        });
});

// Rota para deletar um item
router.post('/delete/enxoval/sala/:id', (req, res) => {
    SalaItens.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        res.redirect('/enxoval#sala');
    })
    .catch(err => {
        res.status(500).send('Erro ao deletar o item');
    });
});
//-------------------------------------------------------

module.exports = router