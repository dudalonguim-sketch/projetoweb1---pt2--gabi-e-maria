const cadastrodb = require('../config/cadastrodb');

const inserirCadastro = (cadastro, callback) => {
    const sql = 'INSERT INTO cadastro (nome, email, cpf, genero) VALUES (?, ?, ?, ?)';
    const values = [cadastro.nome, cadastro.email, cadastro.cpf, cadastro.genero];
    cadastrodb.query(sql, values, callback);
};

module.exports = {
    inserirCadastro
};