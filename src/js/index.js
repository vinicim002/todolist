document.addEventListener('DOMContentLoaded', () => {
    inicializarHeader();
});

function inicializarHeader() {
    //Selecionando o container no qual quero trabalhar
    const containerNomeAvatar = document.querySelector('.nome-avatar');

    containerNomeAvatar.innerHTML = '';

    //Verifico se existe dados salvos - Sera retornado true ou false
    const nomeSalvo = localStorage.getItem('nomeDoUsuario');
    const imgSalva = localStorage.getItem('avatarDoUsuario');

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

    containerNomeAvatar.appendChild(imgSelecionada(caminhoFinalDoAvatar))
}


function criarSaudacao(nome) {

}

function caminhoDaImg() {

}

function imgSelecionada() {
    
}

/**
 * Orquestra a criação do header, decidindo se mostra os dados salvos
 * ou pede as informações para um novo usuário.
 */
// function inicializarHeader() {
//     const nameContainer = document.querySelector(".nome-avatar");
//     nameContainer.innerHTML = ""; // Limpa a área para garantir uma renderização limpa

//     // 1. LÊ os dados que já estão salvos
//     const nomeSalvo = localStorage.getItem("userName");
//     const imgSalva = localStorage.getItem("imgUser");

//     // Lógica para o nome
//     if (nomeSalvo) {
//         // Se o nome existe, cria e adiciona o elemento de saudação
//         nameContainer.appendChild(criarSaudacao(nomeSalvo));
//     } else {
//         // Se não existe, executa a rotina de boas-vindas para novos usuários
//         pedirEConfigurarNome(nameContainer);
//     }

//     // Lógica para o avatar
//     // 2. DECIDE qual caminho de imagem usar
//     // Se 'imgSalva' existir, usa ele. Senão (||), usa a imagem padrão.
//     const caminhoFinalDoAvatar = imgSalva || "src/img/img01.jpg"; 

//     // 3. CONSTRÓI o avatar com o caminho correto e o adiciona
//     nameContainer.appendChild(criarAvatar(caminhoFinalDoAvatar));
// }

// function pedirEConfigurarNome(container) {
//     const nome = prompt("Bem-vindo! Qual é o seu nome?");

//     if (nome && nome.trim() !== "") {
//         const nomeValido = nome.trim();
//         localStorage.setItem("userName", nomeValido);
//         // Exibe a saudação imediatamente para o novo usuário
//         container.appendChild(criarSaudacao(nomeValido));
//     } else {
//         alert("Nome inválido. Um nome padrão 'Usuário' será usado.");
//         // Exibe um nome padrão se o usuário cancelar ou não digitar nada
//         container.appendChild(criarSaudacao("Usuário"));
//     }
// }

// function criarSaudacao(nome) {
//     const saudacao = document.createElement("p");
//     // Adicionei uma classe para facilitar a estilização, se necessário
//     saudacao.className = "saudacao-usuario"; 
//     saudacao.innerHTML = `Olá, <span>${nome}</span>`;
//     return saudacao;
// }

// function criarAvatar(caminhoDaImagem) {
//     const btnAvatar = document.createElement("button");
//     btnAvatar.className = "avatar";
//     btnAvatar.id = "btn-trocar-avatar";
//     btnAvatar.type = "button";

//     const imgAvatar = document.createElement("img");
//     imgAvatar.id = "avatar-principal-img";
//     imgAvatar.src = caminhoDaImagem; // Usa o caminho recebido como argumento
//     imgAvatar.alt = "Avatar do usuário";

//     btnAvatar.appendChild(imgAvatar);
//     return btnAvatar;
// }