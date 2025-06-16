document.addEventListener('DOMContentLoaded', () => {
    inicializarHeader();
});

function inicializarHeader() {
    const containerNomeAvatar = document.querySelector('.nome-avatar');

    containerNomeAvatar.innerHTML = '';

    if(localStorage.getItem('nomeDoUsuario')) {
        containerNomeAvatar.innerHTML = `
            <p>Olá,
            </br>
            ${localStorage.getItem('nomeDoUsuario')}</p>
        `
    } else {
        const nome = prompt("Digite seu nome: ");
        localStorage.setItem('nomeDoUsuario', nome);
    }
}