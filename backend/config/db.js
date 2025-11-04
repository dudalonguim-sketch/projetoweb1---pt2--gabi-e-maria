const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ifsp',
    database: 'biblioteca'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
    } else {
    console.log('Conectado ao banco de dados!');
    }
});

module.exports = conexao;