const cadastrodb = require('../config/cadastrodb');
const bcrypt = require('bcrypt');

const inserirCadastro = (cadastro, callback) => {
    const sql = 'INSERT INTO cadastro (nome, email, cpf, genero, senha) VALUES (?, ?, ?, ?, ?)';
    const values = [
        cadastro.nome,
        cadastro.email,
        cadastro.cpf,
        cadastro.genero,
        cadastro.senha
    ];
    cadastrodb.query(sql, values, callback);
};

const buscarPorEmail = (email, callback) => {
    const sql = 'SELECT * FROM cadastro WHERE email = ?';
    cadastrodb.query(sql, [email], callback);
};

module.exports = {
    inserirCadastro,
    buscarPorEmail
};
