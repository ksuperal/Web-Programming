
var previewTime;
var hour = 0;
var minute = 0;
var mode = "view";

function alarm(time, text) {
    this.time = time || "";
    this.text = text || "";
}

const alarms = [
    new alarm("01:00", "Test!"),
    new alarm("10:00", "Wake up!"),
    new alarm("12:00", "Lunch time!"),
    new alarm("18:00", "Dinner time!"),
    new alarm("22:00", "Go to bed!"),
];



function start() {
    document.getElementById("btn").addEventListener("click", buttonToggle);
    document.getElementById("btn").innerHTML = "editormode";
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
        text.innerHTML = alarms[i].text;
        row.appendChild(text);

        body.appendChild(row);
        
    }

    timeList.appendChild(body);
    div.appendChild(timeList);
}

function editormode() {

    alarms.sort(function(a, b) {
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
        textInput.value = alarms[i].text;
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
    addBtn.className = "outerbutton";
    div.appendChild(addBtn);
    
}

function tick() {
    minute++;
    setTimeout("tick()", 1000);
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    if (hour == 24) {
        hour = 0;
    }
    showTime();
    showAlert();
}

function showAlert() {
    for (var i = 0; i < alarms.length; i++) {
        if (previewTime == alarms[i].time) {
            alert(alarms[i].text);
        }
    }
}

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

function buttonToggle(){
    if (mode == "view") {
        mode = "editormode";
        document.getElementById("btn").innerHTML = "done";
        editormode();        
    } else if (mode == "editormode") {
        mode = "view";
        document.getElementById("btn").innerHTML = "editormode";
        for(var i = 0; i < alarms.length; i++) {
            alarms[i].time = document.getElementById("time" + i).value;
            alarms[i].text = document.getElementById("text" + i).value;
        }
        view();
    }
}

function remove() {
    alarms.splice(this.id, 1);
    editormode();
    
}

function add() {
    alarms.push(new alarm("00:00", "New Alarm"));
    editormode();
}

window.addEventListener("load", start());
