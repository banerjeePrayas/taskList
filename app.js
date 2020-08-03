// Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// Load All Event Listeners
loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add TAsk Event
    form.addEventListener("submit", addTask);
    // Remove Task
    taskList.addEventListener('click', removeTask);
    // Clear Tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter TAsks
    filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert("Add a task");
    }

    // Create li Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node and Append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create NEw Link Element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add The Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append Link to li
    li.appendChild(link);
    // Append li to the ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';



    e.preventDefault();
}





// Store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Get Tasks from Local Storage
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create li Element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create Text Node and Append to li
        li.appendChild(document.createTextNode(task));
        // Create NEw Link Element
        const link = document.createElement('a');
        // Add Class
        link.className = 'delete-item secondary-content';
        // Add The Icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append Link to li
        li.appendChild(link);
        // Append li to the ul
        taskList.appendChild(li);
    });
}


// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        // Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}


// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster Method
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTaskFromLocalStorage();
}


// Clear from Local Storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}



// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}