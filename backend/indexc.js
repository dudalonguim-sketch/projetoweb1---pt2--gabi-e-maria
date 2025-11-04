const express = require('express');
const cors = require('cors');
const cadastrodb = require('./config/cadastrodb.js');
const cadastroroutes = require('./routes/cadastroroutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.use('/', cadastroroutes);

app.listen(1506, () => {
    console.log('Cadastros ativos na posta 1506!');
});