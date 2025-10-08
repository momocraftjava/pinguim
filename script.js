//evento do form
document.getElementById("formCadastro").addEventListener("submit", (e) => {

  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  addCadastro(nome, email);

  renderCadastros();

  e.target.reset();
});


//CRIA DB
function getCadastros() {
  return JSON.parse(localStorage.getItem("cadastros")) || [];
}

// SALVA ALTERAÇOES E CADASTRO
function saveCadastros(cadastros) {
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
}

// cria um cadastro 
function addCadastro(nome, email) {
  const cadastros = getCadastros();
   const id = Date.now(); // gera id aleatorio baseado na hora e data 
  cadastros.push({id, nome, email });
  saveCadastros(cadastros);
}

//deleta um cadastro 
function deleteCadastro(id) {
  let cadastros = getCadastros();
  cadastros = cadastros.filter(c => c.id !== id);
  saveCadastros(cadastros);
}

//edita cadastro NESSA PORRA (fuunçao :) )
function editCadastro(id, novoNome, novoEmail) {
  const cadastros = getCadastros();
  const index = cadastros.findIndex(c => c.id === id);

  if (index !== -1) {
    cadastros[index].nome = novoNome;
    cadastros[index].email = novoEmail;
    saveCadastros(cadastros);
  }
}

// busca item
function buscarCadastros(termo) {
  const cadastros = getCadastros();
  termo = termo.toLowerCase();
  return cadastros.filter(c => c.nome.toLowerCase().includes(termo));
}


//FRONT 
function renderCadastros() {
  const lista = document.getElementById("listaCadastros");
  lista.innerHTML = "";

  getCadastros().forEach(cadastro => {
    const li = document.createElement("li");

    // DEFAULT
    li.innerHTML = `
      <span class="nome">${cadastro.nome}</span> -
      <span class="email">${cadastro.email}</span>
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    `;

    // EVENTO DO BOTAO EXCLUIR
    li.querySelector(".excluir").addEventListener("click", () => {
      deleteCadastro(cadastro.id);
      renderCadastros();
    });

    // EVENTO DO BOTAO EDITAR (AREA DE EDIÇAO DO ELEMENTO)
    li.querySelector(".editar").addEventListener("click", () => {
      li.innerHTML = `
        <h3>Editar</h3>
        <input type="text" class="edit-nome" value="${cadastro.nome}">
        <input type="email" class="edit-email" value="${cadastro.email}">
        <button class="salvar">Salvar</button>
        <button class="cancelar">Cancelar</button>
      `;

        //EVENTO DO BOTAO SALVAR EDIÇAO

      li.querySelector(".salvar").addEventListener("click", () => {
        const novoNome = li.querySelector(".edit-nome").value;
        const novoEmail = li.querySelector(".edit-email").value;

        editCadastro(cadastro.id, novoNome, novoEmail);
        renderCadastros();
      });
      //BOTAO CANCELAR EDIÇAO
      li.querySelector(".cancelar").addEventListener("click", () => {
        renderCadastros();
      });
    });

    lista.appendChild(li);
  });
}
//evento de busca
document.getElementById("busca").addEventListener("input", (e) => {
  const termo = e.target.value.trim();
  const lista = document.getElementById("listaCadastros");
  lista.innerHTML = "";

  const resultados = termo ? buscarCadastros(termo) : getCadastros();

  resultados.forEach(cadastro => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${cadastro.nome}</span> - <span>${cadastro.email}</span>
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    `;

    li.querySelector(".editar").addEventListener("click", () => {
      document.getElementById("editId").value = cadastro.id;
      document.getElementById("nome").value = cadastro.nome;
      document.getElementById("email").value = cadastro.email;
      document.getElementById("btnPrincipal").textContent = "Salvar Edição";
      document.getElementById("btnCancelarEdicao").style.display = "inline";
    });

    li.querySelector(".excluir").addEventListener("click", () => {
      deleteCadastro(cadastro.id);
      renderCadastros();
    });

    lista.appendChild(li);
  });
});

// FUNCIONA CODIGO
renderCadastros();