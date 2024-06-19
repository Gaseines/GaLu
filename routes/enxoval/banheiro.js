const express = require('express');
const router = express.Router();
const BanheiroItens = require('../../modules/banheiroItens');

//Rotas Banheiro
// Rota cadastrar
router.get('/cad/enxoval/banheiro', (req, res) => {
    res.render('enxoval/banheiro/cadEnxovalBanheiro');
});

// Rota add
router.post('/add/enxoval/banheiro', (req, res) => {
    BanheiroItens.create({
        item: req.body.item
    })
        .then(() => {
            res.redirect('/enxoval#banheiro')
            
        })
        .catch(err => {
            res.send(err);
        });
});

// Rota para editar um item
router.get('/edit/enxoval/banheiro/:id', (req, res) => {
    BanheiroItens.findByPk(req.params.id)
        .then(itensBanheiro => {
            if (itensBanheiro) {
                console.log('Item encontrado:', itensBanheiro);
                res.render('enxoval/banheiro/editEnxovalQuarto', { item: itensBanheiro });
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
router.post('/edit/enxoval/banheiro/:id', (req, res) => {
    
    BanheiroItens.update(
        { item: req.body.item },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.redirect('/enxoval#banheiro');
        })
        .catch(err => {
            console.log('Erro ao atualizar o item:', err);
            res.status(500).send('Erro ao atualizar o item');
        });
});

// Rota para deletar um item
router.post('/delete/enxoval/banheiro/:id', (req, res) => {
    BanheiroItens.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        res.redirect('/enxoval#banheiro');
    })
    .catch(err => {
        res.status(500).send('Erro ao deletar o item');
    });
});

module.exports = router