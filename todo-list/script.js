const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

document.addEventListener('DOMContentLoaded', loadTodos);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo = null) {
    const todoText = todo ? todo.text : input.value.trim();

    if (!todoText) return;

    const todoEl = document.createElement('li');
    todoEl.innerText = todoText;
    todoEl.dataset.completed = todo?.completed || false;
    
    if (todo?.completed) {
        todoEl.classList.add('completed');
    }

    // Click to toggle completed state
    todoEl.addEventListener('click', () => {
        todoEl.classList.toggle('completed');
        todoEl.dataset.completed = todoEl.classList.contains('completed');
        updateLS();
    });

    // Right-click to delete
    todoEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        todoEl.remove();
        updateLS();
    });

    todosUL.appendChild(todoEl);

    if (!todo) input.value = ''; // Clear input only if manually added

    updateLS();
}

function updateLS() {
    const todos = Array.from(document.querySelectorAll('li')).map(todoEl => ({
        text: todoEl.innerText,
        completed: todoEl.dataset.completed === "true"
    }));

    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(addTodo);
}
