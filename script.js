const inputBox = document.getElementById("input-box");
const datetimeInput = document.getElementById("datetime-input");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Please enter a task!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        
        if (datetimeInput.value !== '') {
            li.textContent += " (Reminder: " + new Date(datetimeInput.value).toLocaleString() + ")";
        }
        
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    
    inputBox.value = '';
    datetimeInput.value = ''; // Clear datetime input after adding task
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
