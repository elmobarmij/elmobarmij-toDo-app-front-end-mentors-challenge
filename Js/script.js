const inputTodo = document.querySelector(".create-todo");
const todoCheckIcon = document.querySelector(".todo-check");
const todosContainer = document.querySelector(".todos-container");
const itemsCounter = document.querySelectorAll(".items-counter");

let clearCompleted = false;
let globalTodoItems = [];
let numberOfTodos = 0;

// Button list
const btnAll = document.querySelector(".btn__all");
const btnActive = document.querySelector(".btn__active");
const btnCompleted = document.querySelector(".btn__completed");
const btnClear = document.querySelector(".btn__clear");
const clearBtns = document.querySelectorAll(".btn__clear");

// Toggle Dark Mode
document.getElementById("btnSwitch").addEventListener("click", () => {
  if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
    document.documentElement.setAttribute("data-bs-theme", "light");
    document.querySelector(".mode").setAttribute("src", "img/icon-moon.svg");
    document.body.classList.toggle("active");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    document.querySelector(".mode").setAttribute("src", "img/icon-sun.svg");
    document.body.classList.toggle("active");
  }
});

// Helpers
const renderNumOfTodos = function () {
  numberOfTodos = globalTodoItems.filter((item) =>
    item.classList.contains("todo-item")
  ).length;
  itemsCounter.forEach((item) => {
    item.textContent = numberOfTodos;
  });
};

const countItems = function () {
  const items = document.querySelectorAll(".todo-item");
  numberOfTodos = items.length;
  itemsCounter.forEach((item) => (item.textContent = numberOfTodos));
};

// Create Todo List
const createTodo = function (inp) {
  const html = `
    <div
      class="todo-item position-relative d-flex justify-content-center 
      align-items-center"
    >
      <div
        class="form-control border-bottom-0 create-todo 
        py-4 d-flex align-items-center"
      >
        <span
          class="todo-check ms-4 me-4 cursor-pointer
          rounded-circle border d-flex justify-content-center align-items-center" 
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="9"
            class="d-none justify-items-center align-items-center"
          >
            <path
              fill="none"
              stroke="#FFF"
              stroke-width="2"
              d="M1 4.304L3.696 7l6-6"
            />
          </svg>
        </span>
        <span class="todo fw-bold">${inp}</span>
        
        <svg class="todo-close ms-auto me-4 opacity-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path fill="#494C6B" fill-rule="evenodd" 
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132
        8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </div>
      
      </div>
      `;

  inputTodo.value = "";
  todosContainer.insertAdjacentHTML("beforeend", html);

  const todoItems = Array.from(document.querySelectorAll(".todo-item"));
  const closeIcons = document.querySelectorAll(".todo-close");
  const checkIcons = document.querySelectorAll(".todo-check");
  const arrayOfTodos = Array.from(checkIcons);
  const counterElements = document.querySelectorAll(".items-counter");

  counterElements.forEach((el) => countItems(el));

  // loop through all todos
  //1 if todo doesn't have active add it
  //2 if todo have active remove it

  checkIcons.forEach((todo) => {
    todo.addEventListener("click", function (e) {
      arrayOfTodos.forEach((todo) => todo.classList.remove("active"));
      if (!e.target.classList.contains("active")) {
        e.target.classList.add("active");
      } else {
        e.target.classList.remove("active");
      }
    });
  });

  const closeTodo = function () {
    closeIcons.forEach((icon) => {
      if (icon === null) return;

      icon.addEventListener("click", function () {
        icon.closest(".todo-item").remove();
        numberOfTodos--;
        todosContainer.children.length === 0
          ? itemsCounter.forEach((item) => (item.textContent = 0))
          : countItems();
      });
    });
  };
  closeTodo();

  // Set todoItems to globalTodoItems,
  // so we can access todos array from global scope (outside createTodo())
  globalTodoItems = todoItems;
};

// Event listeners
btnAll.addEventListener("click", function () {
  const items = document.querySelectorAll(".todo-item");
  items.forEach((it) => it.classList.remove("hidden"));
  countItems();
});

clearBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    clearCompleted = true;
    const activeTodos = globalTodoItems.filter((item) =>
      item.classList.contains("active-todo")
    );
    activeTodos.map((todo) => todo.remove());
    renderNumOfTodos();
  });
});

btnActive.addEventListener("click", function () {
  const activeTodos = globalTodoItems.filter((item) =>
    item.classList.contains("active-todo")
  );

  globalTodoItems.forEach((it) => it.classList.remove("hidden"));
  activeTodos.forEach((el) => {
    el.classList.add("hidden");
  });

  numberOfTodos = globalTodoItems.filter(
    (item) => !item.classList.contains("active-todo")
  ).length;
});

btnCompleted.addEventListener("click", function () {
  const notActiveTodos = globalTodoItems.filter(
    (item) => !item.classList.contains("active-todo")
  );

  const activeTodos = globalTodoItems.filter((item) =>
    item.classList.contains("active-todo")
  );
  activeTodos.forEach((el) => el.classList.remove("hidden"));
  notActiveTodos.forEach((el) => el.classList.add("hidden"));
});

document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;
  if (inputTodo.value === "") return;
  createTodo(inputTodo.value);
  // back to All todo list
  btnAll.click();
});

const toggleActiveOnCategoryBtns = function () {
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      categoryBtns.forEach((btn) => btn.classList.remove("active"));
      !e.target.classList.contains("active")
        ? e.target.classList.add("active")
        : e.target.classList.remove("active");
    });
  });

  // Back to all todos after clearing completed
  clearBtns.forEach((btn) =>
    btn.addEventListener("click", () => btnAll.click())
  );
};
toggleActiveOnCategoryBtns();
