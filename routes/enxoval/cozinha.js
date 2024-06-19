const express = require('express');
const router = express.Router();
const CozinhaItens = require('../../modules/cozinhaItens');

// Rotas Cozinha
// Rota cadastrar
router.get('/cad/enxoval/cozinha', (req, res) => {
    res.render('enxoval/cozinha/cadEnxovalCozinha'); // Caminho para o template
});

// Rota add
router.post('/add/enxoval/cozinha', (req, res) => {
    CozinhaItens.create({
        item: req.body.item
    })
        .then(() => {
            res.redirect('/enxoval#cozinha');
        })
        .catch(err => {
            res.send(err);
        });
});

// Rota para editar um item
router.get('/edit/enxoval/cozinha/:id', (req, res) => {
    CozinhaItens.findByPk(req.params.id)
        .then(itensCozinha => {
            if (itensCozinha) {
                console.log('Item encontrado:', itensCozinha);
                res.render('enxoval/cozinha/editEnxovalCozinha', { item: itensCozinha });
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
router.post('/edit/enxoval/cozinha/:id', (req, res) => {
    CozinhaItens.update(
        { item: req.body.item },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.redirect('/enxoval#cozinha');
        })
        .catch(err => {
            console.log('Erro ao atualizar o item:', err);
            res.status(500).send('Erro ao atualizar o item');
        });
});

// Rota para deletar um item
router.post('/delete/enxoval/cozinha/:id', (req, res) => {
    CozinhaItens.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.redirect('/enxoval#cozinha');
        })
        .catch(err => {
            res.status(500).send('Erro ao deletar o item');
        });
});

module.exports = router;
