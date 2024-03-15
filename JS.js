document.addEventListener("DOMContentLoaded", function() {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const deleteSelectedBtn = document.getElementById("delete-selected-btn");

  let selectedItems = [];

  todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodoItem(todoText);
      todoInput.value = "";
    }
  });

  function addTodoItem(todoText) {
    const li = document.createElement("li");
    const todoContent = document.createElement("div");
    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.addEventListener("change", function() {
      if (completeCheckbox.checked) {
        li.classList.add("completed");
        selectedItems.push(li);
      } else {
        li.classList.remove("completed");
        const index = selectedItems.indexOf(li);
        if (index > -1) {
          selectedItems.splice(index, 1);
        }
      }
      toggleDeleteSelectedBtn();
    });

    const todoLabel = document.createElement("label");
    todoLabel.textContent = todoText;
    todoLabel.classList.add("todo-text");

    todoContent.appendChild(completeCheckbox);
    todoContent.appendChild(todoLabel);

    li.appendChild(todoContent);
    todoList.appendChild(li);
  }

  function toggleDeleteSelectedBtn() {
    if (selectedItems.length > 0) {
      deleteSelectedBtn.style.display = "block";
    } else {
      deleteSelectedBtn.style.display = "none";
    }
  }

  deleteSelectedBtn.addEventListener("click", function() {
    selectedItems.forEach(function(item) {
      item.remove();
    });
    selectedItems = [];
    toggleDeleteSelectedBtn();
  });
});
