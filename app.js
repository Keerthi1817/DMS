const progressBarInners = document.querySelectorAll('.progress-bar-inner');

function updateProgressBar(progressBarInner) {
    const progressValue = progressBarInner.getAttribute('data-value');
    const maxProgressValue = progressBarInner.getAttribute('data-max-value');
    const progressPercentage = (progressValue / maxProgressValue) * 100;
    progressBarInner.style.width = `${progressPercentage}%`;
    progressBarInner.querySelector('.progress-label').textContent = `${progressValue}/${maxProgressValue}`;
}

progressBarInners.forEach(updateProgressBar);



const absenteesDivs = document.querySelectorAll('.absentees');

progressBarInners.forEach((progressBarInner, index) => {
    const absenteesDiv = absenteesDivs[index];
    const absenteesHeading = absenteesDiv.querySelector('h5');
    const progressValue = parseInt(progressBarInner.getAttribute('data-value'));
    const maxProgressValue = parseInt(progressBarInner.getAttribute('data-max-value'));

    if (progressValue === maxProgressValue) {
        absenteesHeading.textContent = 'No absentees🎉';
    } else {
        absenteesHeading.textContent = 'Absentees:';
        const emptySpace = document.createElement('p');
        emptySpace.style.height = '20px';
        absenteesDiv.appendChild(emptySpace);
    }
});

window.onload = function () {
    var timetable1 = {
        "Mon": ['DSA', 'OOP', "Break", 'CN', 'WT', 'Lunch', 'WT', 'CN', 'DSA', 'PT'],
        "Tue": ['OOP', 'OOP', "Break", 'DSA', 'CN', 'Lunch', 'WT', 'MC', 'OOP', 'PT'],
        "Wed": ['DSA', 'DSA', "Break", 'MC', 'MC', 'Lunch', 'OOP LAB', 'Break', 'OOP LAB'],
        "Thu": ['DSA', 'OOP', "Break", 'CN', 'WT', 'Lunch', 'DSA LAB', 'Break', 'DSA LAB'],
        "Fri": ['MC', 'CN', "Break", 'WT', 'OOP', 'Lunch', 'WT LAB', 'Break', 'WT LAB']
    };
    var timetable2 = {
        "Mon": ['OOP', 'CN', "Break", 'DSA', 'WT', 'Lunch', 'CN', 'WT', 'DSA', 'PT'],
        "Tue": ['DSA', 'CN', "Break", 'OOP', 'WT', 'Lunch', 'MC', 'DSA', 'OOP', 'PT'],
        "Wed": ['OOP', 'CN', "Break", 'MC', 'MC', 'Lunch', 'DSA LAB', 'Break', 'DSA LAB'],
        "Thu": ['CN', 'DSA', "Break", 'OOP', 'WT', 'Lunch', 'OOP LAB', 'Break', 'OOP LAB'],
        "Fri": ['WT', 'OOP', "Break", 'CN', 'DSA', 'Lunch', 'CN LAB', 'Break', 'CN LAB']
    };

    var timetable3 = {
        "Mon": ['WT', 'OOP', "Break", 'CN', 'DSA', 'Lunch', 'WT', 'CN', 'DSA', 'PT'],
        "Tue": ['CN', 'WT', "Break", 'DSA', 'OOP', 'Lunch', 'MC', 'WT', 'DSA', 'PT'],
        "Wed": ['MC', 'WT', "Break", 'OOP', 'CN', 'Lunch', 'WT LAB', 'Break', 'WT LAB'],
        "Thu": ['OOP', 'CN', "Break", 'WT', 'DSA', 'Lunch', 'CN LAB', 'Break', 'CN LAB'],
        "Fri": ['DSA', 'WT', "Break", 'OOP', 'CN', 'Lunch', 'DSA LAB', 'Break', 'DSA LAB']
    };
    var durations = {
        "Break": 10,
        "Lunch": 30,
        "Normal": 50
    };

    function getCurrentAndNextClass(timetable, now) {
        var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()];
        var currentTime = now.getHours() * 60 + now.getMinutes();
        var startTime = 9 * 60 + 10; // 9:10am
        var classTime = durations["Normal"];
        var breakTime = durations["Break"];
        var lunchTime = durations["Lunch"];
        var currentClass = null;
        var previousClass = null;
        var nextClass = null;
        var index = 0;
        while (startTime < currentTime && index < timetable[day].length) {
            var currentSubject = timetable[day][index];
            var duration = currentSubject === "Break" ? breakTime : currentSubject === "Lunch" ? lunchTime : classTime;
            if (currentTime < startTime + duration) {
                currentClass = currentSubject;
                if (index > 0) {
                    previousClass = timetable[day][index - 1];
                }
                if (index < timetable[day].length - 1) {
                    nextClass = timetable[day][index + 1];
                }
                break;
            }
            startTime += duration;
            index++;
        }
        return { previousClass, currentClass, nextClass };
    }

    function updateClasses() {
        var now = new Date();
        var classes1 = getCurrentAndNextClass(timetable1, now);
        var classes2 = getCurrentAndNextClass(timetable2, now);
        var classes3 = getCurrentAndNextClass(timetable3, now);
        document.getElementById('previousClass1').textContent = classes1.previousClass || "No previous class";
        document.getElementById('ongoingClass1').textContent = classes1.currentClass || "No ongoing class";
        document.getElementById('nextClass1').textContent = classes1.nextClass || "No next class";
        document.getElementById('previousClass2').textContent = classes2.previousClass || "No previous class";
        document.getElementById('ongoingClass2').textContent = classes2.currentClass || "No ongoing class";
        document.getElementById('nextClass2').textContent = classes2.nextClass || "No next class";
        document.getElementById('previousClass3').textContent = classes3.previousClass || "No previous class";
        document.getElementById('ongoingClass3').textContent = classes3.currentClass || "No ongoing class";
        document.getElementById('nextClass3').textContent = classes3.nextClass || "No next class";
    }

    // Update classes every minute
    setInterval(updateClasses, 60 * 1000);
}
