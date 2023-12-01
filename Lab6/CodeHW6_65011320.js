const monthNames = ["1/", "2/", "3/", "4/", "5/", "6/", "7/", "8/", "9/", "10/", "11/", "12/"];

let currentMonth = 0;
const currentYear = 2023;

function calendar() {
    const firstDay = new Date(currentYear, currentMonth, 7).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarBody = document.getElementById("calendarBody");
    calendarBody.innerHTML = "";

    let dayCounter = 1;
    for (let row = 0; row < 6; row++) {
        const rowElement = document.createElement("tr");
        for (let col = 0; col < 7; col++) {
            const cellElement = document.createElement("td");
            if ((row === 0 && col < firstDay) || dayCounter > daysInMonth) {
                cellElement.textContent = "";
            } else {
                cellElement.textContent = dayCounter++;
            }
            rowElement.appendChild(cellElement);
        }
        calendarBody.appendChild(rowElement);
    }

    const currentMonthYear = document.getElementById("currentMonthYear");
    currentMonthYear.textContent = monthNames[currentMonth] + " " + currentYear;
}

function prevMonth() {
    if (currentMonth > 0) {
        currentMonth--;
        calendar();
    }
}

function nextMonth() {
    if (currentMonth < 11) {
        currentMonth++;
        calendar();
    }
}

calendar();
