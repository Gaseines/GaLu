const express = require('express');
const router = express.Router();
const LavanderiaItens = require('../../modules/lavanderiaItens');

// Rotas Lavanderia
// Rota cadastrar
router.get('/cad/enxoval/lavanderia', (req, res) => {
    res.render('enxoval/lavanderia/cadEnxovalLavanderia'); // Caminho para o template
});

// Rota add
router.post('/add/enxoval/lavanderia', (req, res) => {
    LavanderiaItens.create({
        item: req.body.item
    })
    .then(() => {
        res.redirect('/enxoval#lavanderia');
    })
    .catch(err => {
        res.send(err);
    });
});

// Rota para editar um item
router.get('/edit/enxoval/lavanderia/:id', (req, res) => {
    LavanderiaItens.findByPk(req.params.id)
    .then(itensLavanderia => {
        if (itensLavanderia) {
            console.log('Item encontrado:', itensLavanderia);
            res.render('enxoval/lavanderia/editEnxovalLavanderia', { item: itensLavanderia });
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
router.post('/edit/enxoval/lavanderia/:id', (req, res) => {
    LavanderiaItens.update(
        { item: req.body.item },
        { where: { id: req.params.id } }
    )
    .then(() => {
        res.redirect('/enxoval#lavanderia');
    })
    .catch(err => {
        console.log('Erro ao atualizar o item:', err);
        res.status(500).send('Erro ao atualizar o item');
    });
});

// Rota para deletar um item
router.post('/delete/enxoval/lavanderia/:id', (req, res) => {
    LavanderiaItens.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        res.redirect('/enxoval#lavanderia');
    })
    .catch(err => {
        res.status(500).send('Erro ao deletar o item');
    });
});

module.exports = router;
