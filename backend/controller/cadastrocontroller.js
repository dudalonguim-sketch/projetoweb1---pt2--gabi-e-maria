const cadastromodel = require('../model/cadastromodel');
const db = require('../config/cadastrodb');
const bcrypt = require('bcrypt');

exports.salvarCadastro = (req, res) => {
  const { nome, email, cpf, genero, senha } = req.body;

  const sql = 'SELECT 1 FROM cadastro WHERE cpf = ? OR email = ?';
  db.query(sql, [cpf, email], (err, results) => {
    if (err) {
      console.error('Erro MySQL:', err);
      return res.send('Erro no banco de dados.');       
    }

    if (results.length > 0) {
      return res.send('Usuário já cadastrado com esse CPF ou Email! Tente novamente.');
    }

    // HASH DA SENHA
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) return res.status(500).send("Erro ao gerar hash.");

      const cadastro = { nome, email, cpf, genero, senha: hash };

      cadastromodel.inserirCadastro(cadastro, (err) => {
        if (err) {
          console.error('ERRO MySQL:', err.code, err.sqlMessage); 
          return res.status(500).send('Erro ao cadastrar: ' + err.sqlMessage);
        }

        res.send('Cadastro realizado com sucesso!');
      });
    });
  });
};
