/*============================
    Variáveis e Array
=============================*/ 
// Função auxiliar para obter elementos por ID
let id = (id) => document.querySelector(`#${id}`);
// Obtenção de referências a elementos HTML importantes
const taskForm = id('task-form'),
taskLabel = id('task-label'),
taskInput = id('task-input'),
addTaskBtn = id('add-task-btn'),
taskListUl= id('task-list'); 
// Array para armazenar tarefas
let tasks = [];

/*============================
    Submit Form Event
=============================*/ 
// Evento de envio do formulário
taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página ao pressionar o botão
    
    const taskInputValue = taskInput.value; // Obtém o valor do campo de entrada

    // Verifica a validade da tarefa inserida
    if(taskInputValue.length < 3) {
        alert("Sua tarefa precisa de pelo menos 3 caracteres."); 
        return;
    };
    
    // Adiciona um objeto representando a tarefa ao array
    tasks.push({
        title: taskInputValue,
        dona: false
    });  

    // Armazena a versão atualizada do array na local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Chama a função para renderizar a tarefa na interface do usuário
    taskRendering(taskInputValue);

    // Limpa o campo de entrada após o envio da tarefa
    taskInput.value = '';     
});

/*============================
    Criando Elementos de HTML
=============================*/ 
// Função para renderizar tarefas na interface do usuário
function taskRendering(title, done = false) { 
    //Criando li
    const li = document.createElement('li'); 

    //Criando input
    const input = document.createElement('input');  
    input.setAttribute('type', 'checkbox'); 
    input.addEventListener("click", (event) => {
        const thisTask = event.target.parentElement; 
        const done = event.target.checked;
        // Condição do evento        
        const thisSpan = thisTask.querySelector('span');
        if(done) {
            thisSpan.style.textDecoration = 'line-through'; 
        } else {
            thisSpan.style.textDecoration = 'none';
        }

        // Alteração no Array usando map
        tasks.map(t => { 
            if(t.title === thisTask.textContent) {
                return {
                    title: t.title,
                    done: true
                };
            }; 

            return t; 
        });

        // Salva a possível alteração no objeto causada pelo evento na local storage 
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    // Configuração do checkbox
    input.checked = done;

    //Criando span
    const span = document.createElement('span'); 
    span.textContent = title; 
    if (done) {
        span.style.textDecoration = 'line-through'; 
    };

    //Criando o button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover item';
    removeBtn.addEventListener("click", (event) => {
        const taskToBeRemoved = event.target.parentElement; 
        const titleTaskToBeRemoved = taskToBeRemoved.querySelector('span').textContent; 
        
        // Remoção do Array usando filter
        tasks = tasks.filter(t => t.title != titleTaskToBeRemoved);
        
        // Remoção do elemento HTML
        taskListUl.removeChild(taskToBeRemoved);
        
        // Atualização na local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // Adiciona os elementos criados ao DOM
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(removeBtn);
    taskListUl.appendChild(li);
};

/*============================
    Local Storage Config
=============================*/ 
// Carrega tarefas salvas na local storage quando a janela é carregada
window.onload = () => { 
    const tasksOnLocalStorage = localStorage.getItem('tasks');
  
    // Se não há tarefas armazenadas, retorna
    if (!tasksOnLocalStorage) return; 

    // Parse do JSON para obter o array de tarefas
    tasks = JSON.parse(tasksOnLocalStorage); 
    
    // Renderiza cada tarefa na interface do usuário
    tasks.forEach(t => {
        taskRendering(t.title, t.done);
    });
};