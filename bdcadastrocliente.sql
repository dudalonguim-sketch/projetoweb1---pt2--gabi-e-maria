CREATE DATABASE IF NOT EXISTS cadastrocliente;
USE cadastrocliente;

CREATE TABLE cadastrocliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    genero VARCHAR(50)
);