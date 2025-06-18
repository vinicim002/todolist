import {
    inicializarHeader,
    inicializarModalSelecaoImg,
    inicializarDataHora,
    inicializarModalAddTarefas,
    renderizarTarefas,
    inicializarInteracaoTarefas,
    inicializarProcurarTarefa,
    atualizarGrafico,
} from "./modules.js";

document.addEventListener('DOMContentLoaded', () => {
    inicializarHeader();
    inicializarModalSelecaoImg();
    inicializarDataHora();
    inicializarModalAddTarefas();
    inicializarInteracaoTarefas();
    inicializarProcurarTarefa();
    atualizarGrafico();
    
    const tarefasIniciais = JSON.parse(localStorage.getItem('minhasTarefas') || '[]');
    renderizarTarefas(tarefasIniciais);
});



