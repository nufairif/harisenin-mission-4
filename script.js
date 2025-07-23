document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const prioritySelect = document.getElementById("priority");
  const todoList = document.getElementById("todo-list");
  const deleteAllBtn = document.getElementById("delete-all");
  const emptyMessage = document.getElementById("empty-message");

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const todoText = todoInput.value.trim();
    const priority = prioritySelect.value;

    if (todoText) {
      addTodoItem(todoText, priority);
      todoInput.value = "";
      emptyMessage.style.display = "none";
    }
  });

  deleteAllBtn.addEventListener("click", function () {
    todoList.innerHTML = "";
    todoList.appendChild(emptyMessage);
    emptyMessage.style.display = "block";
  });

  function addTodoItem(text, priority) {
    const now = new Date();
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateString = now.toLocaleDateString("en-US", dateOptions);

    const todoItem = document.createElement("div");
    todoItem.className = `todo-item priority-${priority}`;

    todoItem.innerHTML = `
                    <div class="todo-content">
                        <input type="checkbox" class="todo-checkbox">
                        <div>
                            <p class="todo-text">${text}</p>
                            <p class="todo-date">${dateString}</p>
                            <span class="todo-priority priority-${priority}">
                                ${
                                  priority.charAt(0).toUpperCase() +
                                  priority.slice(1)
                                } Priority
                            </span>
                        </div>
                    </div>
                    <button class="delete-btn">
                        <i class="fas fa-times"></i>
                    </button>
                `;

    const checkbox = todoItem.querySelector(".todo-checkbox");
    const todoText = todoItem.querySelector(".todo-text");

    checkbox.addEventListener("change", function () {
      if (this.checked) {
        todoText.classList.add("completed");
      } else {
        todoText.classList.remove("completed");
      }
    });

    const deleteBtn = todoItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      todoItem.remove();

      if (todoList.children.length === 1) {
        emptyMessage.style.display = "block";
      }
    });

    todoList.appendChild(todoItem);
  }
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'96394ba966bc4086',t:'MTc1MzI1Mzk3MS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
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
