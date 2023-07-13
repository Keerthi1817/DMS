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