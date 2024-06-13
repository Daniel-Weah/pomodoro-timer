// Boolean to track if the timer is running
let isRunning = false;

// Variable to store the timer interval
let timer;

// Default time (25 minutes in seconds for work session)
let defaultTime = 25 * 60;
let timeLeft = defaultTime;

// Get the time display element
const timeDisplay = document.getElementById("time");

// Get the progress bar element
const progressBar = document.getElementById("progress-bar");

// Get the button elements
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const workButton = document.getElementById("work");
const breakButton = document.getElementById("break");
const longBreakButton = document.getElementById("long-break");

// Function to update the display with the current time
function updateDisplay() {
  // Calculate minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Update the time display with leading zeros
  timeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Update progress bar width based on remaining time
  const percentage = (timeLeft / defaultTime) * 100;
  progressBar.style.width = `${percentage}%`;
}

// Function to start the timer
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  startButton.textContent = "Start";


  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
      // Play alarm 10 to the end of the timer
      if (timeLeft <= 10) {
        timeDisplay.style.color = "red";
        playAlarm();
      }
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Time's up! Take a break.");
      // Switch to break after work session ends
      setBreakTime();
      timeDisplay.style.color = "";
      // switching back to the work time
      alert("Break time's up! Back to work.");

      setWorkTime();
    }
  }, 1000);
}

// Function to pause the timer
function pauseTimer() {
  isRunning = false;
  startButton.textContent = "Continue..";
  clearInterval(timer);
}

// Function to reset the timer
function resetTimer() {
  pauseTimer();
  timeLeft = defaultTime;
  startButton.textContent = "Start";
  updateDisplay();
}

// Function to set the timer for a work session
function setWorkTime() {
  breakButton.style.backgroundColor = "rgb(2, 2, 18)";
  longBreakButton.style.backgroundColor = "rgb(2, 2, 18)";
  workButton.style.backgroundColor = "#ff6347";
  workButton.style.borderRadius = "20px";
  workButton.style.color = "#fff";
  defaultTime = 25 * 60; // 25 minutes in seconds
  timeLeft = defaultTime;
  resetTimer();
}

// Function to set the timer for a short break
function setBreakTime() {
  workButton.style.backgroundColor = "rgb(2, 2, 18)";
  longBreakButton.style.backgroundColor = "rgb(2, 2, 18)";
  breakButton.style.backgroundColor = "#ff6347";
  breakButton.style.borderRadius = "20px";
  breakButton.style.color = "#fff";
  defaultTime = 5 * 60; // 5 minutes in seconds
  timeLeft = defaultTime;
  resetTimer();
}

// Function to set the timer for a long break
function setLongBreakTime() {
  breakButton.style.backgroundColor = "rgb(2, 2, 18)";
  workButton.style.backgroundColor = "rgb(2, 2, 18)";
  longBreakButton.style.backgroundColor = "#ff6347";
  longBreakButton.style.borderRadius = "20px";
  longBreakButton.style.color = "#fff";
  defaultTime = 15 * 60; // 15 minutes in seconds
  timeLeft = defaultTime;
  resetTimer();
}

// Function to play the alarm sound
function playAlarm() {
  const audio = new Audio("alarm.wav");
  audio.play();
}

// Add event listeners to the buttons to call the appropriate functions
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
workButton.addEventListener("click", setWorkTime);
breakButton.addEventListener("click", setBreakTime);
longBreakButton.addEventListener("click", setLongBreakTime);

// Initial call to update the display when the page loads
updateDisplay();
