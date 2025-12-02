DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero ENUM('Romance', 'Suspense', 'Fantasia'),
    descricao TEXT,
    imagem TEXT
);

INSERT INTO livros (titulo, autor, genero, descricao, imagem) VALUES
("É Assim que Acaba", "Colleen Hoover", "Romance", "Lily, uma jovem florista, conhece Ryle, um médico teimoso e confiante. Tudo parece perfeito até que segredos do passado ressurgem.", "imgs/acaba2.png"),

("Eu e Esse Meu Coração", "C.C. Hunter", "Romance", "Leah ganha uma nova chance de viver com um transplante de coração, mas descobre segredos que a levam a investigar a vida do doador.", "imgs/coracao2.png"),

("Orgulho e Preconceito", "Jane Austen", "Romance", "Elizabeth Bennet enfrenta os dilemas sociais e amorosos da Inglaterra do século XIX ao conhecer o enigmático Sr. Darcy.", "imgs/orgulho2.png"),

("Verity", "Colleen Hoover", "Suspense", "Lowen é convidada para terminar uma série de livros e encontra uma autobiografia assustadora da autora original, Verity.", "imgs/verity2.png"),

("O Homem de Giz", "C.J. Tudor", "Suspense", "Eddie e seus amigos usavam desenhos de giz para se comunicar. Anos depois, o passado volta à tona cheio de mistérios e segredos.", "imgs/giz2.png"),

("A Empregada", "Freida McFadden", "Suspense", "Millie consegue um emprego como empregada, mas a mansão onde trabalha guarda segredos sombrios.", "imgs/empregada2.jpg"),

("Jogos Vorazes", "Suzanne Collins", "Fantasia", "Katniss Everdeen se voluntaria para participar dos Jogos Vorazes, uma batalha mortal transmitida ao vivo para todo o país.", "imgs/vorazes2.png"),

("Percy Jackson e o Ladrão de Raios", "Rick Riordan", "Fantasia", "Percy descobre que é filho de Poseidon e embarca em uma missão para impedir uma guerra entre os deuses do Olimpo.", "imgs/percy2.png"),

("A Biblioteca da Meia-Noite", "Matt Haig", "Fantasia", "Nora Seed encontra uma biblioteca entre a vida e a morte onde pode explorar versões alternativas de sua vida.", "imgs/biblioteca2.png");

ALTER TABLE livros ADD COLUMN user_id INT;
describe livros;
SET SQL_SAFE_UPDATES = 0;
SELECT * FROM livros;
DELETE FROM livros WHERE user_id IS NULL;
DELETE FROM livros WHERE user_id = '';

