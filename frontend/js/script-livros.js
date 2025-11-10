document.addEventListener("DOMContentLoaded", async () => {
  const detalhes = document.getElementById("detalhes-livro");
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const origem = params.get("origem"); // <-- NOVO: identifica se veio do banco ou fixo

  if (!id) {
    detalhes.innerHTML = "<p>Nenhum livro selecionado.</p>";
    return;
  }

  try {
    let livro;

    //Se o livro veio dos fixos (livros.js)
    if (origem === "fixo") {
      livro = livros.find(l => l.id === id);
    } 
    //Se veio do banco de dados
    else if (origem === "banco") {
      const res = await fetch(`http://localhost:1304/livros/${id}`);
      if (!res.ok) {
        detalhes.innerHTML = "<p>Livro não encontrado no banco.</p>";
        return;
      }
      livro = await res.json();
    } 
    // Caso não tenha origem (link antigo)
    else {
      detalhes.innerHTML = "<p>Origem do livro não informada.</p>";
      return;
    }

    if (!livro) {
      detalhes.innerHTML = "<p>Livro não encontrado.</p>";
      return;
    }

    // Renderiza as informações com seu layout padrão
    detalhes.innerHTML = `
      <img src="${livro.imagem || 'imgs/padrao.png'}" alt="${livro.titulo}">
      <div>
        <h2>${livro.titulo}</h2>
        <p><strong>Autor(a):</strong> ${livro.autor}</p>
        <p><strong>Gênero:</strong> ${livro.genero}</p>
        <p><strong>Descrição:</strong> ${livro.descricao}</p>
        ${livro.continuacao ? `<p><strong>Continuação:</strong> ${livro.continuacao}</p>` : ""}
        <a href="index.html" class="voltar">&larr; Voltar</a>
      </div>
    `;

  } catch (error) {
    console.error("Erro ao carregar detalhes do livro:", error);
    detalhes.innerHTML = "<p>Erro ao carregar o livro.</p>";
  }
});

