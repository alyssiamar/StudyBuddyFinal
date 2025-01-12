import React from 'react';
import '../styles/StudyRoom.css'; // Optional custom styles

export default function StudyRoom() {
  return (
    <div className="study-room-page">
      <h1>Your Study Room</h1>
      <div className="widgets">
        <div className="widget">To-Do List</div>
        <div className="widget">Timer</div>
        <div className="widget">Notes</div>
      </div>
    </div>
  );
}

