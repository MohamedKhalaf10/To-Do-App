/* Start Global Variables */
let input1 = document.querySelector(".input1");
let addButton = document.querySelector(".add");
let clearButton = document.querySelector(".clear");
let listOfTasks = document.querySelector(".list-of-tasks");
let filter = document.querySelector(".filter");
let tasksArray = [];
/* End Global Variables */
/* Start Local Storage */
if (window.localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(window.localStorage.getItem("tasks"));
  addTask(tasksArray);

  tasksArray.forEach((task) => {
    if (task.completed === true) {
      document
        .querySelector(`[data-task="${task.id}"]`)
        .classList.add("completed");
    }
  });
}
/* End Local Storage */
/* Start Building The App */
addButton.addEventListener("click", () => {
  if (input1.value !== "") {
    taskObject(input1.value);
    addTask(tasksArray);
    input1.value = "";
    // Add To Local Storage
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
});
listOfTasks.addEventListener("click", (e) => {
  // Complete Task
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("completed");
    tasksArray.forEach((task) => {
      if (e.target.classList.contains("completed")) {
        if (e.target.getAttribute("data-task") == task.id) {
          task.completed = true;
        }
      } else {
        task.completed = false;
      }
    });
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
  // Remove Task
  else if (e.target.classList.contains("cross")) {
    alert("Are You Sure You Want To Delete This Task?");
    tasksArray = tasksArray.filter((task) => {
      return task.id != e.target.parentElement.dataset.task;
    });
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
    e.target.parentElement.remove();
  }
});
// Filter Tasks
filter.addEventListener("keyup", () => {
  if (filter.value !== "") {
    let value = filter.value.toLowerCase();
    tasksArray = tasksArray.filter((task) => {
      return task.title.toLowerCase().includes(value);
    });
    addTask(tasksArray);
  } else {
    tasksArray = JSON.parse(window.localStorage.getItem("tasks"));
    addTask(tasksArray);
  }
});
// Clear All Tasks
clearButton.addEventListener("click", () => {
  alert("Are You Sure?");
  listOfTasks.innerHTML = "";
  tasksArray = [];
  window.localStorage.clear();
});
/* End Building The App */
/* Start Functions */
// Create Object With Task Data
function taskObject(title) {
  let obj = {
    title: title,
    id: Date.now(),
    completed: false,
  };
  tasksArray.push(obj);
}
// Add Task To The Page
function addTask(array) {
  listOfTasks.innerHTML = "";
  array.forEach((task) => {
    let newli = document.createElement("li");
    newli.innerHTML = `<span class = "task-text">${task.title}</span> <i class="fas fa-x cross"></i>`;
    newli.classList.add("task");
    newli.setAttribute("data-task", task.id);
    listOfTasks.appendChild(newli);
  });
}
/* End Functions */
