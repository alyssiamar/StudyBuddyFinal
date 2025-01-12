// src/FlowtimeTimer.js

import React, { useState, useEffect } from 'react';
import '../styles/FlowTimer.css';


const FlowtimeTimer = () => {
  // Timer state
  const [minutes, setMinutes] = useState(0);  // Start with 0 minutes
  const [seconds, setSeconds] = useState(0);  // Start with 0 seconds
  const [isRunning, setIsRunning] = useState(false); // Timer state (running or paused)
  const [workDuration, setWorkDuration] = useState(90);  // Default work session is 90 minutes
  const [breakDuration, setBreakDuration] = useState(15); // Default break duration is 15 minutes
  const [isBreak, setIsBreak] = useState(false);  // Whether the timer is in work or break mode

  // Effect hook to handle the timer countdown
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer ends, switch to break mode
            setIsBreak(!isBreak);
            setMinutes(isBreak ? workDuration : breakDuration);  // Switch between work and break durations
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);  // Timer updates every second
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isRunning, minutes, seconds, isBreak, workDuration, breakDuration]); // Re-run when the timer state changes

  // Start or pause the timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(workDuration); // Reset to work duration
    setSeconds(0);
    setIsBreak(false); // Reset to work session
  };

  // Change work duration
  const changeWorkDuration = (e) => {
    const newDuration = parseInt(e.target.value, 10);
    if (newDuration > 0) {
      setWorkDuration(newDuration);
      if (!isRunning) {
        setMinutes(newDuration);
      }
    }
  };

  // Change break duration
  const changeBreakDuration = (e) => {
    const newDuration = parseInt(e.target.value, 10);
    if (newDuration > 0) {
      setBreakDuration(newDuration);
    }
  };

  return (
    <div className="timer">
      <h1>{isBreak ? 'Take a Break!' : 'Work Time!'}</h1>
      <div className="time">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div>
        <button onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <div className="settings">
        <label>
          Work Duration (minutes):
          <input
            type="number"
            value={workDuration}
            onChange={changeWorkDuration}
            min="1"
          />
        </label>
        <label>
          Break Duration (minutes):
          <input
            type="number"
            value={breakDuration}
            onChange={changeBreakDuration}
            min="1"
          />
        </label>
      </div>
    </div>
  );
};

export default FlowtimeTimer;