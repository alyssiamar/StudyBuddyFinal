import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';


export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/playlists">Study Music</Link>
        </li>
        <li>
          <Link to="/rooms">Study Room</Link>
        </li>
      </ul>
    </div>
  );
}


