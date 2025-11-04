const db = require('../config/db');

const inserirLivro = (livros, callback) => {
    const sql = 'INSERT INTO livros (titulo, autor, genero, descricao, imagem) VALUES (?, ?, ?, ?, ?)';
    const values = [livros.titulo, livros.autor, livros.genero, livros.descricao, livros.imagem];
    db.query(sql, values, callback);
};

module.exports = {
    inserirLivro
};