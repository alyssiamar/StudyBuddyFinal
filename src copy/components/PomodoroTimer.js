import React, { useState, useEffect } from 'react';
import '../styles/PomodoroTimer.css';

// Pomodoro Timer Component
function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25); // Default Pomodoro time: 25 minutes
  const [seconds, setSeconds] = useState(0);  // Start with 0 seconds
  const [isRunning, setIsRunning] = useState(false); // Timer state (running or paused)
  const [isBreak, setIsBreak] = useState(false);   // Whether the timer is for a break or Pomodoro session

  // Effect to handle timer logic
  useEffect(() => {
    let interval;

    // Start the timer if it's running
    if (isRunning) {
      interval = setInterval(() => {
        // Decrease time every second
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer ends, switch to break
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5);  // If it's a break, switch to 5 minutes; else, switch to 25 minutes
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000); // Decrease every second

    } else {
      // If timer is paused, clear the interval
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isRunning, minutes, seconds, isBreak]); // Re-run effect when timer state changes

  return (
    <div className="timer">
      <h1>{isBreak ? "Break Time!" : "Pomodoro Timer [Work Time!]"}</h1>
      <div className="time">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="button-container">  {/* New container for buttons */}
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={() => {
          setIsRunning(false); 
          setMinutes(25); 
          setSeconds(0);
        }}>
          Reset
        </button>
      </div>
    </div>
  );  
}

// Main App component, including the timer
function App() {
  return (
    <div className="App">
      <PomodoroTimer />
    </div>
  );
}

export default App;