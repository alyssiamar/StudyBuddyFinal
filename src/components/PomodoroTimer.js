import React, { useState, useEffect } from 'react';
import TaskManager from './TaskManager'; // Import the TaskManager component

const PomodoroTimer = () => {
  const [tasks, setTasks] = useState([]);                // List of tasks
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0); // Current task index
  const [isActive, setIsActive] = useState(false);        // Timer status (active or not)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // Time remaining (default to 25 minutes)

  // Add a new task to the task list
  const addTask = (taskName) => {
    setTasks((prevTasks) => [...prevTasks, taskName]);
  };

  // Switch to the next task in the list
  const switchTask = () => {
    setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % tasks.length); // Loop through tasks
  };

  // Timer countdown effect
  useEffect(() => {
    if (!isActive || tasks.length === 0) return; // Don't run timer if inactive or no tasks

    const interval = setInterval(() => {
      setSecondsLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval); // Clear interval when timer stops or component unmounts
  }, [isActive, tasks]);

  // When timer hits 0, switch to the next task
  useEffect(() => {
    if (secondsLeft === 0) {
      switchTask();        // Switch task after 25 minutes
      setSecondsLeft(25 * 60); // Reset the timer to 25 minutes
    }
  }, [secondsLeft]);

  const currentTask = tasks[currentTaskIndex];

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <h2>Current Task: {currentTask || 'No task selected'}</h2>
      <div>
        <p>Time remaining: {Math.floor(secondsLeft / 60)}:{secondsLeft % 60}</p>
      </div>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      
      {/* TaskManager component to add new tasks */}
      <TaskManager addTask={addTask} />
    </div>
  );
};

export default PomodoroTimer;