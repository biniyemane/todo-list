// when we press 'Enter' key todo will be loaded
document.getElementById('todoInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

//add new todo in 'li', clear input field, and wait 1 second and remove on click
function addTodo() {
    const input = document.getElementById('todoInput');
    const newTodoText = input.value.trim();
    if (newTodoText === '') return;

    const li = document.createElement('li');
    li.textContent = newTodoText;
    li.addEventListener('click', function() {
        this.classList.add('completed');
        setTimeout(() => {
            this.remove();
            updateLocalStorage();
        }, 1000);
    });
    
    document.getElementById('todoList').appendChild(li);
    input.value = '';

    updateLocalStorage();
}

//upon refrshing page, existing todos remain on page from locaStorage until clecked and removed
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todoText => {
        const li = document.createElement('li');
        li.textContent = todoText;
        li.addEventListener('click', function() {
            this.classList.add('completed');
            setTimeout(() => {
                this.remove();
                updateLocalStorage();
            }, 1000);
        });
        document.getElementById('todoList').appendChild(li);
    });
}

//this take each todoes and put them in an array, and store it in localStorage
function updateLocalStorage() {
    const todos = [];
    document.querySelectorAll('#todoList li').forEach(todo => {
        todos.push(todo.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

window.onload = loadTodos;      //this will persist our todos even we refresh page
