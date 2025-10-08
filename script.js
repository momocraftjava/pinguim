// CRIA DB
function getCadastros() {
  return JSON.parse(localStorage.getItem("cadastros")) || [];
}
//CRIA OBJETO
function addCadastro(nome, email) {
  const cadastros = getCadastros();
  const id = Date.now(); // cria id apartir da data e hora
  cadastros.push({ id, nome, email });
  saveCadastros(cadastros);
}

//SALVA UM CADASTRO OU ALTERAÇAO
function saveCadastros(cadastros) {
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
}

// FUNÇAO DE DELETAR
function deleteCadastro(id) {
  let cadastros = getCadastros();
  cadastros = cadastros.filter(c => c.id !== id);
  saveCadastros(cadastros);
}
//FUNÇAO DE EDITAR
function editCadastro(id, novoNome, novoEmail) {
  const cadastros = getCadastros();
  const index = cadastros.findIndex(c => c.id === id);

  if (index !== -1) {
    cadastros[index].nome = novoNome;
    cadastros[index].email = novoEmail;
    saveCadastros(cadastros);
  }
}
// FUNÇAO DE BUSCCA
function buscarCadastros(termo) {
  const cadastros = getCadastros();
  termo = termo.toLowerCase();
  return cadastros.filter(c => c.nome.toLowerCase().includes(termo));
}

// MSOTRA TELA
function renderCadastros() {
  const lista = document.getElementById("listaCadastros");
  lista.innerHTML = "";

  getCadastros().forEach(cadastro => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${cadastro.nome}</span> - <span>${cadastro.email}</span>
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    `;

    li.querySelector(".editar").addEventListener("click", () => {
      // Ativa o modo de edição
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
}

// ===== EVENTOS =====
document.getElementById("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const editId = document.getElementById("editId").value;

  if (editId) {
    
    editCadastro(Number(editId), nome, email);
    document.getElementById("btnPrincipal").textContent = "Cadastrar";
    document.getElementById("btnCancelarEdicao").style.display = "none";
    document.getElementById("editId").value = "";
  } 
  else {

    addCadastro(nome, email);
  }

  e.target.reset();
  renderCadastros();
});

// BOTAO DE CANCELAR EDIT
document.getElementById("btnCancelarEdicao").addEventListener("click", () => {
  document.getElementById("formCadastro").reset();
  document.getElementById("btnPrincipal").textContent = "Cadastrar";
  document.getElementById("btnCancelarEdicao").style.display = "none";
  document.getElementById("editId").value = "";
});
// BOTAO DE BUSCA
document.getElementById("busca").addEventListener("input", (e) => {
  const termo = e.target.value.trim(); //cria variavel prov de acordo com oq o usuario digita
  const lista = document.getElementById("listaCadastros");
  lista.innerHTML = "";

  const resultados = termo ? buscarCadastros(termo) : getCadastros(); //if

  resultados.forEach(cadastro => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${cadastro.nome}</span> - <span>${cadastro.email}</span>
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    `;
    //BOTAO DE EDITAR
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
document.getElementById("btnLimparBusca").addEventListener("click", () => {
  const campoBusca = document.getElementById("busca");
  campoBusca.value = "";
  renderCadastros();
});


renderCadastros();
