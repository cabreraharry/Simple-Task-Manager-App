const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Please write some task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let alertInput = document.createElement("input");
        alertInput.type = "datetime-local";
        alertInput.className = "alert-input";
        li.appendChild(alertInput);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
    handleAlerts(); // Call handleAlerts after adding a new task
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save task data to local storage
function saveData() {
    let tasks = listContainer.querySelectorAll("li");
    let taskData = [];
    tasks.forEach(task => {
        let taskInfo = {
            task: task.innerHTML,
            completed: task.classList.contains("checked"),
            alert: task.querySelector(".alert-input") ? task.querySelector(".alert-input").value : null
        };
        taskData.push(taskInfo);
    });
    localStorage.setItem("taskData", JSON.stringify(taskData));
}

// Function to load task data from local storage
function loadTaskData() {
    let storedData = localStorage.getItem("taskData");
    if (storedData) {
        let tasks = JSON.parse(storedData);
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.task;
            if (task.completed) {
                li.classList.add("checked");
            }
            if (task.alert) {
                let alertInput = document.createElement("input");
                alertInput.type = "datetime-local";
                alertInput.className = "alert-input";
                alertInput.value = task.alert;
                li.appendChild(alertInput);
            }
            listContainer.appendChild(li);
        });
    }
}

// Function to handle alerts
function handleAlerts() {
    let tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
        let alertTime = new Date(task.querySelector(".alert-input").value);
        if (alertTime > new Date() && !task.classList.contains("alerted")) {
            setTimeout(() => {
                alert(`Reminder: ${task.textContent}`);
                task.classList.add("alerted");
            }, alertTime - new Date());
        }
    });
}

// Load task data when the page is loaded
loadTaskData();
// Call handleAlerts to set up alerts
handleAlerts();
