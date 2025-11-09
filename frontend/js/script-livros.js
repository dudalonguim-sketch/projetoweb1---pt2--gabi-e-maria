document.addEventListener("DOMContentLoaded", async () => {
  const detalhes = document.getElementById("detalhes-livro");
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  if (!id) {
    detalhes.innerHTML = "<p>Nenhum livro selecionado.</p>";
    return;
  }

  try {
    // Tenta buscar livros do backend
    const res = await fetch("http://localhost:1304/livros");
    const livrosDB = await res.json();

    // Junta livros fixos + livros cadastrados
    const todosLivros = [
      ...livros.map((l, i) => ({ ...l, id: i + 1 })),
      ...livrosDB.map((l, i) => ({
        id: livros.length + i + 1,
        titulo: l.titulo,
        autor: l.autor,
        genero: l.genero,
        descricao: l.descricao,
        continuacao: "Não informado.",
        imagem: l.imagem || "imgs/padrao.png"
      }))
    ];

    // Busca o livro pelo id
    const livro = todosLivros.find(l => l.id === id);

    if (!livro) {
      detalhes.innerHTML = "<p>Livro não encontrado.</p>";
      return;
    }

    // Renderiza as informações na tela com o estilo do seu CSS
    detalhes.innerHTML = `
      <img src="${livro.imagem}" alt="${livro.titulo}">
      <div>
        <h2>${livro.titulo}</h2>
        <p><strong>Autor(a):</strong> ${livro.autor}</p>
        <p><strong>Gênero:</strong> ${livro.genero}</p>
        <p><strong>Descrição:</strong> ${livro.descricao}</p>
        <p><strong>Continuação:</strong> ${livro.continuacao}</p>
        <a href="index.html" class="voltar">&larr; Voltar</a>
      </div>
    `;

  } catch (error) {
    console.error("Erro ao carregar detalhes do livro:", error);
    detalhes.innerHTML = "<p>Erro ao carregar o livro.</p>";
  }
});
