let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

// DOM elements
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

// Update timer display
function updateDisplay() {
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start the Pomodoro timer
function startTimer() {
    if (isRunning) return;

    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                alert("Pomodoro session is over! Take a break.");
                minutes = 25; // Reset to 25 minutes
                seconds = 0;
                updateDisplay();
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);

    isRunning = true;
    startButton.textContent = "Pause Timer";
}

// Pause the timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = "Resume Timer";
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
    startButton.textContent = "Start Timer";
}

// Event listeners
startButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

// Initialize the timer display
updateDisplay();