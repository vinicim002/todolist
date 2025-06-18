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
  //Selecionando o botao
  const btnAdicionar = document.querySelector(".btn-adicionar-tarefa");
  //Selecionando o modal
  const modal = document.querySelector("#modal-adicionar-tarefa");
  //Selecionando o input
  const inputTarefa = document.querySelector("#input-nova-tarefa");
  //Selecionando o form
  const frm = document.querySelector("#form-nova-tarefa");

  //Fazendo uma escuta de click no botao de adiconar tarefa para ativar o modal
  btnAdicionar.addEventListener("click", (e) => {
    modal.style.display = "flex";
  });

  //Fazendo uma escuta de click do lado de fora do meu modal 
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  //Fazendo uma escuta de submit no meu form
  frm.addEventListener("submit", (e) => {
    //Prevenindo o envio do meu form
    e.preventDefault();

    //Pegando a tarefa digitada pelo o usuario
    const textoDaTarefa = inputTarefa.value.trim();

    //Verifico se vfoi digitado algo, se sim ele entra NO IF
    if (textoDaTarefa) {
      //Criando um array onde ele recebe os dados do localstorage e passa para objetos(no primeiro momento ele ta com as info como string) ou ele cria um array vazio caso nao exista nada no localstorage
      const arrayTarefas = JSON.parse(
        localStorage.getItem("minhasTarefas") || "[]"
      );
      //Ele adiciona a nova tarefa dentro do array de objetos 
      arrayTarefas.push({ texto: textoDaTarefa, concluida: false });
      //Salva esse novo objeto no localsotrage, mas passando o arrayTarefas para string
      localStorage.setItem("minhasTarefas", JSON.stringify(arrayTarefas));
    
      console.log("Tarefa adicionada! Lista atual:", arrayTarefas);

      //Escaziando o input
      inputTarefa.value = "";
      //Fechando o modal apos o envio da tarefa
      modal.style.display = "none";

      //Recarrego as tarefas
      renderizarTarefas(arrayTarefas);
    }
  });
}

export function renderizarTarefas(arrayTarefas) {
  //Selecionando o container da ul
  const container = document.querySelector(".tarefas");

  //Limpando o container
  container.innerHTML = "";

  //Faco um forEach para pecorrer o meu array de objetos, pegando o conteudo e sua posicao
  arrayTarefas.forEach((tarefaObj, index) => {
    //chamando a func criarElementoTarefa() e passando meus args q nesse caso eh o texto da tarefa, se ta concluido ou nao e a posicao e ele tera q me retonar uma li estruturada
    const novoLi = criarElementoTarefa(
      tarefaObj.texto,
      tarefaObj.concluida,
      index
    );
    //Apos a li ser estruturada adiciono ela dentro do meu container (ul)
    container.appendChild(novoLi);
  });
}

//Funcao para cirar a li
function criarElementoTarefa(texto, concluida, index) {
  //Cirando a li
  const li = document.createElement("li");

  //caso a li seja marcada como concluida ou seja caso ela seja true eu adiciono uma class ne de "tarefa-concluida" 
  if (concluida) {
    li.classList.add("tarefa-concluida");
  }

  //Criando do li
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
  //Selecionado a ul
    const listaTarefasUI = document.querySelector(".tarefas");

    //Escutando o click dentro da ul
    listaTarefasUI.addEventListener("click", (event) => {
        
      //Pegando o elemnto clicado
        const elementoClicado = event.target;

        //Se o click foi em um checkbox ele entra nesse if
        if (elementoClicado.type === "checkbox") {
            
            //Pego o indice dele, para isso transformo meu indice em um inteiro, pois ele vem como string e pego o valor
            const index = parseInt(elementoClicado.dataset.index, 10);

            // Executa o ciclo "Ler -> Modificar -> Salvar"
            const tarefasArray = JSON.parse(localStorage.getItem("minhasTarefas") || "[]");
            // Inverte o valor booleano: se era true vira false, e vice-versa
            tarefasArray[index].concluida = !tarefasArray[index].concluida;
            localStorage.setItem("minhasTarefas", JSON.stringify(tarefasArray));
            
            // Re-renderiza toda a lista para refletir a mudança visual (ex: texto riscado)
            renderizarTarefas(tarefasArray);
        }

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

export function inicializarProcurarTarefa() {
    const inputPesquisa = document.querySelector('.barra-de-pesquisa input');
    const containerTarefas = document.querySelector('.tarefas');
    
    inputPesquisa.addEventListener('input', () => {
        //Pega o termo da busca e converte para minúsculas para uma busca não sensível a maiúsculas/minúsculas
        const termoBusca = inputPesquisa.value.toLowerCase();

        //Pega todos os <li> que estão na lista no momento
        const todasAsTarefas = containerTarefas.querySelectorAll('li');

        //Percorre cada <li>
        todasAsTarefas.forEach(tarefaLi => {
            //Pega o texto da tarefa e também converte para minúsculas
            const textoTarefa = tarefaLi.textContent.toLowerCase();
            console.log(textoTarefa);

            //Verifica se o texto da tarefa inclui o termo da busca
            if (textoTarefa.includes(termoBusca)) {
                //Se incluir, mostra o <li> (garantindo o display correto)
                tarefaLi.style.display = 'flex'; 
            } else {
                //Se não incluir, esconde o <li>
                tarefaLi.style.display = 'none';
            }
        });
    });
}
