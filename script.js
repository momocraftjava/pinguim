document.getElementById("formCadastro").addEventListener("submit", (e) => {

  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  addCadastro(nome, email);

  renderCadastros();

  e.target.reset();
});


//mostra uma array pro pc
function getCadastros() {
  return JSON.parse(localStorage.getItem("cadastros")) || [];
}

// 
function saveCadastros(cadastros) {
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
}

// cria um cadastro 1
function addCadastro(nome, email) {
  const cadastros = getCadastros();
   const id = Date.now(); // gera id aleatorio baseado na hora e data 
  cadastros.push({id, nome, email });
  saveCadastros(cadastros);
}

//deleta um cadastro 
function deleteCadastro(index) {
  const cadastros = getCadastros();
  cadastros.splice(index, 1);
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


//RENDERIZA A LISTA NA TELA 
function renderCadastros() {
  const lista = document.getElementById("listaCadastros");
  lista.innerHTML = "";

  getCadastros().forEach(cadastro => {
    const li = document.createElement("li");

    // PRIMEIRA EXIBIÇÃO
    li.innerHTML = `
      <span class="nome">${cadastro.nome}</span> -
      <span class="email">${cadastro.email}</span>
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    `;

    // CRIA BOTAOZINHO DELETE
    li.querySelector(".excluir").addEventListener("click", () => {
      deleteCadastro(cadastro.id);
      renderCadastros();
    });

    // EDIÇ~SOAOOOO
    li.querySelector(".editar").addEventListener("click", () => {
      
      li.innerHTML = `

         <h3 class="editCd">EDITAR</h3>
          
        <input type="text" class="edit-nome" value="${cadastro.nome}">
        <input type="email" class="edit-email" value="${cadastro.email}">
        <button class="salvar">Salvar</button>
        <button class="cancelar">Cancelar</button>
      `;

      // SAVE EDITION
      li.querySelector(".salvar").addEventListener("click", () => {
        const novoNome = li.querySelector(".edit-nome").value;
        const novoEmail = li.querySelector(".edit-email").value;

        editCadastro(cadastro.id, novoNome, novoEmail);
        renderCadastros(); 
      });

      // FUNCTION BOTAO DE DCANCELAR EDIÇAO
      li.querySelector(".cancelar").addEventListener("click", () => {
        renderCadastros(); // Volta ao modo normal
      });
    });

    lista.appendChild(li);
  });
}
///funçao pro botao funcionar (DELETE)
function handleDelete(id) {
  deleteCadastro(id);
  renderCadastros();
}

// FUNCIONA CODIGO
renderCadastros();