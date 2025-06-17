import {
    inicializarHeader,
    inicializarModalSelecaoImg,
    inicializarDataHora,
    inicializarModalAddTarefas,
    renderizarTarefas,
    inicializarInteracaoTarefas,
} from "./modules.js";

document.addEventListener('DOMContentLoaded', () => {
    inicializarHeader();
    inicializarModalSelecaoImg();
    inicializarDataHora();
    inicializarModalAddTarefas();
    inicializarInteracaoTarefas();
    
    const tarefasIniciais = JSON.parse(localStorage.getItem('minhasTarefas') || '[]');
    renderizarTarefas(tarefasIniciais);
});



