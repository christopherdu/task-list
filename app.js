// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listenerse

loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);

    // Add task 
    form.addEventListener('submit', addTask);

    // Remove tasks
    taskList.addEventListener('click', removeTask);

    // Clear all tasks
    clrBtn.addEventListener('click', clearTask);

    // Filter tasks
    filter.addEventListener('keyup', filterTask);
}

// Get tasks from local storage
function getTasks() {
    let tasks;

    if(!localStorage.getItem('task')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('task'));
    }

    tasks.forEach(function(taskI) {
        // Create li element
        const li = document.createElement('li');

        // Add class
        li.className = 'collection-item';

        // Create text node and append to li
        li.appendChild(document.createTextNode(taskI));
        
        // Create delete icon element
        const link = document.createElement('a');

        // Add class
        link.className = 'delete-item secondary-content';

        // Add icon
        link.innerHTML = '<i class="fas fa-chevron-circle-right"></i>';
        
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
        return;
    }

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    
    // Create delete icon element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // Add icon
    link.innerHTML = '<i class="fas fa-chevron-circle-right"></i>';
    
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeInLocalStorage(taskInput.value);
    
    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store task
function storeInLocalStorage(text) {
    let tasks;

    if(!localStorage.getItem('task')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('task'));
    }

    tasks.push(text);

    localStorage.setItem('task', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
       if(confirm("Are you sure?")) {
        e.target.parentElement.parentElement.remove();

        // Remove from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
       }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    if(!localStorage.getItem('task')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('task'));
    }

    tasks.forEach(function(taskI, index) {
        if(taskItem.textContent == taskI) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('task', JSON.stringify(tasks));
}


function clearTask() {
    while(taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();

}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    console.log(e.target.value);
}