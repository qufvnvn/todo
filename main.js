document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('.btn_add img');
  const inputField = document.querySelector('.add input');
  const todoList = document.querySelector('.todoList');
  const countElement = document.querySelector('.count');
  const remainingCountElement = document.querySelector('.remainingCount');
  const emptyMessage = document.querySelector('.empty');

  // 항목을 추가하는 함수
  function addTodoItem(text) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todoItem';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'box';
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        this.nextElementSibling.style.textDecoration = 'line-through';
      } else {
        this.nextElementSibling.style.textDecoration = 'none';
      }
      updateRemainingCount();
    });

    const span = document.createElement('span');
    span.textContent = text;

    const editIcon = document.createElement('img');
    editIcon.src = './img/edit.png';
    editIcon.alt = 'edit';
    editIcon.addEventListener('click', function () {
      const newText = prompt('수정할 내용을 입력하세요', span.textContent);
      if (newText) {
        span.textContent = newText;
      }
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = './img/delete.png';
    deleteIcon.alt = 'delete';
    deleteIcon.addEventListener('click', function () {
      todoItem.remove();
      updateRemainingCount();
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(span);
    todoItem.appendChild(editIcon);
    todoItem.appendChild(deleteIcon);

    todoList.appendChild(todoItem);
    updateRemainingCount();
  }

  // 남은 할일 개수를 업데이트하는 함수
  function updateRemainingCount() {
    const todos = document.querySelectorAll('.todoItem');
    const remaining = Array.from(todos).filter(
      (item) => !item.querySelector('.box').checked
    ).length;
    const total = todos.length;

    countElement.textContent = `총 ${total}개`;

    if (remaining > 0) {
      remainingCountElement.textContent = `할 일이 ${remaining}개 남았습니다.`;
      remainingCountElement.style.display = 'block';
    } else if (total > 0) {
      remainingCountElement.textContent = '할 일을 모두 완료했습니다.';
      remainingCountElement.style.display = 'block';
    } else {
      remainingCountElement.style.display = 'none';
    }

    emptyMessage.style.display = total === 0 ? 'block' : 'none';
  }

  // 입력 필드에서 엔터 키를 눌렀을 때 항목 추가
  inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && this.value.trim() !== '') {
      addTodoItem(this.value.trim());
      this.value = '';
    }
  });

  // 추가 버튼 클릭 시 항목 추가
  addButton.addEventListener('click', function () {
    if (inputField.value.trim() !== '') {
      addTodoItem(inputField.value.trim());
      inputField.value = '';
    }
  });
});
