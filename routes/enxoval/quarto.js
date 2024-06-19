const express = require('express')
const router = express.Router()
const QuartoItens = require('../../modules/quartoItens')


//Rotas Quarto
// Rota cadastrar
router.get('/cad/enxoval/quarto', (req, res) => {
    res.render('enxoval/quarto/cadEnxovalQuarto');
});

// Rota add
router.post('/add/enxoval/quarto', (req, res) => {
    QuartoItens.create({
        item: req.body.item
    })
        .then(() => {
            res.redirect('/enxoval#quarto');
        })
        .catch(err => {
            res.send(err);
        });
});

// Rota para editar um item
router.get('/edit/enxoval/quarto/:id', (req, res) => {
    QuartoItens.findByPk(req.params.id)
        .then(itensQuarto => {
            if (itensQuarto) {
                console.log('Item encontrado:', itensQuarto);
                res.render('enxoval/quarto/editEnxovalQuarto', { item: itensQuarto });
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
router.post('/edit/enxoval/quarto/:id', (req, res) => {
    
    QuartoItens.update(
        { item: req.body.item },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.redirect('/enxoval#quarto');
        })
        .catch(err => {
            console.log('Erro ao atualizar o item:', err);
            res.status(500).send('Erro ao atualizar o item');
        });
});

// Rota para deletar um item
router.post('/delete/enxoval/quarto/:id', (req, res) => {
    QuartoItens.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        res.redirect('/enxoval#quarto');
    })
    .catch(err => {
        res.status(500).send('Erro ao deletar o item');
    });
});
//-------------------------------------------------------

module.exports = router