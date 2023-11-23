function startTimer(duration, display){
   
    var timer = duration, minutes, seconds;

    setInterval(function(){
        

        minutes = parseInt(timer /60, 10);
        seconds = parseInt(timer % 60,10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes  + ":" + seconds;

        if(--timer <0){
            timer = duration;
        }
    }, 1000);
}


window.onload = function() {
    const start = document.getElementById("start");

    start.addEventListener('click', function() {
        var duration = 60 * 25; // Para segundos
        var display = document.querySelector("#timer"); // Onde exibiremos o contador

        startTimer(duration, display); // Inicia a função
    });
}


function adicionarTarefa() {
    let inputTarefas = document.getElementById('input-tarefas');
    let tarefa = inputTarefas.value.trim();

    if (tarefa.length > 0) {
        // Obter tarefas do localStorage
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        // Adicionar a nova tarefa ao array
        tarefas.push(tarefa);

        // Salvar o array atualizado no localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Limpar o campo de entrada
        inputTarefas.value = '';
    }

    // Atualizar a lista na tela
    exibirTarefas();
}

// Exibir as tarefas na lista na tela
function exibirTarefas() {
    let listaAfazeres = document.getElementById('listaAfazeres');

    // Limpar a lista atual
    listaAfazeres.innerHTML = '';

    // Obter tarefas do localStorage
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Adicionar tarefas à lista na tela
    tarefas.forEach((tarefa, index) => {
        let li = document.createElement('li');
        li.textContent = tarefa;

        // Adicionar um botão de exclusão a cada tarefa
        let btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => excluirTarefa(index));

        li.appendChild(btnExcluir);
        listaAfazeres.appendChild(li);
    });
}

// Excluir uma tarefa do array e do localStorage
function excluirTarefa(index) {
    // Obter tarefas do localStorage
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Remover a tarefa do array
    tarefas.splice(index, 1);

    // Salvar o array atualizado no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    
    exibirTarefas();
}

window.onload = exibirTarefas;

document.getElementById('add-tarefa').addEventListener('click', adicionarTarefa);