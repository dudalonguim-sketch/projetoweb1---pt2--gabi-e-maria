const cadastromodel = require('../model/cadastromodel.js');
const db = require('../config/cadastrodb.js');

exports.salvarCadastro = (req, res) => {
  const { nome, email, cpf, genero } = req.body;

  const sql = 'SELECT 1 FROM cadastro WHERE cpf = ? OR email = ?';
    db.query(sql, [cpf, email], (err, results) => {
        if(err){
            console.error('Erro MySQL:', err);
            return res.send('Erro no banco de dados.');       
         }
         if(results.length > 0) {
            return res.send('Usuário já cadastrado com esse CPF ou Email! Tente novamente.');
         }
    const cadastro = { nome, email, cpf, genero };
    cadastromodel.inserirCadastro(cadastro, (err) => {
    if (err) {
    console.error('ERRO MySQL:', err.code, err.sqlMessage); 
    return res.status(500).send('Erro ao cadastrar: ' + err.sqlMessage);
    }
    res.send('Cadastro realizado com sucesso!');
  });
});
}

