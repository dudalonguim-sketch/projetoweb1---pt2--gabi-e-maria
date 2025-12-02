const biblimodel = require('../model/biblimodel.js');

// SALVAR LIVRO
exports.salvarLivro = (req, res) => {
  const { titulo, autor, genero, descricao, imagem, user_id } = req.body;

  if (!user_id) {
    return res.status(401).send("Usuário não autenticado.");
  }

  const livros = { titulo, autor, genero, descricao, imagem, user_id };

  biblimodel.inserirLivro(livros, (err) => {
    if (err) {
      console.error('ERRO MySQL:', err.code, err.sqlMessage); 
      return res.status(500).send('Erro ao cadastrar livro: ' + err.sqlMessage);
    }
    res.send('Livro cadastrado com sucesso!');
  });
};

// LISTAR LIVROS
exports.listarLivros = (req, res) => {
  biblimodel.buscarLivros((err, results) => {
    if (err) {
      console.error('Erro ao buscar livros:', err);
      res.status(500).send('Erro ao buscar livros.');
    } else {
      res.json(results);
    }
  });
};

// DELETAR LIVRO
exports.deletarLivro = (req, res) => {
  const id = req.params.id;
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(401).send("Usuário não autenticado.");
  }

  biblimodel.deletarLivro(id, user_id, (err, result) => {
    if (err) {
      console.error("Erro ao excluir livro no MySQL:", err);
      return res.status(500).send("Erro ao excluir livro no banco de dados.");
    }

    if (result.affectedRows === 0) {
      return res.status(403).send("Você não tem permissão para excluir este livro.");
    }

    res.send("Livro excluído com sucesso!");
  });
};

// ATUALIZAR LIVRO
exports.atualizarLivro = (req, res) => {
  const id = req.params.id;
  const { titulo, autor, genero, descricao, imagem, user_id } = req.body;

  if (!user_id) {
    return res.status(401).send("Usuário não autenticado.");
  }

  const livroAtualizado = { titulo, autor, genero, descricao, imagem, user_id };

  biblimodel.atualizarLivro(id, livroAtualizado, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar livro:", err);
      return res.status(500).send("Erro ao atualizar livro: " + err.sqlMessage);
    }

    if (result.affectedRows === 0) {
      return res.status(403).send("Você não tem permissão para editar este livro.");
    }

    res.send("Livro atualizado com sucesso!");
  });
};

// BUSCAR LIVRO POR ID
exports.buscarLivroPorId = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM livros WHERE id = ?";
  const db = require('../config/db');

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar livro:", err);
      return res.status(500).send("Erro no servidor.");
    }

    if (results.length === 0) {
      return res.status(404).send("Livro não encontrado.");
    }

    res.json(results[0]);
  });
};


