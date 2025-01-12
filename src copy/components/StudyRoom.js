import React from 'react';
import '../styles/StudyRoom.css'; // Optional custom styles
import { Link } from 'react-router-dom';

export default function StudyRoom() {
  return (
    <div className="study-room-page">
      <h1>[ Study Techniques ]</h1>
      <div className="widgets">
      <li><Link to="/pomodoro">[ Pomodoro] </Link></li>
      <p className="description">Focus in 25-minute sessions with breaks in between.</p>
      <li><Link to = "/flowtime">[ FlowTime] </Link></li>
      <p className="description">Work for as long as you're productive, then take a break.</p>
      </div>
    </div>
  );
}

