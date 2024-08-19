document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector('.todo input');
  const addButton = document.querySelector('.btn img');
  const todoList = document.getElementById('todoList');
  const countDisplay = document.querySelector('.count');
  const emptyMessage = document.querySelector('.emty');

  let todos = [];

  function updateCount() {
    countDisplay.textContent = `총 ${todos.length}개`;
    emptyMessage.style.display = todos.length ? 'none' : 'block';
  }

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    todos.push(todoText);
    renderTodos();
    todoInput.value = '';
    updateCount();
  }

  function removeTodo(index) {
    todos.splice(index, 1);
    renderTodos();
    updateCount();
  }

  function renderTodos() {
    todoList.innerHTML = ''; // Clear the list before re-rendering
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.textContent = todo;

      const removeButton = document.createElement('button');
      removeButton.textContent = '삭제';
      removeButton.addEventListener('click', () => removeTodo(index));

      li.appendChild(removeButton);
      todoList.appendChild(li);
    });
  }

  addButton.addEventListener('click', addTodo);

  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  updateCount(); // Initial count update
});
