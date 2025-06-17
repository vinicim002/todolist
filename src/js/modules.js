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
  btnImg.addEventListener("click", () => {
    //Quando ele eh clicado o modal abre
    modalSelecaoImg.style.display = "flex";
  });

  //Caso o usuario click fora do modal ele sera fechado
  modalSelecaoImg.addEventListener("click", (e) => {
    //Verifico se o click foi fora do modal com o conteudo se sim aplico o display none para ele desaparecer
    if (e.target === modalSelecaoImg) {
      modalSelecaoImg.style.display = "none";
    }
  });

  //
  opcoesContainer.addEventListener("click", (e) => {
    //Verificando se o click foi em uma imagem
    if (e.target.tagName === "IMG") {
      //Caso tenha sido eu pego o src dela atraves do dataset ou do propio src
      const novoSrc = e.target.dataset.avatarSrc || e.target.src;

      //Seto essa minha nova imgaem com a imagem principal do perfil
      imgAvatar.src = novoSrc;

      //Salvo ela no localStorage, para quando atualizar me trazer a imagem ja atualizada
      localStorage.setItem("avatarDoUsuario", novoSrc);

      //Quando eh selecionada uma nova imgaem meu modal fecha
      modalSelecaoImg.style.display = "none";

      //Aplico una mensagem no meu console so para infromar que a imagem foi trocada com sucesso
      console.log("Novo avatar selecionado e salvo:", novoSrc);
    }
  });
}

export function inicializarDataHora() {
  //Seleciono o meu container
  const container = document.querySelector(".data-hora");

  //Limpo o campo da data
  container.innerHTML = "";
  //Crio o meu elemento p para a data
  const pData = document.createElement("p");
  //Aplico uma class
  pData.className = "data";
  //Crio o meu elemento p para a hora
  const pHora = document.createElement("p");
  //Aplico uma class
  pHora.className = "hora";

  //Adicionando o elemento p no meu container
  container.appendChild(pData);
  //Adicionando o elemento p no meu container
  container.appendChild(pHora);

  //Funcao para atualizar o relogio constantemente
  const atualizarRelogio = () => {
    //Pego a data atual
    const agora = new Date();

    //Formato a data
    const dataFormatada = agora.toLocaleDateString("pt-BR");
    //Formato a hora
    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    //Elemento p recebendo a data formatada
    pData.textContent = dataFormatada;
    //Elemento p recebendo a hora formatada
    pHora.textContent = horaFormatada;
  };

  atualizarRelogio();
  //Crio um setInterval para atualizara a cada 1 seg
  setInterval(atualizarRelogio, 1000);
}

export function inicializarModalAddTarefas() {
  const btnAdicionar = document.querySelector(".btn-adicionar-tarefa");
  const modal = document.querySelector("#modal-adicionar-tarefa");
  const inputTarefa = document.querySelector("#input-nova-tarefa");
  const frm = document.querySelector("#form-nova-tarefa");

  btnAdicionar.addEventListener("click", (e) => {
    modal.style.display = "flex";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  frm.addEventListener("submit", (e) => {
    e.preventDefault();

    const textoDaTarefa = inputTarefa.value.trim();

    if (textoDaTarefa) {
      const arrayTarefas = JSON.parse(
        localStorage.getItem("minhasTarefas") || "[]"
      );
      arrayTarefas.push({ texto: textoDaTarefa, concluida: false });
      localStorage.setItem("minhasTarefas", JSON.stringify(arrayTarefas));
      console.log("Tarefa adicionada! Lista atual:", arrayTarefas);

      inputTarefa.value = "";
      modal.style.display = "none";

      renderizarTarefas(arrayTarefas);
    }
  });
}

export function renderizarTarefas(arrayTarefas) {
  const container = document.querySelector(".tarefas");

  container.innerHTML = "";

  arrayTarefas.forEach((tarefaObj, index) => {
    const novoLi = criarElementoTarefa(
      tarefaObj.texto,
      tarefaObj.concluida,
      index
    );
    container.appendChild(novoLi);
  });
}

function criarElementoTarefa(texto, concluida, index) {
  const li = document.createElement("li");

  if (concluida) {
    li.classList.add("tarefa-concluida");
  }

  li.innerHTML = `
        <label>
            <input 
                type="checkbox" 
                ${concluida ? "checked" : ""} 
                data-index="${index}"
            >
            <p>${texto}</p>
        </label>
        <button class="btn-delete" data-index="${index}" aria-label="Deletar tarefa">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

  return li;
}

export function inicializarInteracaoTarefas() {
    const listaTarefasUI = document.querySelector(".tarefas");

    listaTarefasUI.addEventListener("click", (event) => {
        
        const elementoClicado = event.target;

        if (elementoClicado.type === "checkbox") {
            
            // Pega o índice da tarefa a partir do atributo 'data-index' do checkbox
            const index = parseInt(elementoClicado.dataset.index, 10);

            // Executa o ciclo "Ler -> Modificar -> Salvar"
            const tarefasArray = JSON.parse(localStorage.getItem("minhasTarefas") || "[]");
            // Inverte o valor booleano: se era true vira false, e vice-versa
            tarefasArray[index].concluida = !tarefasArray[index].concluida;
            localStorage.setItem("minhasTarefas", JSON.stringify(tarefasArray));
            
            // Re-renderiza toda a lista para refletir a mudança visual (ex: texto riscado)
            renderizarTarefas(tarefasArray);
        }

        // --- LÓGICA PARA DELETAR TAREFA ---
        // Verifica se o elemento clicado (ou seu pai mais próximo) é o botão de deletar
        if (elementoClicado.closest(".btn-delete")) {
            
            // Pega o botão para garantir que temos o data-index correto
            const botao = elementoClicado.closest(".btn-delete");
            const index = parseInt(botao.dataset.index, 10);

            // Confirmação opcional, mas uma boa prática de UX
            const confirmar = confirm("Tem certeza que deseja deletar esta tarefa?");
            
            if (confirmar) {
                // Executa o ciclo "Ler -> Modificar -> Salvar"
                const tarefasArray = JSON.parse(localStorage.getItem("minhasTarefas") || "[]");
                // Remove 1 item do array na posição 'index'
                tarefasArray.splice(index, 1);
                localStorage.setItem("minhasTarefas", JSON.stringify(tarefasArray));

                // Re-renderiza a lista sem o item deletado
                // Precisamos ler de novo para passar o array correto, pois o 'splice' modifica o original
                const tarefasAtualizadas = JSON.parse(localStorage.getItem("minhasTarefas"));
                renderizarTarefas(tarefasAtualizadas);
            }
        }
    });
}
