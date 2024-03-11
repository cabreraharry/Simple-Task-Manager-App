const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("Please write some task!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let setAlertsButton = document.createElement("button");
        setAlertsButton.textContent = "Set Alerts";
        setAlertsButton.classList.add("set-alerts-button");
        setAlertsButton.addEventListener("click", function() {
            // Call a function to handle setting alerts for this task
            // You can define this function according to your application's logic
            // For example: setAlertsForTask(li);
        });
        li.appendChild(setAlertsButton);

        let crossIcon = document.createElement("span");
        crossIcon.innerHTML = "\u00d7";
        crossIcon.addEventListener("click", function() {
            li.remove();
            saveData();
        });
        li.appendChild(crossIcon);

        listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
}


listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask()