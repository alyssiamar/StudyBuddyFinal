import React, { useState } from 'react';

const TaskManager = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');

  // Handle adding a task
  const handleAddTask = () => {
    if (taskName.trim() === '') return;  // Do not add empty tasks
    addTask(taskName);                  // Add the task to the list
    setTaskName('');                    // Clear the input field
  };

  return (
    <div>
      <h3>Add a Task</h3>
      <input 
        type="text" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        placeholder="Enter task name"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskManager;