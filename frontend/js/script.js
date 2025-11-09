document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main.container");
  const categorias = ["Romance", "Suspense", "Fantasia"];

  try {
    // Detecta ambiente (Go Live ou Node)
    const backendURL = "http://localhost:1304/livros";

    // Tenta buscar livros do backend
    let livrosDB = [];
    try {
      const res = await fetch(backendURL);
      if (res.ok) {
        livrosDB = await res.json();
        console.log("Livros carregados do backend:", livrosDB.length);
      } else {
        console.warn("Backend respondeu, mas sem sucesso:", res.status);
      }
    } catch (e) {
      console.warn("Backend offline. Exibindo apenas livros fixos.");
    }

    //Juntando livros fixos (livros.js) com os do banco 
    const todosLivros = [
      ...livros.map((l, i) => ({ ...l, id: i + 1 })),
      ...livrosDB.map((l, i) => ({
        id: livros.length + i + 1,
        titulo: l.titulo,
        autor: l.autor,
        genero: l.genero,
        descricao: l.descricao,
        continuacao: "Não possui.",
        imagem: l.imagem || "imgs/padrao.png"
      }))
    ];

    // Recria o layout padronizado
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
        article.innerHTML = `
          <img src="${livro.imagem}" alt="Capa de ${livro.titulo}">
          <h3>${livro.titulo}</h3>
          <p>Autor(a): ${livro.autor}</p>
          <a href="livro.html?id=${livro.id}" class="ver-mais">Ver mais</a>
        `;
        section.appendChild(article);
      });

      main.appendChild(h2);
      main.appendChild(section);
    });

  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    main.innerHTML = "<p>Erro ao carregar os livros. </p>";
  }
});
