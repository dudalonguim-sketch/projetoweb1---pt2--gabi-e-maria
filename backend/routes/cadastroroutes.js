const express = require('express');
const router = express.Router();
const cadastrocontroller = require('../controller/cadastrocontroller');

router.get('/',  (req, res) => {
    res.status(200).send('Cadastro de clientes');
});

router.post('/cadastro', cadastrocontroller.salvarCadastro);

module.exports = router;