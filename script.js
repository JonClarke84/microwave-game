// script.js

document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    const openButton = document.getElementById('openButton');
    const dialog = document.getElementById('dialog');
    const dialogText = document.getElementById('dialogText');
    const closeButton = document.getElementById('closeButton');

    let startTime = null;
    const duration = 30000; // 30 seconds in milliseconds
    let timerInterval = null;
    let remainingTime = duration;
    let timerEnded = false;

    // Function to start the timer
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 10); // Update every 10ms for precision
    }

    // Function to update the timer display
    function updateTimer() {
        const elapsed = Date.now() - startTime;
        remainingTime = duration - elapsed;

        if (remainingTime <= 0) {
            remainingTime = 0;
            timerElement.textContent = formatTime(remainingTime);
            clearInterval(timerInterval);
            timerEnded = true;
            showDingDialog();
        } else {
            timerElement.textContent = formatTime(remainingTime);
        }
    }

    // Function to format time in mm:ss.mmm
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = ms % 1000;
        return `${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
    }

    // Helper function to pad numbers with leading zeros
    function padZero(num, size = 2) {
        let s = num.toString();
        while (s.length < size) s = "0" + s;
        return s;
    }

    // Event listener for the OPEN button
    openButton.addEventListener('click', () => {
        if (!timerEnded) {
            clearInterval(timerInterval);
            dialogText.textContent = `Time left: ${formatTime(remainingTime)}`;
            dialog.style.display = "block";
        }
    });

    // Function to show the "Ding!" dialog when timer ends
    function showDingDialog() {
        dialogText.textContent = "Ding! Your food is ready!";
        dialog.style.display = "block";
    }

    // Event listener for closing the dialog
    closeButton.addEventListener('click', () => {
        dialog.style.display = "none";
    });

    // Close the dialog if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target == dialog) {
            dialog.style.display = "none";
        }
    });

    // Initialize the timer when the page loads
    startTimer();
});
