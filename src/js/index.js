import {
    inicializarHeader,
    inicializarModalSelecaoImg,
    inicializarDataHora,
    inicializarModalAddTarefas,
    renderizarTarefas,
    inicializarInteracaoTarefas,
    inicializarProcurarTarefa,
} from "./modules.js";

document.addEventListener('DOMContentLoaded', () => {
    inicializarHeader();
    inicializarModalSelecaoImg();
    inicializarDataHora();
    inicializarModalAddTarefas();
    inicializarInteracaoTarefas();
    inicializarProcurarTarefa();
    
    const tarefasIniciais = JSON.parse(localStorage.getItem('minhasTarefas') || '[]');
    renderizarTarefas(tarefasIniciais);
});



