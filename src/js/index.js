// ==========================================================
// PONTO DE ENTRADA PRINCIPAL DA APLICAÇÃO
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleciona os contêineres principais da UI
    const nameContainer = document.querySelector(".nome-avatar");
    const divDataHora = document.querySelector(".data-hora");

    // 2. Garante que o contêiner de saudação/avatar comece limpo
    nameContainer.innerHTML = "";

    // 3. Pega os dados salvos do armazenamento local
    const nomeSalvo = localStorage.getItem("userName");
    const imgSalva = localStorage.getItem("imgUser");

    // --- Montagem da UI ---

    // 4. Decide se mostra a saudação ou pede o nome
    if (nomeSalvo) {
        // Se já existe um nome, cria e adiciona a saudação
        nameContainer.appendChild(criarSaudacao(nomeSalvo));
    } else {
        // Se for a primeira visita, executa a rotina para pedir o nome
        pedirEConfigurarNome(nameContainer);
    }
    
    // 5. Cria e adiciona o elemento do avatar
    nameContainer.appendChild(criarAvatar(imgSalva));
    
    // 6. Preenche a data e a hora
    dataHora(divDataHora);
    setInterval(()=> {
      dataHora(divDataHora)
    }, 1000);

    // 7. Inicializa toda a lógica interativa do modal (eventos de clique)
    inicializarLogicaDoModal();
    inicializarAdicaoDeTarefas();
});


// ==========================================================
// FUNÇÕES DE INICIALIZAÇÃO DE EVENTOS
// ==========================================================

function inicializarLogicaDoModal() {
    const btnTrocarAvatar = document.querySelector("#btn-trocar-avatar");
    const modal = document.querySelector('#modal-selecao-avatar');
    const opcoesAvatarContainer = document.querySelector('#opcoes-avatar');
    const avatarPrincipalImg = document.querySelector('#avatar-principal-img');

    // Verifica se todos os elementos essenciais foram encontrados
    if (!btnTrocarAvatar || !modal || !opcoesAvatarContainer || !avatarPrincipalImg) {
        console.error("Erro: Não foi possível encontrar um ou mais elementos do modal no DOM.");
        return;
    }

    // Evento para ABRIR o modal
    btnTrocarAvatar.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Evento para FECHAR o modal clicando no fundo (overlay)
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Evento para SELECIONAR um novo avatar
    opcoesAvatarContainer.addEventListener('click', (event) => {
        // Verifica se o clique foi em uma imagem dentro do container
        if (event.target.tagName === 'IMG') {
            const novoSrc = event.target.dataset.avatarSrc;
            
            // Atualiza a imagem principal do avatar
            avatarPrincipalImg.src = novoSrc;
            
            // Salva a escolha no localStorage para persistir
            localStorage.setItem('imgUser', novoSrc);
            
            // Fecha o modal após a escolha
            modal.style.display = 'none';
        }
    });
}

function inicializarAdicaoDeTarefas() {
    const btnAddTarefa = document.querySelector('.btn-adicionar-tarefa');
    const modal = document.querySelector('#modal-adicionar-tarefa');
    const inputTarefa = document.querySelector('#input-nova-tarefa');
    const frm = document.querySelector('#form-nova-tarefa')

    btnAddTarefa.addEventListener('click', () => {
        modal.style.display = "flex";
        inputTarefa.focus();
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.style.display = "none";
    });

    frm.addEventListener('submit', (e) => {
        e.preventDefault();
        //Pegar o valor digitado no input
        const textoDaTarefa  = inputTarefa.value.trim();

        if (textoDaTarefa) {
            // 1. Pega o array de tarefas do localStorage (ou um array vazio)
            const tarefasArray = JSON.parse(localStorage.getItem('minhasTarefas') || '[]' );

            // 2. Adiciona a nova tarefa como um OBJETO ao array
            tarefasArray.push({ texto: textoDaTarefa, concluida: false });

            // 3. Salva o array ATUALIZADO de volta no localStorage
            localStorage.setItem('minhasTarefas', JSON.stringify(tarefasArray));

            console.log("Tarefa adicionada! Lista atual:", tarefasArray);

            // Limpa o input e fecha o modal
            inputTarefa.value = '';
            modal.style.display = 'none';

            renderizarTarefas(tarefasArray); 
        }

    })
}

// ==========================================================
// FUNÇÕES AUXILIARES E "FÁBRICA" (CRIADORAS DE ELEMENTOS)
// ==========================================================


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
        container.appendChild(criarSaudacao(nomeValido));
    } else {
        alert("Nome inválido. Um nome padrão 'Usuário' será usado.");
        container.appendChild(criarSaudacao("Usuário"));
    }
}

function criarAvatar(caminhoDaImagem) {
    const btnAvatar = document.createElement("button");
    btnAvatar.className = "avatar";
    btnAvatar.id = "btn-trocar-avatar";

    const imgAvatar = document.createElement("img");
    imgAvatar.id = "avatar-principal-img";
    imgAvatar.src = caminhoDaImagem || "src/img/img01.jpg"; // Usa a imagem salva ou uma padrão
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
        hour: '2-digit',
        minute: '2-digit'
    });

    container.appendChild(data);
    container.appendChild(hora);
}


function criarElementoTarefa(texto) {
    const li = document.createElement("li");

    li.innerHTML = `<label>
            <input type="checkbox" />
            ${texto}
          </label>
          <button class="btn-delete" aria-label="Deletar tarefa">
            <i class="fa-solid fa-trash"></i>
          </button>`;

    return li;
}

function renderizarTarefas(minhasTarefas) {
    const ul = document.querySelector("ul");

    ul.innerHTML = '';

    minhasTarefas.forEach((tarefaObj) => {
        const novoLi = criarElementoTarefa(tarefaObj.texto);
        ul.appendChild(novoLi);
    })
}