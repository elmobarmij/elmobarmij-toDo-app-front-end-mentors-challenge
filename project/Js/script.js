const inputTodo = document.querySelector(".create-todo");
const todoCheckIcon = document.querySelector(".todo-check");
const todosContainer = document.querySelector(".todos-container");
let clearCompleted = false;
// Button list
const btnAll = document.querySelector(".btn__all");
const btnActive = document.querySelector(".btn__active");
const btnCompleted = document.querySelector(".btn__completed");
const btnClear = document.querySelector(".btn__clear");
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

// Create Todo List
const createTodo = function () {
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    if (inputTodo.value !== "") {
      createMarkup(inputTodo.value);
      // back to All todo list
      btnAll.click();
    }
  });

  const createMarkup = function (inp) {
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

    let numberOfTodos;
    const itemsCounter = document.querySelectorAll(".items-counter");
    const todoItems = Array.from(document.querySelectorAll(".todo-item"));
    const closeIcons = document.querySelectorAll(".todo-close");
    const checkIcons = document.querySelectorAll(".todo-check");
    const arrayOfTodos = Array.from(checkIcons);
    const counterElements = document.querySelectorAll(".items-counter");

    const countItems = function () {
      const items = document.querySelectorAll(".todo-item");
      numberOfTodos = items.length;
      itemsCounter.forEach((item) => (item.textContent = numberOfTodos));
    };

    counterElements.forEach((el) => countItems(el));

    arrayOfTodos.map((todo) => {
      todo.addEventListener("click", function () {
        todo.classList.add("active");
        todo.parentElement.parentElement.classList.add("active-todo");
        todo.addEventListener("click", function () {
          todo.classList.remove("active");
          todo.parentElement.parentElement.classList.remove("active-todo");
        });
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

    const renderNumOfTodos = function () {
      numberOfTodos = todoItems.filter((item) =>
        item.classList.contains("active-todo")
      ).length;
      itemsCounter.forEach((item) => {
        item.textContent = numberOfTodos;
      });
    };

    // Handle click on buttons

    btnAll.addEventListener("click", function () {
      const items = document.querySelectorAll(".todo-item");
      items.forEach((it) => it.classList.remove("hidden"));
      countItems();
    });

    btnActive.addEventListener("click", function () {
      const activeTodos = todoItems.filter((item) =>
        item.classList.contains("active-todo")
      );

      todoItems.forEach((it) => it.classList.remove("hidden"));
      activeTodos.forEach((el) => {
        el.classList.add("hidden");
      });

      numberOfTodos = todoItems.filter(
        (item) => !item.classList.contains("active-todo")
      ).length;
      itemsCounter.forEach((item) => {
        item.textContent = numberOfTodos;
      });
    });

    const clearBtns = document.querySelectorAll(".btn__clear");

    clearBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        clearCompleted = true;
        const activeTodos = todoItems.filter((item) =>
          item.classList.contains("active-todo")
        );
        activeTodos.map((todo) => todo.remove());
        renderNumOfTodos();
        // Back to all todos
        btnAll.click();
      });
    });

    btnCompleted.addEventListener("click", function () {
      const notActiveTodos = todoItems.filter(
        (item) => !item.classList.contains("active-todo")
      );

      const activeTodos = todoItems.filter((item) =>
        item.classList.contains("active-todo")
      );
      activeTodos.forEach((el) => el.classList.remove("hidden"));
      notActiveTodos.forEach((el) => el.classList.add("hidden"));

      // This last lines of code is to fix a bug; when we click on completed button after clicking on clear completed button, we get a wrong items count number, so we use this condtion to get it fixed

      if (clearCompleted) {
        itemsCounter.forEach((item) => {
          item.textContent = numberOfTodos;
        });
      } else {
        renderNumOfTodos();
      }
    });
  };
};
createTodo();

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
};
toggleActiveOnCategoryBtns();
