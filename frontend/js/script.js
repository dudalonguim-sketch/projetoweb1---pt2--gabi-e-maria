document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main.container");
  const categorias = ["Romance", "Suspense", "Fantasia"];
  const API = "http://localhost:1304/livros";

  let livrosDB = [];
  try {
    const res = await fetch(API);
    if (res.ok) {
      livrosDB = await res.json();
      console.log("Livros do banco:", livrosDB.length);
    } else {
      console.warn("Backend respondeu com status:", res.status);
    }
  } catch {
    console.warn("Backend offline. Exibindo apenas livros fixos.");
  }

 const todosLivros = [
  ...livros.map((l, i) => ({ ...l, id: i + 1, origem: "fixo" })),
  ...livrosDB.map((l) => ({
    id: l.id,
    idBanco: l.id,
    titulo: l.titulo,
    autor: l.autor,
    genero: l.genero,
    descricao: l.descricao,
    continuacao: "Não possui.",
    imagem: l.imagem || "imgs/padrao.png",
    origem: "banco" // <-- ESSENCIAL!
  }))
];


  main.innerHTML = "";
  categorias.forEach((genero) => {
    const livrosDoGenero = todosLivros.filter((l) => l.genero === genero);
    if (livrosDoGenero.length === 0) return;

    const h2 = document.createElement("h2");
    h2.classList.add("categoria");
    h2.textContent = genero;

    const section = document.createElement("section");
    section.classList.add("livros");

    livrosDoGenero.forEach((livro) => {
      const article = document.createElement("article");
      article.classList.add("livro");

      const isBanco = livro.origem === "banco";

      article.innerHTML = `
        <img src="${livro.imagem}" alt="Capa de ${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p>Autor(a): ${livro.autor}</p>
        <a href="livro.html?id=${livro.id}&origem=${livro.origem}" class="ver-mais">Ver mais</a>
        ${isBanco ? `
          <div class="acoes">
            <button class="btn-edit" data-idbanco="${livro.idBanco}" aria-label="Editar">✎</button>
            <button class="btn-del" data-idbanco="${livro.idBanco}" aria-label="Excluir">✖</button>
          </div>
        ` : ""}
      `;

      section.appendChild(article);
    });

    main.appendChild(h2);
    main.appendChild(section);
  });
});

// Excluir (usa o ID REAL do banco salvo no data-idbanco)
document.body.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-del")) return;

  const idBanco = e.target.dataset.idbanco;
  if (!idBanco) return;

  if (!confirm("Deseja realmente excluir este livro?")) return;

  try {
    const res = await fetch(`http://localhost:1304/livros/${idBanco}`, { method: "DELETE" });
    if (res.ok) {
      alert("Livro excluído com sucesso!");
      location.reload();
    } else {
      const msg = await res.text();
      alert("Erro ao excluir o livro: " + msg);
    }
  } catch (err) {
    console.error("Erro ao excluir:", err);
    alert("Falha ao conectar ao servidor.");
  }
});

// Editar
document.body.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-edit")) return;

  const idBanco = e.target.dataset.idbanco;
  if (!idBanco) {
    alert("ID do livro não encontrado.");
    return;
  }

  try {
    // Busca os dados atuais do livro
    const res = await fetch(`http://localhost:1304/livros`);
    const livros = await res.json();
    const livroAtual = livros.find(l => l.id == idBanco);
    if (!livroAtual) {
      alert("Livro não encontrado no banco.");
      return;
    }

    // Pede novos valores (pré-preenchidos)
    const novoTitulo = prompt("Novo título:", livroAtual.titulo) || livroAtual.titulo;
    const novoAutor = prompt("Novo autor:", livroAtual.autor) || livroAtual.autor;
    const novoGenero = prompt("Novo gênero:", livroAtual.genero) || livroAtual.genero;
    const novaDescricao = prompt("Nova descrição:", livroAtual.descricao) || livroAtual.descricao;
    const novaImagem = prompt("Nova URL da imagem:", livroAtual.imagem) || livroAtual.imagem;

    // Envia pro backend
    const updateRes = await fetch(`http://localhost:1304/livros/${idBanco}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: novoTitulo,
        autor: novoAutor,
        genero: novoGenero,
        descricao: novaDescricao,
        imagem: novaImagem
      })
    });

    const msg = await updateRes.text();

    if (updateRes.ok) {
      alert("Livro atualizado com sucesso!");
      location.reload();
    } else {
      alert("Erro ao atualizar livro: " + msg);
    }

  } catch (err) {
    console.error("Erro ao atualizar:", err);
    alert("Falha ao conectar ao servidor.");
  }
});

