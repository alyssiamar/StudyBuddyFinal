import React, { useState, useEffect } from 'react';
import '../styles/ToDoList.css'; // CSS file for styling the list

export default function TodoList({className = '', style = {}}) {
  const numberOfLines = 10; // Number of lines on your notepad image
  const initialTasks = Array(numberOfLines).fill({text: '', checked: false}); // Predefined blank tasks
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || initialTasks;
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = value;
    setTasks(updatedTasks);
  };

  const handleCheckboxToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setTasks(updatedTasks);
  };

  return (
    <div className={`todo-list-container ${className}`} style = {style}>
      <div className="notepad">
        <h2>To-Do</h2>
        <div className="todo-list-content">
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="task-row">
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleCheckboxToggle(index)}
                  className="checkbox"
                />
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  className={`task-input ${task.checked ? 'checked' : ''}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

