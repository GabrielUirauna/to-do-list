// Load tasks from local storage
var savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  var taskList = document.getElementById("task-list");
  taskList.innerHTML = savedTasks;
}

// Add task event listener
document
  .getElementById("add-task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var taskInput = document.getElementById("task-input");
    var taskList = document.getElementById("task-list");
    var newTask = document.createElement("li");
    newTask.classList.add("list-group-item", "task-item");
    var taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = taskInput.value;
    newTask.appendChild(taskText);
    var taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");
    var completeButton = document.createElement("button");
    completeButton.classList.add("btn", "btn-success", "complete-task");
    completeButton.textContent = "Concluir";
    taskActions.appendChild(completeButton);
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "delete-task");
    deleteButton.textContent = "Excluir";
    taskActions.appendChild(deleteButton);
    newTask.appendChild(taskActions);
    taskList.appendChild(newTask);
    taskInput.value = "";

    // Save tasks to local storage
    localStorage.setItem("tasks", taskList.innerHTML);
  });

// Complete task event listener
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("complete-task")) {
    var taskText = event.target
      .closest(".task-item")
      .querySelector(".task-text");
    taskText.classList.toggle("completed");

    // Save tasks to local storage
    var taskList = document.getElementById("task-list");
    localStorage.setItem("tasks", taskList.innerHTML);
  }
});

// Delete task event listener
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-task")) {
    var taskItem = event.target.closest(".task-item");
    taskItem.remove();

    // Save tasks to local storage
    var taskList = document.getElementById("task-list");
    localStorage.setItem("tasks", taskList.innerHTML);
  }
});

document.addEventListener("click", function (event) {
  if(event.target.classList.contains("delete-all-tasks")) {
    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    localStorage.clear();
  }
});