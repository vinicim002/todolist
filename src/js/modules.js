export function inicializarHeader() {
  //Selecionando o container no qual quero trabalhar
  const containerNomeAvatar = document.querySelector(".nome-avatar");

  containerNomeAvatar.innerHTML = "";

  //Verifico se existe dados salvos - Sera retornado true ou false
  const nomeSalvo = localStorage.getItem("nomeDoUsuario");
  const imgSalva = localStorage.getItem("avatarDoUsuario");

  //Caso seja true ele gera a saudacao
  if (nomeSalvo) {
    containerNomeAvatar.appendChild(criarSaudacao(nomeSalvo));
    //Caso seja false ele chame uma funcao responsavel por pedir as informacoes
  } else {
    configInfo(containerNomeAvatar);
  }

  //Logica para a imagem
  //Se imgSalva for false ele retorna o caminha padrao se for true eh porque tem uma imagem escolhida
  const caminhoFinalDaImg = imgSalva || "src/img/img01.jpg";

  containerNomeAvatar.appendChild(imgSelecionada(caminhoFinalDaImg));
}

function configInfo(container) {
  //Pego o nome no prompt, caso seja a primeira vez do usuario
  const nome = prompt("Digite o seu nome: ");

  //Verificose o nome nao esta vazio;
  if (nome && nome.trim() !== "") {
    //caso ele atenda os requisitos eu pego o nome
    const nomeValido = nome;
    //Salvo o nome no localStorage
    localStorage.setItem("nomeDoUsuario", nomeValido);
    //Coloco dentro do container a saudacao
    container.appendChild(criarSaudacao(nomeValido));
    //Caso n atenda aos requisitos, jogo um alerta e defino um nome padrao
  } else {
    alert("Nome inválido. Um nome padrão 'Usuário' será usado.");
    container.appendChild(criarSaudacao("User"));
  }
}

function criarSaudacao(nome) {
  //Criando o elemento p
  const saudacao = document.createElement("p");
  //Adcioanando o meu conteudo
  saudacao.innerHTML = `
    Olá,
    </br> 
    <span>${nome}</span>
    `;
  //Retornando o meu conteudo (saudacao)
  return saudacao;
}

function imgSelecionada(caminhoDaImagem) {
  // 1. Cria o BOTÃO que será clicável
  const btnImg = document.createElement("button");
  btnImg.className = "avatar";
  btnImg.id = "btn-trocar-avatar";
  btnImg.type = "button";

  // 2. Cria a IMAGEM
  const imgAvatar = document.createElement("img");
  imgAvatar.id = "avatar-principal-img";
  imgAvatar.alt = "Avatar do usuário";

  // 3. Define o SRC da imagem com o caminho recebido
  imgAvatar.src = caminhoDaImagem;

  // 4. Coloca a imagem DENTRO do botão
  btnImg.appendChild(imgAvatar);

  // 5. RETORNA o botão completo
  return btnImg;
}

export function inicializarModalSelecaoImg() {
    //Selecioando o meu botao
    const btnImg = document.querySelector("#btn-trocar-avatar");
    //Selecionando o modal no qual qro trabalhar
    const modalSelecaoImg = document.querySelector("#modal-selecao-avatar");
    const opcoesContainer = document.querySelector("#opcoes-avatar");
    const imgAvatar = document.querySelector("#avatar-principal-img");

    //Adicionando uma escuta de click no meu botao
    btnImg.addEventListener('click', () => {
        //Quando ele eh clicado o modal abre
        modalSelecaoImg.style.display = "flex";
    });

    //Caso o usuario click fora do modal ele sera fechado
    modalSelecaoImg.addEventListener('click', (e) => {
        //Verifico se o click foi fora do modal com o conteudo se sim aplico o display none para ele desaparecer
        if(e.target === modalSelecaoImg) {
            modalSelecaoImg.style.display = "none";
        };
    });

    //
    opcoesContainer.addEventListener('click', (e) => {
        //Verificando se o click foi em uma imagem
        if(e.target.tagName === 'IMG') {
            //Caso tenha sido eu pego o src dela atraves do dataset ou do propio src
            const novoSrc = e.target.dataset.avatarSrc || e.target.src;

            //Seto essa minha nova imgaem com a imagem principal do perfil
            imgAvatar.src = novoSrc;

            //Salvo ela no localStorage, para quando atualizar me trazer a imagem ja atualizada
            localStorage.setItem('avatarDoUsuario', novoSrc);

            //Quando eh selecionada uma nova imgaem meu modal fecha
            modalSelecaoImg.style.display = 'none';

            //Aplico una mensagem no meu console so para infromar que a imagem foi trocada com sucesso
            console.log("Novo avatar selecionado e salvo:", novoSrc);
        };
    });
}


