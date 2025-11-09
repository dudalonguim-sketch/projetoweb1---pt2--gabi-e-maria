const db = require('../config/db');

const inserirLivro = (livros, callback) => {
  const sql = 'INSERT INTO livros (titulo, autor, genero, descricao, imagem) VALUES (?, ?, ?, ?, ?)';
  const values = [livros.titulo, livros.autor, livros.genero, livros.descricao, livros.imagem];
  db.query(sql, values, callback);
};

const buscarLivros = (callback) => {
  const sql = 'SELECT * FROM livros';
  db.query(sql, callback);
};

function deletarLivro(id, callback) {
  const sql = "DELETE FROM livros WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

const atualizarLivro = (id, dados, callback) => {
  const sql = `
    UPDATE livros 
    SET titulo = ?, autor = ?, genero = ?, descricao = ?, imagem = ?
    WHERE id = ?
  `;
  const values = [
    dados.titulo,
    dados.autor,
    dados.genero,
    dados.descricao,
    dados.imagem,
    id
  ];
  db.query(sql, values, callback);
};

module.exports = {
  inserirLivro,
  buscarLivros,
  deletarLivro,
  atualizarLivro
};
