const biblimodel = require('../model/biblimodel.js');

exports.salvarLivro = (req, res) => {
  const { titulo, autor, genero, descricao, imagem } = req.body;

  const livros = { titulo, autor, genero, descricao, imagem };
  biblimodel.inserirLivro(livros, (err) => {
    if (err) {
    console.error('ERRO MySQL:', err.code, err.sqlMessage); 
    return res.status(500).send('Erro ao cadastrar livro: ' + err.sqlMessage);
    }
    res.send('Livro cadastrado com sucesso!');
  });
}

exports.listarLivros = (req, res) => {
  biblimodel.buscarLivros((err, results) => {
    if (err) {
      console.error('Erro ao buscar livros:', err);
      res.status(500).send('Erro ao buscar livros.');
    } else {
      res.json(results); // devolve os livros pro front
    }
  });
};

exports.deletarLivro = (req, res) => {
  const id = req.params.id;

  console.log("Requisição DELETE recebida! ID:", id);

  if (!id) {
    console.error("Nenhum ID recebido na requisição.");
    return res.status(400).send("ID do livro não foi informado.");
  }

  biblimodel.deletarLivro(id, (err, result) => {
    if (err) {
      console.error("Erro ao excluir livro no MySQL:", err);
      return res.status(500).send("Erro ao excluir livro no banco de dados.");
    }

    if (result.affectedRows === 0) {
      console.warn("Nenhum livro encontrado com o ID:", id);
      return res.status(404).send("Livro não encontrado.");
    }

    console.log("Livro excluído com sucesso! ID:", id);
    res.send("Livro excluído com sucesso!");
  });
};

exports.atualizarLivro = (req, res) => {
  const id = req.params.id;
  const { titulo, autor, genero, descricao, imagem } = req.body;
  const livroAtualizado = { titulo, autor, genero, descricao, imagem };

  console.log("Requisição PUT recebida para ID:", id);
  console.log("Dados recebidos:", livroAtualizado);

  biblimodel.atualizarLivro(id, livroAtualizado, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar livro:", err);
      return res.status(500).send("Erro ao atualizar livro: " + err.sqlMessage);
    }
    res.send("Livro atualizado com sucesso!");
  });
};

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

    res.json(results[0]); // envia o livro específico pro frontend
  });
};


