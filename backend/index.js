const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db.js');
const bibliroutes = require('./routes/bibliroutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use('/', bibliroutes);
//para rodar no go live e no node
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, '../frontend')));
//

app.listen(1304, () => {
    console.log('Biblioteca rodando na porta 1304');
});
