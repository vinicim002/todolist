// É uma boa prática selecionar os elementos do DOM depois que ele foi carregado.
// Vamos mover esta linha para dentro do addEventListener.
// let nameContainer = document.querySelector(".nome-avatar"); 

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o container aqui, garantindo que ele já existe na página.
    const nameContainer = document.querySelector(".nome-avatar");
    
    const nomeSalvo = localStorage.getItem("userName");

    // Se 'nomeSalvo' tiver um valor (não for null ou undefined), o 'if' será verdadeiro.
    if (nomeSalvo) {
        mostrarSaudacao(nomeSalvo, nameContainer);
    } else {
        promptParaNome(nameContainer);
    }
});

function mostrarSaudacao(nome, container) {
    // Limpando qualquer conteúdo anterior
    container.innerHTML = '';

    const saudacao = document.createElement('p');
    saudacao.innerHTML = `Olá, <span>${nome}</span>`;
    
    // Bônus: Recriando o avatar que era apagado pelo innerHTML
    const avatar = document.createElement('div');
    avatar.className = 'avatar';

    container.appendChild(saudacao);
    container.appendChild(avatar);
}

function promptParaNome(container) {
    const nome = prompt("Qual é o seu nome?");

    // nome.trim() remove espaços em branco do início e do fim.
    if (nome && nome.trim() !== '') {
        localStorage.setItem('userName', nome.trim());
        
        // Agora que salvamos, podemos simplesmente chamar a outra função
        // para mostrar a saudação. Isso evita repetir código!
        mostrarSaudacao(nome.trim(), container);
    } else {
        // Se o usuário não digitou um nome, podemos pedir de novo
        // ou mostrar um nome padrão.
        alert("Nome inválido. Tente novamente.");
        promptParaNome(container); // Pede o nome de novo (recursividade)
    }
}