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

document.addEventListener("DOMContentLoaded", () => {
  const canvasObj = init("canvas");
  const c = canvasObj.c;
  const canvas = canvasObj.canvas;
  const mouse = {
    x: undefined,
    y: undefined,
  };
  const maxRadius = 40;
  const minRadius = 2;
  const colorArray = [
    "#FFC312",
    "#C4E538",
    "#12CBC4",
    "#FDA7DF",
    "#ED4C67",
    "#F79F1F",
    "#A3CB38",
    "#1289A7",
    "#D980FA",
    "#B53471",
    "#EE5A24",
    "#009432",
    "#0652DD",
    "#9980FA",
    "#833471",
    "#EA2027",
    "#006266",
    "#1B1464",
    "#5758BB",
    "#6F1E51",
  ];
  let circleArray = [];

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    init();
  });

  function Circle(x, y, dx, dy, radius, minRadius, maxRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // c.strokeStyle = "blue";
      // c.stroke();
      c.fillStyle = this.color;
      c.fill();
    };

    this.update = function () {
      if (this.x + this.radius > w || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > h || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      // interactivity
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50 &&
        this.radius < this.maxRadius
      ) {
        this.radius += 1;
      }
      if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    }
  }
})

function init(elemid) {
  let canvas = document.getElementById(elemid);
  let c = canvas.getContext("2d");
  w = (canvas.width = window.innerWidth);
  h = (canvas.height = window.innerHeight);

  c.fillStyle = "rgba(30,30,30,1)";
  c.fillRect(0, 0, w, h);
  return { c: c, canvas: canvas };
}