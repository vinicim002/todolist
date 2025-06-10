document.addEventListener("DOMContentLoaded", () => {
  const nameContainer = document.querySelector(".nome-avatar");
  const divDataHora = document.querySelector(".data-hora");

  nameContainer.innerHTML = "";

  const nomeSalvo = localStorage.getItem("userName");
  const imgSalva = localStorage.getItem("imgUser");

  if (nomeSalvo) {
    // 1. Cria a saudação e a adiciona
    const elementoSaudacao = criarSaudacao(nomeSalvo);
    nameContainer.appendChild(elementoSaudacao);
  } else {
    // 2. Se não há nome, chama a função para pedir e configurar
    pedirEConfigurarNome(nameContainer);
  }

  // 3. Cria e adiciona o avatar em ambos os casos
  const elementoAvatar = criarAvatar(imgSalva);
  nameContainer.appendChild(elementoAvatar);

  // 4. Cria e adiciona a data/hora
  dataHora(divDataHora);
});

function criarSaudacao(nome) {
  const saudacao = document.createElement("p");
  saudacao.innerHTML = `Olá, <span>${nome}</span>`;
  return saudacao;
}

function pedirEConfigurarNome(container) {
  const nome = prompt("Bem-vindo! Qual é o seu nome?");

  if (nome && nome.trim() !== "") {
    const nomeValido = nome.trim();
    localStorage.setItem("userName", nomeValido);

    // Usa a função 'criarSaudacao' para pegar o elemento...
    const elementoSaudacao = criarSaudacao(nomeValido);
    // ...e então o adiciona ao container.
    container.appendChild(elementoSaudacao);
  } else {
    alert("Nome inválido. Um nome padrão 'Usuário' será usado.");
    // A mesma lógica para o nome padrão
    const elementoSaudacao = criarSaudacao("Usuário");
    container.appendChild(elementoSaudacao);
  }
}

function criarAvatar(caminhoDaImagem) {
  const btnAvatar = document.createElement("button");
  btnAvatar.className = "avatar";
  btnAvatar.id = "btn-trocar-avatar";

  const imgAvatar = document.createElement("img");
  imgAvatar.id = "avatar-principal-img";
  imgAvatar.src = "src/img/img01.jpg";
  imgAvatar.alt = "Avatar do usuário";

  btnAvatar.appendChild(imgAvatar);
  return btnAvatar;
}

function dataHora(container) {
  container.innerHTML = "";

  const dataHora = new Date();

  const data = document.createElement("p");
  const hora = document.createElement("p");

  data.className = "data";
  hora.className = "hora";

  data.textContent = dataHora.toLocaleDateString("pt-BR");
  hora.textContent = dataHora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  container.appendChild(data);
  container.appendChild(hora);
}

const btnTrocarAvatar = document.querySelector("#btn-trocar-avatar");
const modal = document.querySelector('#modal-selecao-avatar');

btnTrocarAvatar.addEventListener("click", () => {
  modal.style.display = "flex";
});
