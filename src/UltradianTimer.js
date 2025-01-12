import React, { useState, useEffect } from 'react';
import './UltradianTimer.css';  // Optional for styling

function UltradianTimer() {
  const [minutes, setMinutes] = useState(90); // Fixed work time: 90 minutes
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Switch between work and break periods
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 90 : 20);  // Switch between 90 min work and 20 min break
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, isBreak]);

  return (
    <div className="timer">
      <h2>{isBreak ? "Break Time!" : "Work Time!"}</h2>
      <div className="time">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={() => {
        setIsRunning(false);
        setMinutes(90); // Start with 90 minutes for work
        setSeconds(0);
      }}>
        Reset
      </button>

      <div className="info">
        <p>
          The Ultradian Rhythm method is based on natural cycles of work and rest.
          Work for 90 minutes, then take a 20-minute break. This improves focus, mental performance, and overall productivity.
        </p>
      </div>
    </div>
  );
}

export default UltradianTimer;