document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);
            writeForm(data);
            writeTranscript(data);
        }
    });

})
function gradeToNumber(grade) {
    if (grade == "A") {
        return 4.0;
    } else if (grade == "B+") {
        return 3.5;
    } else if (grade == "B") {
        return 3.0;
    } else if (grade == "C+") {
        return 2.5;
    } else if (grade == "C") {
        return 2.0;
    } else if (grade == "D+") {
        return 1.5;
    } else if (grade == "D") {
        return 1.0;
    } else if (grade == "F") {
        return 0.0;
    } else {
        return 0.0; 
    }
}

function calculateGPAs(data) {
    let gps1 = 0;
    let gps2 = 0;
    let credit1 = 0;
    let credit2 = 0;

    for (const year in data.credit) {
        for (const semester in data.credit[year]) {
            for (const lesson of data.credit[year][semester]) {
                const grade = lesson.grade;

                if (semester === "1st Semester" && grade !== "S") {
                    const gradeValue = gradeToNumber(grade);
                    gps1 += gradeValue * lesson.credit;
                    credit1 += lesson.credit;
                } else if (semester === "2nd Semester" && grade !== "S") {
                    const gradeValue = gradeToNumber(grade);
                    gps2 += gradeValue * lesson.credit;
                    credit2 += lesson.credit;
                }
            }
        }
    }

    const GPA1 = (gps1 / credit1).toFixed(2);
    const GPA2 = (gps2 / credit2).toFixed(2);

    return [GPA1, GPA2];
}

function writeForm(data){
    const name = document.getElementById('student_name');
    const id = document.getElementById('student_id');
    const date_of_birth = document.getElementById('date_of_birth');
    const major = document.getElementById('major');
    const date_of_admission = document.getElementById('date_of_admission');
    const date_of_graduation = document.getElementById('date_of_graduation');
    const degree = document.getElementById('degree');

    name.value = data.student_name;
    id.value = data.student_id;
    date_of_birth.value = data.date_of_birth;
    major.value = data.major;
    date_of_admission.value = data.date_of_admission;
    date_of_graduation.value = data.date_of_graduation;
    degree.value = data.degree;
}
function writeTranscript(data) {
    let gps = calculateGPAs(data);
    var t1 = parseFloat(gps[0]);
    var t2 = parseFloat(gps[1]);
    let termgpa = (t1 + t2) / 2; 
    const transcript = document.getElementById('content_body');
    transcript.innerHTML = "";

    for (var year in data.credit) {
        for (var semester in data.credit[year]) {
            let boldline = semester + "," + year;
            let row = document.createElement('tr');

            row.innerHTML = 
                "<td style='text-align: center; font-weight: bold;'>" +  boldline + "</td>" + 
                "<td></td>"+ 
                "<td></td>";
            transcript.appendChild(row);

            for (var lesson in data.credit[year][semester]) {
                let row = document.createElement('tr');
                let subject = data.credit[year][semester][lesson];

                row.innerHTML = 
                    "<td style='text-align: left; '>" + subject.subject_id + " " + subject.name + "</td>" + 
                    "<td>" + subject.credit + "</td>" + 
                    "<td>" + subject.grade + "</td>" ;
                transcript.appendChild(row);
            }

            if (semester == "1st Semester") {
                let graderow = document.createElement('tr');
                graderow.innerHTML = 
                "<td style='text-align: center; font-weight: bold;'>GPS " + gps[0] + 
                "    GPA " + gps[0] + "</td>" + 
                "<td></td>"+ 
                "<td></td>";
                transcript.appendChild(graderow);
            } else if (semester == "2nd Semester") {
                let graderow = document.createElement('tr');
                graderow.innerHTML = 
                "<td style='text-align: center; font-weight: bold;'>GPS " + gps[1] + 
                "                 GPA " + termgpa.toFixed(2) + "</td>" + 
                "<td></td>"+ 
                "<td></td>";
                transcript.appendChild(graderow);
            }
        }
    }
}
