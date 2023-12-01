function alarm(time, activity) {
    this.time = time || "";
    this.activity = activity || "";
}

let alarms = [];

var previewTime;
var hour = 0;
var minute = 0;
var mode = "view";

function start() {
    document.getElementById("btn").addEventListener("click", buttonToggle);
    document.getElementById("btn").innerHTML = "Edit Schedule";
    view();
    tick();
}

function view() {

    const div = document.getElementById("divAlarm");
    div.innerHTML = "";

    const timeList = document.createElement("table");
    const body = document.createElement("tbody");
    const row = document.createElement("tr");

    const time = document.createElement("td");
    time.innerHTML = "Time";
    time.style.fontWeight = "bold";
    row.appendChild(time);
    const text = document.createElement("td");
    text.innerHTML = "Alert";
    text.style.fontWeight = "bold";
    row.appendChild(text);

    body.appendChild(row);

    for (var i = 0; i < alarms.length; i++) {
        const row = document.createElement("tr");

        const time = document.createElement("td");
        time.innerHTML = alarms[i].time;
        row.appendChild(time);

        const text = document.createElement("td");
        text.innerHTML = alarms[i].activity;
        row.appendChild(text);

        body.appendChild(row);

    }

    timeList.appendChild(body);
    div.appendChild(timeList);
}

function edit() {
    alarms.sort(function (a, b) {
        var timeA = a.time;
        var timeB = b.time;
        if (timeA < timeB) {
            return -1;
        }
        if (timeA > timeB) {
            return 1;
        }
        return 0;
    });

    const div = document.getElementById("divAlarm");
    div.innerHTML = "";

    const timeList = document.createElement("table");
    const body = document.createElement("tbody");
    const row = document.createElement("tr");

    const time = document.createElement("td");
    time.innerHTML = "Time";
    time.style.fontWeight = "bold";
    row.appendChild(time);
    const text = document.createElement("td");
    text.innerHTML = "Alert";
    text.style.fontWeight = "bold";
    row.appendChild(text);

    body.appendChild(row);

    for (var i = 0; i < alarms.length; i++) {
        const row = document.createElement("tr");

        const time = document.createElement("td");
        const timeInput = document.createElement("input");
        timeInput.type = "time";
        timeInput.id = "time" + i;
        timeInput.value = alarms[i].time;
        time.appendChild(timeInput);
        row.appendChild(time);

        const text = document.createElement("td");
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.id = "text" + i;
        textInput.value = alarms[i].activity;
        text.appendChild(textInput);
        row.appendChild(text);

        const del = document.createElement("td");
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "Delete";
        delBtn.id = i;
        delBtn.addEventListener("click", remove);
        del.appendChild(delBtn);
        row.appendChild(del);

        body.appendChild(row);

    }

    timeList.appendChild(body);
    div.appendChild(timeList);

    const brrr = document.createElement("br");
    div.appendChild(brrr);
    div.appendChild(brrr);

    const addBtn = document.createElement("button");
    addBtn.innerHTML = "Add";
    addBtn.addEventListener("click", add);
    //class = "outerbutton"
    addBtn.className = "outerbutton";
    div.appendChild(addBtn);

}

function exportSchedule() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(alarms));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "schedule.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

document.getElementById("exportBtn").addEventListener("click", exportSchedule);

function importSchedule(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            try {
                alarms = JSON.parse(content);
                if (mode === "edit") {
                    edit();
                } else {
                    view();
                }
            } catch (error) {
                alert("Error reading the file!");
            }
        };
        reader.readAsText(file);
    }
}

document.getElementById("importFile").addEventListener("change", importSchedule);
document.getElementById("importBtn").addEventListener("click", function () {
    document.getElementById("importFile").click();
});


function saveSchedule() {
    const selectedDate = document.getElementById("selectDate").value;
    if (selectedDate) {
        localStorage.setItem(selectedDate, JSON.stringify(alarms));
        alert("Schedule saved!");
    } else {
        alert("Please select a date!");
    }
}

document.getElementById("saveBtn").addEventListener("click", saveSchedule);

function loadScheduleForSelectedDate() {
    const selectedDate = document.getElementById("selectDate").value;
    const storedData = localStorage.getItem(selectedDate);

    if (storedData) {
        alarms = JSON.parse(storedData);
    } else {
        alarms = []; // Reset to an empty array
    }

    // Then proceed with either viewing or editing
    if (mode === "edit") {
        edit();
    } else {
        view();
    }
    console.log('Loading schedule for date:', selectedDate, 'Data:', storedData);

}

document.getElementById("selectDate").addEventListener("change", loadScheduleForSelectedDate);

document.getElementById("clearStorageBtn").addEventListener("click", function () {
    localStorage.clear();
    alert("Local storage cleared!");

    // Update the UI if necessary. For example:
    alarms = [];
    if (mode === "edit") {
        edit();
    } else {
        view();
    }
});

function showTime() {
    if (hour < 10) {
        var hourr = "0" + hour;
    } else {
        var hourr = hour;
    }
    if (minute < 10) {
        var minutee = "0" + minute;
    } else {
        var minutee = minute;
    }
    previewTime = hourr + ":" + minutee;
    document.getElementById("timeNow").innerHTML = previewTime;
}

function buttonToggle() {
    if (mode == "view") {
        mode = "edit";
        document.getElementById("btn").innerHTML = "done";
        edit();
    } else if (mode == "edit") {
        mode = "view";
        document.getElementById("btn").innerHTML = "Edit Schedule";
        for (var i = 0; i < alarms.length; i++) {
            alarms[i].time = document.getElementById("time" + i).value;
            alarms[i].activity = document.getElementById("text" + i).value;
        }
        view();
    }
}

function remove() {
    alarms.splice(this.id, 1);
    edit();
}

function add() {
    alarms.push(new alarm("00:00", "New Alarm"));
    edit();
}

window.addEventListener("load", start());