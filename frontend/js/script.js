document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main.container");
  const categorias = ["Romance", "Suspense", "Fantasia"];
  const API = "http://localhost:1304/livros";
  const paginasSemBusca = ["login.html", "cadastro.html", "cadastrolivro.html"];

  const caminho = window.location.pathname;
  const nomePagina = caminho.substring(caminho.lastIndexOf("/") + 1);
  if (!paginasSemBusca.includes(nomePagina)) {
  const busca = document.getElementById("buscaContainer");
  if (busca) busca.style.display = "flex";
  }

  const user_id = localStorage.getItem("user_id");

  let livrosDB = [];
  try {
    const res = await fetch(API);
    if (res.ok) {
      livrosDB = await res.json();
    }
  } catch {
    console.warn("Erro ao carregar livros do banco");
  }

  // Junta livros fixos + livros do banco
  const todosLivros = [
    ...livros.map((l, i) => ({
      ...l,
      id: i + 1,
      origem: "fixo"
    })),

    ...livrosDB.map((l) => ({
      ...l,
      origem: "banco"
    }))
  ];

  // Limpa tela
  main.innerHTML = "";

  categorias.forEach((genero) => {
    const livrosDoGenero = todosLivros.filter(
      (l) =>
        l.genero.trim().toLowerCase() === genero.trim().toLowerCase()
    );

    if (livrosDoGenero.length === 0) return;

    const h2 = document.createElement("h2");
    h2.classList.add("categoria");
    h2.textContent = genero;

    const section = document.createElement("section");
    section.classList.add("livros");

    livrosDoGenero.forEach((livro) => {
      const article = document.createElement("article");
      article.classList.add("livro");

      // Pode editar/excluir somente se for do banco e do usuário logado
      const podeEditar = livro.origem === "banco" && livro.user_id == user_id;

      article.innerHTML = `
        <img src="${livro.imagem}" alt="Capa de ${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p>Autor(a): ${livro.autor}</p>
        <a href="livro.html?id=${livro.id}&origem=${livro.origem}" class="ver-mais">Ver mais</a>

        ${
          podeEditar
            ? `
            <div class="acoes">
              <button class="btn-edit" data-id="${livro.id}">✎</button>
              <button class="btn-del" data-id="${livro.id}">✖</button>
            </div>
          `
            : ""
        }
      `;

      section.appendChild(article);
    });

    main.appendChild(h2);
    main.appendChild(section);
  });
});



//EXCLUIR LIVRO
document.body.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-del")) return;

  const id = e.target.dataset.id;
  const user_id = localStorage.getItem("user_id");

  //se não estiver logado
  if (!user_id) {
    alert("Você precisa estar logado para excluir livros.");
    return;
  }

  const confirmar = confirm("Deseja realmente deletar este livro?");
  if (!confirmar) return; 

  try {
    const res = await fetch(`http://localhost:1304/livros/${id}?user_id=${user_id}`, {
      method: "DELETE"
    });

    const msg = await res.text();
    alert(msg);
    location.reload();

  } catch (erro) {
    console.error("Erro ao excluir:", erro);
    alert("Erro ao excluir o livro.");
  }
});

//EDITAR LIVRO
document.body.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-edit")) return;

  const id = e.target.dataset.id;
  const user_id = localStorage.getItem("user_id");

  const res = await fetch("http://localhost:1304/livros");
  const livros = await res.json();
  const livroAtual = livros.find((l) => l.id == id);

  if (!livroAtual) {
    alert("Livro não encontrado no banco.");
    return;
  }

  const titulo = prompt("Título:", livroAtual.titulo);
  const autor = prompt("Autor:", livroAtual.autor);
  const descricao = prompt("Descrição:", livroAtual.descricao);
  const imagem = prompt("Imagem (URL):", livroAtual.imagem);

  const updateRes = await fetch(`http://localhost:1304/livros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, autor, genero, descricao, imagem, user_id }),
  });

  alert(await updateRes.text());
  location.reload();
});

const campoBusca = document.getElementById("campoBusca");

if (campoBusca) {
  campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase().trim();
    const livros = document.querySelectorAll(".livro");

    livros.forEach((livro) => {
      const titulo = livro.querySelector("h3")?.textContent.toLowerCase() || "";
      const autor = livro.querySelector("p")?.textContent.toLowerCase() || "";

      const corresponde =
        titulo.includes(termo) || autor.includes(termo.replace("autor(a): ", ""));

      livro.style.display = corresponde ? "block" : "none";
    });
  });
}