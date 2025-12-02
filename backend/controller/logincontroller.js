const cadastromodel = require('../model/cadastromodel');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { email, senha } = req.body;

  cadastromodel.buscarPorEmail(email, (err, results) => {
    if (err) return res.status(500).send("Erro no servidor.");

    if (results.length === 0)
      return res.status(400).send("Email não encontrado.");

    const usuario = results[0];

    bcrypt.compare(senha, usuario.senha, (err, ok) => {
      if (!ok) return res.status(401).send("Senha incorreta.");

      // SUCESSO: devolve id e nome
      res.json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      });
    });
  });
};
