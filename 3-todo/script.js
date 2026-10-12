const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value;
  errorEl.hidden = true;

  //Проверка на пустую строку или строку с пробелами
  if (text.trim() === "") {
    errorEl.hidden = false;
    return;
  }

  tasks.push({id: nextId++, text: text, done: false});
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);
  task.done = true;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  render();
}

function clearCompleted() {
  tasks = [];
  render();
}

function getVisibleTasks() {
  return tasks;
}

function updateCounter() {
  counter.textContent = `Активных задач: ${tasks.length}`;
}

function render() {
  //Очищаем все прошлые задачи во избежание дублирования
  list.innerHTML = "";
  const visible = getVisibleTasks();
  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    const listElement = document.createElement("li");
    listElement.className = "task";


    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));
    if (task.done) {
      span.classList.add("done");
    }

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    listElement.appendChild(span);
    listElement.appendChild(del);
    list.appendChild(listElement);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
