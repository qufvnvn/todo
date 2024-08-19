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

    todos.push({ text: todoText, completed: false });
    renderTodos();
    todoInput.value = '';
    updateCount();
  }

  function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }

  function editTodo(index) {
    const newTodoText = prompt('할 일을 수정하세요.', todos[index].text);
    if (newTodoText !== null) {
      todos[index].text = newTodoText.trim();
      renderTodos();
    }
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

      // Checkbox for marking as complete
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => toggleComplete(index));

      // Task text
      const span = document.createElement('span');
      span.textContent = todo.text;
      if (todo.completed) {
        span.style.textDecoration = 'line-through';
        span.style.color = '#888'; // Optional: Change color for completed tasks
      }

      // Edit button
      const editButton = document.createElement('button');
      editButton.textContent = '수정';
      editButton.addEventListener('click', () => editTodo(index));

      // Delete button
      const removeButton = document.createElement('button');
      removeButton.textContent = '삭제';
      removeButton.addEventListener('click', () => removeTodo(index));

      li.appendChild(checkbox); // Add checkbox to the left
      li.appendChild(span); // Add the task text
      li.appendChild(editButton); // Add edit button
      li.appendChild(removeButton); // Add delete button

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
