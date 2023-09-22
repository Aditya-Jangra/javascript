let todoList = [];

function renderTodoList() {
  const todoListEl = document.getElementById('todoList');
  todoListEl.innerHTML = '';

  todoList.forEach((todo, index) => {
    const todoEl = document.createElement('div');
    todoEl.classList.add('todo');

    const todoTextEl = document.createElement('span');
    todoTextEl.innerText = todo.text;

    const todoDeleteEl = document.createElement('button');
    todoDeleteEl.innerText = 'X';
    todoDeleteEl.classList.add('todoDelete');
    todoDeleteEl.addEventListener('click', () => {
      deleteTodoItem(index);
    });

    todoEl.appendChild(todoTextEl);
    todoEl.appendChild(todoDeleteEl);

    todoListEl.appendChild(todoEl);
  });
}

function addTodoItem(text) {
  const todoItem = {
    text,
    createdTime: new Date(),
  };
  todoList.push(todoItem);
  renderTodoList();
}

function deleteTodoItem(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

chrome.storage.sync.get('todoList', (data) => {
  if (data.todoList) {
    todoList = data.todoList;
    renderTodoList();
  }
});

function saveTodoList() {
  chrome.storage.sync.set({ todoList }, () => {
    console.log('Todo list saved!');
  });
}

setInterval(() => {
  const now = new Date();
  todoList = todoList.filter((todo) => {
    return now.getTime() - new Date(todo.createdTime).getTime() < 24 * 60 * 60 * 1000;
  });
  renderTodoList();
  saveTodoList();
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const saveBtn = document.getElementById('saveBtn');

  saveBtn.addEventListener('click', () => {
    addTodoItem(todoInput.value);
    todoInput.value = '';
    saveTodoList();
  });

  renderTodoList();
});


