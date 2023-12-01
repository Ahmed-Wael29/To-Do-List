let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store Elements
let arrayOfTasks = [];

// Check if there is any data in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Call GetElementsFromLocalStorage Function
getElementsFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty the input value
  }
};

// When Click on Task Element
tasksDiv.addEventListener("click", function (e) {
  // Delete Button Click
  if (e.target.classList.contains("del")) {
    // Confirm Message If User Clicked Delete
    if (confirm("Do you want to delete ?") === true) {
      // Remove Element From Local Storage
      deleteTaskFromLocalStorageWith(
        e.target.parentElement.getAttribute("data-id")
      );
      // Remove Element From Page
      e.target.parentElement.remove();
    }
  }
  // Task Element Click
  if (e.target.classList.contains("task")) {
    // Toggle completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push the task onto the array of tasks
  arrayOfTasks.push(task);
  // Add Element to page
  addElementsToPageFrom(arrayOfTasks);
  // Add Elements To Local Storage
  addElementsToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty the div tasks
  tasksDiv.innerHTML = "";
  // Looping on array of tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task Is Done
    if (task.completed) {
      task.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Delete Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks
    tasksDiv.appendChild(div);
  });
}

// function which add elements to local storage
function addElementsToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// function which get elements from local storage
function getElementsFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

// function which delete elements from local storage with id
function deleteTaskFromLocalStorageWith(TaskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != TaskId);
  addElementsToLocalStorageFrom(arrayOfTasks);
}

// function which update the status of a task
function toggleStatusTaskWith(TaskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == TaskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addElementsToLocalStorageFrom(arrayOfTasks);
}
