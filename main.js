document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector('.add input');
  const addBtn = document.querySelector('.btn_add img');
  const todoList = document.querySelector('.todoList');
  const countDisplay = document.querySelector('.count');
  const emptyMessage = document.querySelector('.empty');
  const remainingCountDisplay = document.querySelector('.remainingCount');

  // 할일 개수를 업데이트하는 함수
  function updateCount() {
    const items = document.querySelectorAll('.todoItem');
    countDisplay.textContent = `총 ${items.length}개`;
    emptyMessage.style.display = items.length === 0 ? 'block' : 'none';
    updateRemainingCount();
  }

  // 남은 할일 개수를 업데이트하는 함수
  function updateRemainingCount() {
    const uncheckedItems = document.querySelectorAll(
      '.todoItem .box:not(:checked)'
    );
    if (uncheckedItems.length === 0) {
      remainingCountDisplay.style.display = 'none'; // 남은 할일이 없으면 숨기기
    } else {
      remainingCountDisplay.style.display = 'block';
      remainingCountDisplay.textContent = `할 일이 ${uncheckedItems.length}개 남았습니다.`;
    }
  }

  // 새로운 항목을 리스트에 추가하는 함수
  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    // 새로운 할 일 항목 생성
    const todoItem = document.createElement('div');
    todoItem.className = 'todoItem';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'box';
    checkbox.style.marginRight = '10px';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        span.style.textDecoration = 'line-through';
        span.style.color = 'gray';
      } else {
        span.style.textDecoration = 'none';
        span.style.color = 'black';
      }
      updateRemainingCount();
    });

    const span = document.createElement('span');
    span.textContent = todoText;
    span.style.flexGrow = '1';

    const editBtn = document.createElement('div');
    editBtn.className = 'btn_edit';
    editBtn.style.marginLeft = '10px';
    editBtn.innerHTML = '<img src="./img/edit.png" alt="edit" />';
    editBtn.addEventListener('click', () => {
      const newTodoText = prompt(
        '수정할 내용을 입력해주세요:',
        span.textContent
      );
      if (newTodoText !== null && newTodoText.trim() !== '') {
        span.textContent = newTodoText.trim();
      }
    });

    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'btn_delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.innerHTML = '<img src="./img/delete.png" alt="delete" />';
    deleteBtn.addEventListener('click', () => {
      todoList.removeChild(todoItem);
      updateCount();
    });

    // 리스트에 항목 추가
    todoItem.appendChild(checkbox);
    todoItem.appendChild(span);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem); // 리스트 맨 아래에 추가

    // 입력 필드 초기화 및 카운트 업데이트
    todoInput.value = '';
    updateCount();
  }

  // 엔터 키로 항목 추가
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  // 추가 버튼 클릭으로 항목 추가
  addBtn.addEventListener('click', addTodo);

  // 초기 카운트 업데이트
  updateCount();
});
