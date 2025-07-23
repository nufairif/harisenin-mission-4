document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todoInput");
  const submitBtn = document.getElementById("submitBtn");
  const todoList = document.getElementById("todoList");
  const deleteAllBtn = document.getElementById("deleteAllBtn");

  // Load todos from localStorage if available
  loadTodos();

  submitBtn.addEventListener("click", addTodo);
  deleteAllBtn.addEventListener("click", deleteAllTodos);

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    // Get selected priority
    const priorityOptions = document.getElementsByName("priority");
    let selectedPriority;
    for (const option of priorityOptions) {
      if (option.checked) {
        selectedPriority = option.value;
        break;
      }
    }

    // Get current date
    const now = new Date();
    const dateString = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Remove "No tasks yet" message if it exists
    const emptyMessage = todoList.querySelector(".empty-message");
    if (emptyMessage) {
      emptyMessage.remove();
    }

    // Create todo item
    const todoItem = document.createElement("div");
    todoItem.className = `todo-item ${selectedPriority}`;

    todoItem.innerHTML = `
                    <input type="checkbox" class="checkbox">
                    <div class="todo-content">
                        <div class="todo-text">${todoText}</div>
                        <div class="todo-date">${dateString}</div>
                        <div class="todo-priority ${selectedPriority}">
                            Priority: ${
                              selectedPriority.charAt(0).toUpperCase() +
                              selectedPriority.slice(1)
                            }
                        </div>
                    </div>
                    <button class="delete-btn">
                        <i class="fas fa-times"></i>
                    </button>
                `;

    todoList.prepend(todoItem);

    // Add event listeners to the new todo item
    const checkbox = todoItem.querySelector(".checkbox");
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        todoItem.classList.add("completed");
      } else {
        todoItem.classList.remove("completed");
      }
      saveTodos();
    });

    const deleteBtn = todoItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      todoItem.remove();
      if (todoList.children.length === 0) {
        todoList.innerHTML =
          '<div class="empty-message">No tasks yet. Add one above!</div>';
      }
      saveTodos();
    });

    // Clear input
    todoInput.value = "";

    // Save todos
    saveTodos();
  }

  function deleteAllTodos() {
    todoList.innerHTML =
      '<div class="empty-message">No tasks yet. Add one above!</div>';
    saveTodos();
  }

  function saveTodos() {
    const todos = [];
    const todoItems = todoList.querySelectorAll(".todo-item");

    todoItems.forEach((item) => {
      const todoText = item.querySelector(".todo-text").textContent;
      const isCompleted = item.querySelector(".checkbox").checked;
      const dateText = item.querySelector(".todo-date").textContent;
      const priorityText = item.querySelector(".todo-priority").textContent;
      const priorityClass = item.querySelector(".todo-priority").className;
      const itemClass = item.className;

      todos.push({
        text: todoText,
        completed: isCompleted,
        date: dateText,
        priority: priorityText,
        priorityClass: priorityClass,
        itemClass: itemClass,
      });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const todos = JSON.parse(savedTodos);

      if (todos.length > 0) {
        todoList.innerHTML = "";

        todos.forEach((todo) => {
          const todoItem = document.createElement("div");
          todoItem.className = todo.itemClass;

          todoItem.innerHTML = `
                                <input type="checkbox" class="checkbox" ${
                                  todo.completed ? "checked" : ""
                                }>
                                <div class="todo-content">
                                    <div class="todo-text">${todo.text}</div>
                                    <div class="todo-date">${todo.date}</div>
                                    <div class="${todo.priorityClass}">${
            todo.priority
          }</div>
                                </div>
                                <button class="delete-btn">
                                    <i class="fas fa-times"></i>
                                </button>
                            `;

          if (todo.completed) {
            todoItem.classList.add("completed");
          }

          todoList.appendChild(todoItem);

          // Add event listeners
          const checkbox = todoItem.querySelector(".checkbox");
          checkbox.addEventListener("change", function () {
            if (this.checked) {
              todoItem.classList.add("completed");
            } else {
              todoItem.classList.remove("completed");
            }
            saveTodos();
          });

          const deleteBtn = todoItem.querySelector(".delete-btn");
          deleteBtn.addEventListener("click", function () {
            todoItem.remove();
            if (todoList.children.length === 0) {
              todoList.innerHTML =
                '<div class="empty-message">No tasks yet. Add one above!</div>';
            }
            saveTodos();
          });
        });
      }
    }
  }
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'9637b59d46848808',t:'MTc1MzIzNzM0MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
