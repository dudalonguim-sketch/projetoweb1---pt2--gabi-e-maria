const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

const livro = livros.find(l => l.id === id);

if (livro) {
  document.getElementById("detalhes-livro").innerHTML = `
    <img src="${livro.imagem}" alt="${livro.titulo}" />
    <div>
      <h2>${livro.titulo}</h2>
      <p><strong>Autor(a):</strong> ${livro.autor}</p>
      <p><strong>Gênero:</strong> ${livro.genero}</p>
      <p><strong>Descrição:</strong> ${livro.descricao}</p>
      <p><strong>Sequência:</strong> ${livro.continuacao}</p>
    </div>
  `;
} else {
  document.getElementById("detalhes-livro").innerHTML = `
    <p>Livro não encontrado.</p>
  `;
}
