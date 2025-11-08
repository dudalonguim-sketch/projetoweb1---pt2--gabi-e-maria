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

