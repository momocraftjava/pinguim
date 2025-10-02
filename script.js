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
  cadastros.push({ nome, email });
  saveCadastros(cadastros);
}

//deleta um cadastro 
function deleteCadastro(index) {
  const cadastros = getCadastros();
  cadastros.splice(index, 1);
  saveCadastros(cadastros);
}

//mostra a array na tela
function renderCadastros() {
  const lista = document.getElementById("listaCadastros");
  lista.innerHTML = "";

  getCadastros().forEach(cadastro => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${cadastro.nome} - ${cadastro.email}
      <button onclick="handleDelete(${cadastro.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });
}
///funçao pro botao funcionar
function handleDelete(id) {
  deleteCadastro(id);
  renderCadastros();
}

// Render inicial ao abrir a página
renderCadastros();