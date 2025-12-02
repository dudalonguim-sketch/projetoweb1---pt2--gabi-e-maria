const db = require('../config/db');

// INSERIR LIVRO COM USER_ID
const inserirLivro = (livros, callback) => {
  const sql = 'INSERT INTO livros (titulo, autor, genero, descricao, imagem, user_id) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [
    livros.titulo,
    livros.autor,
    livros.genero,
    livros.descricao,
    livros.imagem,
    livros.user_id
  ];
  db.query(sql, values, callback);
};

// BUSCAR TODOS OS LIVROS
const buscarLivros = (callback) => {
  const sql = 'SELECT * FROM livros';
  db.query(sql, callback);
};

// DELETAR SOMENTE SE O LIVRO PERTENCE AO USUÁRIO
function deletarLivro(id, user_id, callback) {
  const sql = "DELETE FROM livros WHERE id = ? AND user_id = ?";
  db.query(sql, [id, user_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

// ATUALIZAR SOMENTE SE PERTENCER AO USUÁRIO
const atualizarLivro = (id, dados, callback) => {
  const sql = `
    UPDATE livros 
    SET titulo = ?, autor = ?, genero = ?, descricao = ?, imagem = ?
    WHERE id = ? AND user_id = ?
  `;
  const values = [
    dados.titulo,
    dados.autor,
    dados.genero,
    dados.descricao,
    dados.imagem,
    id,
    dados.user_id
  ];
  db.query(sql, values, callback);
};

module.exports = {
  inserirLivro,
  buscarLivros,
  deletarLivro,
  atualizarLivro
};
