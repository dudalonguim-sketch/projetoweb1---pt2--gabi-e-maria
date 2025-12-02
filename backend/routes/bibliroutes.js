const express = require('express');
const router = express.Router();
const biblicontroller = require('../controller/biblicontroller');

router.get('/', (req, res) => {
    res.status(200).send('Plataforma de livros');
});

router.post('/livros', biblicontroller.salvarLivro);
router.get('/livros', biblicontroller.listarLivros);
router.get('/livros/:id', biblicontroller.buscarLivroPorId);
router.put('/livros/:id', biblicontroller.atualizarLivro);
router.delete('/livros/:id', biblicontroller.deletarLivro);

module.exports = router;

