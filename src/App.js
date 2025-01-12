import React, { useState, useEffect } from 'react';

// Main Pomodoro Timer component
function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25); // Default Pomodoro time: 25 minutes
  const [seconds, setSeconds] = useState(0);  // Start with 0 seconds
  const [isRunning, setIsRunning] = useState(false); // Timer state (running or paused)
  const [isBreak, setIsBreak] = useState(false);   // Whether the timer is for a break or Pomodoro session
  const [tasks, setTasks] = useState([]);  // Store tasks here
  const [taskInput, setTaskInput] = useState(""); // Input for new tasks

  // Handle timer logic
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

  // Add a new task to the task list
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]); // Add task to the list
      setTaskInput(""); // Clear input field
    }
  };

  // Remove a task from the list
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <div className="timer">
        <h1>{isBreak ? "Break Time!" : "Pomodoro Timer"}</h1>
        <div className="time">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
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

      {/* Task Manager Section */}
      <div className="task-manager">
        <h3>Manage Tasks</h3>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add Task</button>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PomodoroTimer;