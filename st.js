// Getting the elements
const userNameInput = document.getElementById("userName");
const welcomeMessage = document.getElementById("welcomeMessage");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTaskList = document.getElementById("pendingTaskList");
const completedTaskList = document.getElementById("completedTaskList");
const progressBar = document.getElementById("progressBar");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");

let tasks = [];

// Capture user name
userNameInput.addEventListener('input', function () {
    const name = userNameInput.value.trim();
    welcomeMessage.innerText = name ? Welcome, ${name}! : '';
});

// Add a task
addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false // Set completed to false when added
        };
        tasks.push(newTask);
        taskInput.value = ""; // Clear the input after adding
        displayTasks();
        updateProgress();
    } else {
        alert("Please enter a task.");
    }
});

// Toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    updateProgress();
}

// Edit task
function editTask(index) {
    const updatedTaskText = prompt("Edit your task:", tasks[index].text);
    if (updatedTaskText) {
        tasks[index].text = updatedTaskText;
        displayTasks();
        updateProgress();
    }
}

// Display tasks
function displayTasks() {
    pendingTaskList.innerHTML = ""; // Clear existing pending tasks
    completedTaskList.innerHTML = ""; // Clear existing completed tasks

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = list-group-item ${task.completed ? "completed" : ""};
        listItem.innerText = task.text;

        // Click event to toggle task completion
        listItem.addEventListener('click', function () {
            toggleTaskCompletion(index);
        });

        // Edit button for the task
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-warning btn-sm float-right mr-2";
        editBtn.innerText = "Edit";
        editBtn.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent toggle task completion
            editTask(index);
        });

        // Delete button for the task
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm float-right";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent toggle task completion
            tasks.splice(index, 1);
            displayTasks();
            updateProgress();
        });

        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        // Append to the correct list
        if (task.completed) {
            completedTaskList.appendChild(listItem);
        } else {
            pendingTaskList.appendChild(listItem);
        }
    });
}

// Update progress bar
function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    progressBar.style.width = ${progressPercentage}%;
    progressBar.innerText = ${Math.round(progressPercentage)}%;

    // Show the count of pending and completed tasks
    document.getElementById("pendingTaskCount").innerText = Pending: ${totalTasks - completedTasks};
    document.getElementById("completedTaskCount").innerText = Completed: ${completedTasks};
}

// Toggle dark/light mode
toggleThemeBtn.addEventListener('click', function () {
    document.body.classList.toggle("dark-mode");
    toggleThemeBtn.innerText = document.body.classList.contains("dark-mode") ? "Toggle Light Mode" : "Toggle Dark Mode";
});